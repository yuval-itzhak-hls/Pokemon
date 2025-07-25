import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { AuthPaths, AuthErrorMessages } from "./consts";
import type { AuthPageProps } from "./types";

export const AuthPage = ({ mode }: AuthPageProps) => {
  const isLoginMode: boolean = mode === "login";
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = isLoginMode ? "/users/signin" : "/users/signup";
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      if (!response.ok) {
        // Try to parse the error message from the backend
        let errorMsg = "An error occurred. Please try again.";
        try {
          const errorData = await response.json();
          if (errorData?.message) {
            errorMsg = errorData.message;
          }
        } catch {
          // fallback to default error message
        }
        setErrorMessage(errorMsg);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (isLoginMode) {
        localStorage.setItem("idToken", data.IdToken);
        localStorage.setItem("accessToken", data.AccessToken);
        navigate(AuthPaths.AllPokemons);
      } else {
        localStorage.setItem("pendingConfirmationEmail", userEmail);
        localStorage.setItem("pendingPassword", userPassword);
        navigate("/confirm");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <Card className="shadow-lg rounded-[12px] border p-1 w-[424px]">
        <CardHeader className="text-left">
          <CardTitle className="text-heading-xl-bold">
            {isLoginMode ? "Login" : "Signup"}
          </CardTitle>
        </CardHeader>
        <AuthForm
          isLoginMode={isLoginMode}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPassword={userPassword}
          setUserPassword={setUserPassword}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onSubmit={handleAuthSubmit}
        />
      </Card>
    </div>
  );
};

export default AuthPage;
