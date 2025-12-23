import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type FormData = {
  customer: string;
  paymentId: string;
  name: string;
  lastName: string;
  email: string;
  cpf: string;
  sex: string;
  maritalStatus: string;
  city: string;
  age: string;
  lodging: string;
  phone: string;
  billingType: string;
  installmentCount: number | null;
  description: string;
  invoiceUrl: string;
  status: string;
  notificationDisabled: boolean;
  groupName: "GE"
};

type FormContextType = {
  form: FormData;
  setForm: (data: Partial<FormData>) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setFormState] = useState<FormData>({
    customer: "",
    paymentId: "",
    name: "",
    lastName: "",
    email: "",
    cpf: "",
    sex: "",
    maritalStatus: "",
    city: "",
    age: "",
    lodging: "",
    phone: "",
    billingType: "",
    installmentCount: null,
    description: "",
    invoiceUrl: "",
    status: "",
    notificationDisabled: true,
    groupName: "GE"
  });

  const setForm = (data: Partial<FormData>) => {
    setFormState((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormState({
      customer: "",
      paymentId: "",
      name: "",
      lastName: "",
      email: "",
      cpf: "",
      sex: "",
      maritalStatus: "",
      city: "",
      age: "",
      lodging: "",
      phone: "",
      billingType: "",
      installmentCount: null,
      description: "",
      invoiceUrl: "",
      status: "",
      notificationDisabled: true,
      groupName: "GE"
    });
  };

  return (
    <FormContext.Provider value={{ form, setForm, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext deve ser usado dentro de um FormProvider");
  return context;
};
