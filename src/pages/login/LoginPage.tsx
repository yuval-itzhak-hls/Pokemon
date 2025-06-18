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
import { Button } from "@/components/ui/button";
import { GenericButton } from "@/design-system/generic-componenets/GenericButton";

interface LoginPayload {
  email: string;
  password: string;
}

const LOCAL_STORAGE_KEY = "users";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Make sure the users array exists so JSON.parse never fails
  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const users: LoginPayload[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) as string
    );

    const existingUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!existingUser) {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    // Persist the session (very naive – just email)
    localStorage.setItem("currentUser", existingUser.email);

    // Redirect to a protected route or dashboard
    // window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 p-80">
        <Card className="shadow-lg rounded-[12px] border p-6 h-[453px] w-[424px]">
          <CardHeader className="text-left">
            <CardTitle className="text-heading-xl-bold">Login</CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-1">
                <Label className="text-body-regular text-left text-sub-title-gray" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-body-regular text-left text-sub-title-gray" htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center mt-2">{error}</p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <GenericButton
                text={loading ? "Signing in..." : "Sign in"}
                type="primary"
                size="wide"
                onClick={() => null}
              />
              <p className="text-sm text-center text-muted-foreground">
                Don’t have an account? <a href="/sign-up" className="text-primary underline">Sign up</a>
              </p>
            </CardFooter>
          </form>
        </Card>
    </div>
  );
};

export default LoginPage;
