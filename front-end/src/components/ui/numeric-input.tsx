import { forwardRef } from "react";
import { Input } from "./input";

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ placeholder, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        !/[0-9]/.test(e.key) &&
        ![
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
          "Enter",
        ].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        placeholder={placeholder}
        pattern="[0-9]*"
        inputMode="numeric"
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";

export { NumericInput }; 