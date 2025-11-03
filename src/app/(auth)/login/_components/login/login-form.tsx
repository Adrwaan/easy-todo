import { Button } from "@/components/ui/button";
import { LoginInput } from "./login-input";

export function LoginForm() {
  return (
    <form className="flex h-max w-full flex-col gap-4">
      <LoginInput id="email" label="E-mail:" />
      <LoginInput id="senha" label="Senha:" />
      <Button className="mt-2 cursor-pointer border border-blue-500 bg-blue-500 font-bold duration-300 hover:bg-card hover:text-blue-500">
        Entrar
      </Button>
    </form>
  );
}
