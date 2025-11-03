"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { InputWithLabel } from "@/components/commons/input-with-label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

const loginSchema = z.object({
  email: z.email("Digite um e-mail válido!"),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit({ email, password }: LoginSchemaType) {
    const user = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    if (user.error) {
      let friendlyMsg = "";

      switch (user.error.code) {
        case "INVALID_EMAIL_OR_PASSWORD":
          friendlyMsg = "E-mail ou senha inválidos.";
          break;
        case "INVALID_EMAIL":
          friendlyMsg = "E-mail ou senha inválidos.";
          break;
        case "INVALID_PASSWORD":
          friendlyMsg = "E-mail ou senha inválidos.";
          break;
        default:
          friendlyMsg = "Algo deu errado. Tente novamente mais tarde.";
          return;
      }

      toast.error(friendlyMsg);
    } else {
      router.push("/");
    }
  }

  return (
    <form
      className="flex h-max w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputWithLabel
        id="email"
        label="E-mail:"
        placeholder="seu@email.com"
        errorMessage={formState.errors.email?.message}
        {...register("email")}
      />
      <InputWithLabel id="password" label="Senha:" {...register("password")} />
      <Button
        type="submit"
        className="mt-2 cursor-pointer border border-blue-500 bg-blue-500 font-bold duration-300 hover:bg-card hover:text-blue-500"
      >
        Entrar
      </Button>
    </form>
  );
}
