import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label: string;
}

export function InputWithLabel({ id, label, className = "", ...props }: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Label className="font-semibold" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        className={cn(
          "border-gray-300 focus-visible:ring-blue-600/40",
          className,
        )}
        placeholder=""
        {...props}
      />
    </div>
  );
}
