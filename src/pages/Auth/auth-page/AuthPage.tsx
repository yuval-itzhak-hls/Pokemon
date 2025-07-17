
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "./AuthForm";
import { useNavigate } from "react-router-dom"; 
import {
  LOCAL_STORAGE_USERS_KEY,
  LOCAL_STORAGE_CURRENT_USER_KEY,
  AuthPaths,
  AuthErrorMessages,
} from "./consts";

import type { AuthPageProps, UserPayload} from "./types";


export const AuthPage = ({mode}: AuthPageProps) => {

  const isLoginMode: boolean = mode === "login";

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_USERS_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify([]));
    }
  }, []); 

  const handleAuthSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const storedUsers: UserPayload[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || "[]" 
    );

    if (isLoginMode) {
      // Login Logic
      const existingUser: UserPayload | undefined = storedUsers.find(
        (user) => user.email === userEmail && user.password === userPassword
      );

      if (!existingUser) {
        setErrorMessage(AuthErrorMessages.UserNotFound); 
        setIsLoading(false);
        return;
      }

      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, existingUser.email);
      navigate(AuthPaths.AllPokemons);

    } else {
      // Signup Logic
      const emailAlreadyExists: boolean = storedUsers.some(
        (user) => user.email === userEmail
      );

      if (emailAlreadyExists) {
        setErrorMessage(AuthErrorMessages.EmailAlreadyRegistered);
        setIsLoading(false);
        return;
      }

      const newUser: UserPayload = { email: userEmail, password: userPassword };
      storedUsers.push(newUser);
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(storedUsers));
      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, newUser.email);
      navigate(AuthPaths.AllPokemons); 
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