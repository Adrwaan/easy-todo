"use client";

import { InputWithLabel } from "@/components/commons/input-with-label";
import { Button } from "@/components/ui/button";
import { useRegisterPassword } from "@/contexts/password-context";
import { RegisterStrongIndicator } from "./register-strong-indicator";

export function RegisterForm() {
  const { password, setPassword } = useRegisterPassword();

  return (
    <form className="flex h-max w-full flex-col gap-4">
      <InputWithLabel id="email" label="E-mail:" placeholder="seu@email.com" />
      <InputWithLabel
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        id="password"
        label="Senha:"
        placeholder="*********"
        type="password"
      />
      <RegisterStrongIndicator />
      <InputWithLabel
        id="confirm_password"
        label="Confirme sua senha:"
        placeholder="*********"
      />
      <Button
        type="submit"
        className="mt-2 border border-blue-500 bg-blue-500 font-bold duration-300 hover:bg-card hover:text-blue-500"
      >
        Criar
      </Button>
    </form>
  );
}
