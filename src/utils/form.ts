import { createContext, use } from "react";

type FormContextType = {
  isSubmitting: boolean;
  setFieldError: () => void;
  submitted: boolean;
  unsetFieldError: () => void;
};

export const FormContext = createContext<FormContextType>({
  get submitted(): boolean {
    throw new Error("FormContext is not provided");
  },
  setFieldError: () => {
    throw new Error("FormContext is not provided");
  },
  unsetFieldError: () => {
    throw new Error("FormContext is not provided");
  },
  isSubmitting: false,
});

export function useForm() {
  return use(FormContext);
}
