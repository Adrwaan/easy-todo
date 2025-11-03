import { Button } from "@/components/ui/button";
import { RegisterInput } from "./register-input";

export function RegisterForm() {
  return (
    <form className="flex h-max w-full flex-col gap-4">
      <RegisterInput id="email" label="E-mail:" />
      <RegisterInput id="senha" label="Senha:" />
      <RegisterInput id="senha" label="Confirme sua senha:" />
      <Button className="mt-2 border border-blue-500 bg-blue-500 font-bold duration-300 hover:bg-card hover:text-blue-500">
        Entrar
      </Button>
    </form>
  );
}
