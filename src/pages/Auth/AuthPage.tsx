import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GenericButton } from "@/design-system/generic-componenets/GenericButton";
import { useNavigate } from "react-router";

export type AuthMode = "login" | "signup";

interface AuthPageProps {
  mode: AuthMode;
}

interface UserPayload {
  email: string;
  password: string;
}

const LOCAL_STORAGE_KEY = "users";

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const isLogin = mode === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

 
  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const users: UserPayload[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) as string
    );

    if (isLogin) {
      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!existingUser) {
        setError("User not exsist or invalid details, check details again");
        setLoading(false);
        return;
      }

      localStorage.setItem("currentUser", existingUser.email);
      window.location.href = "/home-page";
    } else {

      const emailExsist = users.some((u) => u.email === email);
      if (emailExsist) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      users.push({ email, password });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
      localStorage.setItem("currentUser", email);
      navigate("/home-page");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <Card className="shadow-lg rounded-[12px] border p-1 w-[424px] ">
        <CardHeader className="text-left">
          <CardTitle className="text-heading-xl-bold">
            {isLogin ? "Login" : "Signup"}
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <CardContent className="space-y-6 flex-1">
            <div className="flex flex-col gap-1">
              <Label className="text-body-regular text-left text-sub-title-gray" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-body-regular text-left text-sub-title-gray" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>


            {error && <p className="text-error-red text-sm text-center mt-2">{error}</p>}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <GenericButton
              text={loading ? (isLogin ? "Signing in..." : "Signing up...") : isLogin ? "Sign in" : "Sign up"}
              type="primary"
              size="wide"
            />

            <a href="/forgot-password" className="text-primary pb-11">
              Forgot password?
            </a>

            <p className="text-sm text-center text-muted-foreground">
              {isLogin ? (
                <>Don’t have an account? <a href="/signup" className="text-primary">Sign up</a></>
              ) : (
                <>Already have an account? <a href="/login" className="text-primary">login</a></>
              )}
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
