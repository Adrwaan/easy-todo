"use client";

import { useEffect, useState } from "react";
import { useRegisterPassword } from "@/contexts/password-context";
import { getStrongPasswordLevel } from "@/lib/getStrongPasswordLevel";
import { cn } from "@/lib/utils";

function getPasswordStrongLevelText(level: number): {
  text: string;
  color: string;
} {
  switch (level) {
    case 1:
      return { text: "Muito fraca", color: "text-red-500" };
    case 2:
      return { text: "Fraca", color: "text-yellow-500" };
    case 3:
      return { text: "Média", color: "text-orange-500" };
    case 4:
      return { text: "Boa", color: "text-green-600" };
    case 5:
      return { text: "Ótima", color: "text-green-800" };
    default:
      return { text: "", color: "" };
  }
}

export function RegisterStrongIndicator() {
  const { password } = useRegisterPassword();
  const [strongLevel, setStrongLevel] = useState(0);

  const passwordStrongLevelProps = getPasswordStrongLevelText(strongLevel);

  useEffect(() => {
    setStrongLevel(getStrongPasswordLevel(password));
  }, [password]);

  return (
    <div className="-mt-2 flex h-max w-full flex-col gap-2">
      <p className="font-medium text-sm">
        Nível da senha:{" "}
        <span className={cn("font-bold", passwordStrongLevelProps.color)}>
          {passwordStrongLevelProps.text}
        </span>
      </p>
      <div className="grid h-6 w-full grid-cols-5 rounded-xl">
        <div
          className={cn(
            "rounded-l-xl border border-gray-300",
            strongLevel >= 1 ? "border-none bg-red-500" : "bg-white",
          )}
        ></div>
        <div
          className={cn(
            "border-gray-300 border-t border-b",
            strongLevel >= 2 ? "border-none bg-yellow-500" : "bg-white",
          )}
        ></div>
        <div
          className={cn(
            "border border-gray-300",
            strongLevel >= 3 ? "border-none bg-orange-500" : "bg-white",
          )}
        ></div>
        <div
          className={cn(
            "border-gray-300 border-t border-b",
            strongLevel >= 4 ? "border-none bg-green-600" : "bg-white",
          )}
        ></div>
        <div
          className={cn(
            "rounded-r-xl border border-gray-300",
            strongLevel >= 5 ? "border-none bg-green-800" : "bg-white",
          )}
        ></div>
      </div>
    </div>
  );
}
