"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputWithLabel } from "@/components/commons/input-with-label";
import { Button } from "@/components/ui/button";
import { useRegisterPassword } from "@/contexts/password-context";
import { authClient } from "@/lib/auth/client";
import { getStrongPasswordLevel } from "@/lib/getStrongPasswordLevel";
import { RegisterStrongIndicator } from "./register-strong-indicator";

const registerSchema = z
  .object({
    name: z.string().min(3, "Seu nome deve ter mais que 3 letras."),
    email: z.email("Digite um e-mail válido!"),
    password: z
      .string()
      .refine((password) => getStrongPasswordLevel(password) >= 4, {
        error: 'Sua senha deve ser ao menos "Boa" para se registrar.',
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword && password.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { setPassword } = useRegisterPassword();

  const { register, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password");
  useEffect(() => {
    setPassword(passwordValue ?? "");
  }, [passwordValue, setPassword]);

  function onSubmit({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterSchemaType) {
    const isNameValid = name.length > 3;
    const isEmailValid = z.email().safeParse(email).success;
    const isPasswordStrong = getStrongPasswordLevel(password) >= 4;
    const isPasswordsMatch = password === confirmPassword;

    if (isNameValid && isEmailValid && isPasswordStrong && isPasswordsMatch) {
      authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });
    }
  }

  return (
    <form
      className="flex h-max w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputWithLabel
        id="name"
        label="Nome:"
        placeholder="Seu nome aqui"
        errorMessage={formState.errors.name?.message}
        {...register("name")}
      />
      <InputWithLabel
        id="email"
        label="E-mail:"
        placeholder="seu@email.com"
        errorMessage={formState.errors.email?.message}
        {...register("email")}
      />
      <InputWithLabel
        id="password"
        label="Senha:"
        placeholder="*********"
        errorMessage={formState.errors.password?.message}
        type="password"
        {...register("password")}
      />
      <RegisterStrongIndicator />
      <InputWithLabel
        id="confirm_password"
        label="Confirme sua senha:"
        placeholder="*********"
        errorMessage={formState.errors.confirmPassword?.message}
        type="password"
        {...register("confirmPassword")}
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
