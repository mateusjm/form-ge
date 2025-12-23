export function formatCPF(value: string): string {
  if (!value) return "";

  // remove tudo que não for número
  value = value.replace(/\D/g, "");

  // limita a 11 dígitos
  value = value.slice(0, 11);

  // aplica a máscara
  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  }

  return value;
}

export function formatPhone(value: string): string {
  if (!value) return ""; // se não houver nada, retorna vazio

  // remove tudo que não for número
  let digits = value.replace(/\D/g, "");

  // limita a 11 dígitos
  digits = digits.slice(0, 11);

  if (digits.length === 0) return ""; // se apagou tudo, fica vazio
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
