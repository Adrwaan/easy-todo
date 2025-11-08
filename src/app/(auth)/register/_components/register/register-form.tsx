"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { InputWithLabel } from "@/components/commons/input-with-label";
import { Button } from "@/components/ui/button";
import { useRegisterPassword } from "@/contexts/password-context";
import { authClient } from "@/lib/auth/client";
import { getStrongPasswordLevel } from "@/lib/getStrongPasswordLevel";
import { cn } from "@/lib/utils";
import { RegisterStrongIndicator } from "./register-strong-indicator";

const registerSchema = z
  .object({
    name: z.string().min(3, "Seu nome deve ter mais que 3 letras."),
    email: z.email("Digite um e-mail válido!"),
    password: z
      .string()
      .min(8, "Sua senha deve conter no minímo 8 caracteres.")
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
  const router = useRouter();
  const { setPassword } = useRegisterPassword();

  const { register, handleSubmit, formState, watch, resetField } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const passwordValue = watch("password");
  useEffect(() => {
    setPassword(passwordValue ?? "");
  }, [passwordValue, setPassword]);

  async function onSubmit({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterSchemaType) {
    setIsLoading(true);

    const isNameValid = name.length > 3;
    const isEmailValid = z.email().safeParse(email).success;
    const isPasswordStrong = getStrongPasswordLevel(password) >= 4;
    const isPasswordsMatch = password === confirmPassword;

    if (isNameValid && isEmailValid && isPasswordStrong && isPasswordsMatch) {
      const user = await authClient.signUp
        .email({
          name,
          email,
          password,
        })
        .then((user) => {
          setIsLoading(false);
          return user;
        });

      if (user.error) {
        let friendlyMsg = "";

        switch (user.error.code) {
          case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
            friendlyMsg = "Já existe um usuário com este e-mail!";
            break;
          case "USER_ALREADY_EXISTS":
            friendlyMsg = "Um usuário já foi cadastrado com estes dados.";
            break;
          default:
            friendlyMsg = "Algo deu errado. Tente novamente mais tarde.";
            return;
        }

        toast.error(friendlyMsg);
        resetField("email");
      } else {
        router.push("/");
      }
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
        disabled={isLoading}
        type="submit"
        className={cn(
          "mt-2 cursor-pointer border border-blue-500 bg-blue-500 font-bold duration-300 hover:bg-card hover:text-blue-500",
          isLoading
            ? "border-blue-700 bg-blue-700 hover:border-blue-900 hover:bg-blue-900 hover:text-white"
            : "",
        )}
      >
        Criar
      </Button>
    </form>
  );
}
