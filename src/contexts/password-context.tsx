"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

interface IPasswordContext {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const PasswordContext = createContext<IPasswordContext | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function RegisterPasswordProvider({ children }: ProviderProps) {
  const [password, setPassword] = useState("");

  return (
    <PasswordContext.Provider value={{ password, setPassword }}>
      {children}
    </PasswordContext.Provider>
  );
}

export function useRegisterPassword() {
  const context = useContext(PasswordContext);

  if (!context) {
    throw new Error(
      "Use o 'useRegisterPassword' dentro de um 'RegisterPasswordProvider'.",
    );
  }

  return context;
}
