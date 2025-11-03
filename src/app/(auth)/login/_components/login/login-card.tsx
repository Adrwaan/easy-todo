import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <div className="flex h-max w-3/8 flex-col items-center gap-6 rounded-xl border border-gray-300 bg-card px-12 py-8 shadow-2xl shadow-blue-300/80">
      {/* <div className="relative size-20">
        <Image src={"/logo.webp"} alt="EasyTodo logo" fill />
      </div> */}
      <h1 className="text-center font-black text-3xl">
        Entre na sua conta
        <br /> <span className="text-blue-500">EasyTodo!</span>
      </h1>
      <LoginForm />
      <p className="font-medium text-sm">
        Não tem uma conta ainda? Crie uma{" "}
        <span className="cursor-pointer text-blue-500 underline">agora!</span>
      </p>
    </div>
  );
}
