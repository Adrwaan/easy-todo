import Link from "next/link";
import { RegisterForm } from "./register-form";

export function RegisterCard() {
  return (
    <div className="flex h-max w-3/8 flex-col items-center gap-6 rounded-xl border border-gray-300 bg-card px-12 py-8 shadow-2xl shadow-blue-300/80">
      {/* <div className="relative size-20">
        <Image src={"/logo.webp"} alt="EasyTodo logo" fill />
      </div> */}
      <h1 className="text-center font-black text-3xl">
        Crie sua conta na
        <br /> <span className="text-blue-500">EasyTodo!</span>
      </h1>
      <RegisterForm />
      <p className="font-medium text-sm">
        Já tem uma conta? Clique{" "}
        <Link
          href={"/login"}
          className="cursor-pointer text-blue-500 underline"
        >
          aqui!
        </Link>
      </p>
    </div>
  );
}
