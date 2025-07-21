import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ConfirmFormProps = {
  email: string;
  setEmail: (val: string) => void;
  code: string;
  setCode: (val: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export const ConfirmForm = ({
  code,
  setCode,
  isLoading,
  errorMessage,
  onSubmit,
}:ConfirmFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
      <Input
        placeholder="Confirmation Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Confirming..." : "Confirm"}
      </Button>
    </form>
  );
};
