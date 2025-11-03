import { InputWithLabel } from "@/components/commons/input-with-label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  return (
    <form className="flex h-max w-full flex-col gap-4">
      <InputWithLabel id="email" label="E-mail:" />
      <InputWithLabel id="senha" label="Senha:" />
      <Button className="mt-2 cursor-pointer border border-blue-500 bg-blue-500 font-bold duration-300 hover:bg-card hover:text-blue-500">
        Entrar
      </Button>
    </form>
  );
}
