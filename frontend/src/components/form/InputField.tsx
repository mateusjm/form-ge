import { FormControl, Input, InputLabel } from "@mui/material";
import type { ChangeEvent } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string | number;
  type?: "text" | "number" | "tel";
  onChange: (name: string, value: string) => void;
  maxLength?: number; // opcional para limitar caracteres
  inputMode?: string;
};

export const InputField = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  maxLength,
}: InputFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;

    // Se for tipo number, remove tudo que não for número
    if (type === "number") {
      val = val.replace(/\D/g, "");

      // Limita o número de dígitos
      if (maxLength) {
        val = val.slice(0, maxLength);
      }
    }

    onChange(name, val);
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{label}</InputLabel>
      <Input
        required
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        inputProps={{
          inputMode: type === "number" ? "numeric" : undefined,
          pattern: type === "number" ? "[0-9]*" : undefined,
          maxLength: maxLength,
        }}
      />
    </FormControl>
  );
};
