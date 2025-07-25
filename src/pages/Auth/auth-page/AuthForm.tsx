import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GenericButton } from "@/design-system/generic-componenets/button/GenericButton";
import { AuthPaths } from "./consts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // <-- Add this import

type AuthFormProps = {
  isLoginMode: boolean;
  userEmail: string;
  setUserEmail: (email: string) => void;
  userPassword: string;
  setUserPassword: (password: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
  onSubmit: (e: React.FormEvent) => void;
};

export const AuthForm = (props: AuthFormProps) => {
  return (
    <form onSubmit={props.onSubmit} className="flex flex-col h-full">
      <CardContent className="space-y-6 flex-1">
        <div className="flex flex-col gap-1">
          <Label
            className="text-body-regular text-left text-sub-title-gray"
            htmlFor="email"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            value={props.userEmail}
            onChange={(e) => props.setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label
            className="text-body-regular text-left text-sub-title-gray"
            htmlFor="password"
          >
            Password
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={props.userPassword}
                  onChange={(e) => props.setUserPassword(e.target.value)}
                  required
                />
              </TooltipTrigger>
              {/** Show tooltip only in signup mode */}
              {props.isLoginMode ? null : (
                <TooltipContent side="right" className="max-w-xs">
                  <div className="text-xs text-left whitespace-pre-line">
                    Password requirements:
                    <br />- Minimum 6 characters
                    <br />- Contains at least 1 number
                    <br />- Contains at least 1 uppercase letter
                    <br />- Contains at least 1 lowercase letter
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        {props.errorMessage && (
          <p className="text-error-red text-sm text-center mt-2">
            {props.errorMessage}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <GenericButton
          text={
            props.isLoading
              ? props.isLoginMode
                ? "Signing in..."
                : "Signing up..."
              : props.isLoginMode
              ? "Sign in"
              : "Sign up"
          }
          type="primary"
          size="wide"
          disabled={props.isLoading}
        />

        <a href={AuthPaths.ForgotPassword} className="text-primary pb-11">
          Forgot password?
        </a>

        <p className="text-sm text-center text-muted-foreground">
          {props.isLoginMode ? (
            <>
              Don’t have an account?{" "}
              <a href={AuthPaths.Signup} className="text-primary">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href={AuthPaths.Login} className="text-primary">
                Login
              </a>
            </>
          )}
        </p>
      </CardFooter>
    </form>
  );
};