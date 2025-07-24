import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthPaths } from "../auth-page/consts";
import { ConfirmForm } from "./ConfirmForm";

export const ConfirmPage = () => {
  const storedEmail = localStorage.getItem("pendingConfirmationEmail") || "";
  const [email, setEmail] = useState(storedEmail);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const password = localStorage.getItem("pendingPassword") || "";
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        const error = await response.text();
        setErrorMessage(error || "Failed to confirm user");
        setIsLoading(false);
        return;
      }

      const signinResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!signinResponse.ok) {
      setErrorMessage("Confirmation succeeded but login failed");
      setIsLoading(false);
      return;
    }

    const data = await signinResponse.json();
    localStorage.setItem("accessToken", data.IdToken);
    localStorage.removeItem("pendingConfirmationEmail");
    localStorage.removeItem("pendingPassword");
    navigate(AuthPaths.AllPokemons);

  } catch (error) {
    setErrorMessage("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="shadow-lg rounded-[12px] border py-0 px-1 w-[424px]">
        <CardHeader className="text-left">
          <CardTitle className="text-heading-md-bold">
            Enter the code you received to your email
          </CardTitle>
        </CardHeader>
        <ConfirmForm
          email={email}
          setEmail={setEmail}
          code={code}
          setCode={setCode}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};
