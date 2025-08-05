import { AnimatePresence, motion } from "motion/react";
import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import type { ZodMiniType } from "zod/v4-mini";

import { MultilineTextInput } from "components/multiline-text-input";
import { Select } from "components/select";
import { Text } from "components/text";
import { TextInput } from "components/text-input";
import { useIsFirstRender } from "data/use-is-first-render";
import { useForm } from "utils/form";

import { containerStyle, contentsStyle, labelStyle } from "./styles.css";

type FormFieldProps = {
  readonly children: (props: {
    readonly setTouched: () => void;
    readonly showError: boolean;
  }) => ReactNode;
  readonly error?: string;
  readonly label: string;
};

function FormField({ children, error, label }: FormFieldProps) {
  const { setFieldError, submitted, unsetFieldError } = useForm();
  const isFirstRender = useIsFirstRender();

  const [isTouched, setIsTouched] = useState(false);

  const setTouched = () => {
    setIsTouched(true);
  };

  const showError = error !== undefined && (isTouched || submitted);

  useEffect(() => {
    if (error !== undefined) {
      setFieldError();

      return () => {
        unsetFieldError();
      };
    }

    return;
  }, [error, setFieldError, unsetFieldError]);

  return (
    <label className={containerStyle}>
      <div className={labelStyle}>
        <Text color="darkPlatinum" weight="bold">
          {label}
        </Text>
      </div>
      <div className={contentsStyle}>{children({ setTouched, showError })}</div>
      <motion.div
        animate={{ height: showError ? "auto" : 0 }}
        initial={{ height: showError ? "auto" : 0 }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {showError && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: isFirstRender ? 1 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <Text color="vermilion" size="small">
                {error}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </label>
  );
}

type TextInputFormFieldProps<T> = {
  readonly children?: ReactNode;
  readonly format: (value: T) => string;
  readonly inputmode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  readonly label: string;
  readonly onChange: (value: T) => void;
  readonly parse: (value: string) => T;
  readonly pattern?: string;
  readonly schema: ZodMiniType<T>;
  readonly value: T;
};

export function TextInputFormField<T>({
  children,
  format,
  inputmode,
  label,
  onChange,
  parse,
  pattern,
  schema,
  value,
}: TextInputFormFieldProps<T>) {
  const { isSubmitting } = useForm();
  const parsedValue = schema.safeParse(value);

  const cleanValue = () => {
    onChange(parsedValue.success ? parsedValue.data : value);
  };

  return (
    <FormField
      error={
        parsedValue.success ? undefined : parsedValue.error.issues[0]?.message
      }
      label={label}
    >
      {({ setTouched, showError }) => (
        <>
          <TextInput
            disabled={isSubmitting}
            hasError={showError}
            inputmode={inputmode}
            onBlur={() => {
              setTouched();
              cleanValue();
            }}
            onChange={(e) => {
              onChange(parse(e.target.value));
            }}
            pattern={pattern}
            value={format(value)}
          />
          {children}
        </>
      )}
    </FormField>
  );
}

type MultilineTextInputFormFieldProps<T> = {
  readonly format: (value: T) => string;
  readonly inputmode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  readonly label: string;
  readonly onChange: (value: T) => void;
  readonly parse: (value: string) => T;
  readonly schema: ZodMiniType<T>;
  readonly value: T;
};

export function MultilineTextInputFormField<T>({
  format,
  inputmode,
  label,
  onChange,
  parse,
  schema,
  value,
}: MultilineTextInputFormFieldProps<T>) {
  const { isSubmitting } = useForm();
  const parsedValue = schema.safeParse(value);

  const cleanValue = () => {
    onChange(parsedValue.success ? parsedValue.data : value);
  };

  return (
    <FormField
      error={
        parsedValue.success ? undefined : parsedValue.error.issues[0]?.message
      }
      label={label}
    >
      {({ setTouched, showError }) => (
        <MultilineTextInput
          disabled={isSubmitting}
          hasError={showError}
          inputmode={inputmode}
          onBlur={() => {
            setTouched();
            cleanValue();
          }}
          onChange={(e) => {
            onChange(parse(e.target.value));
          }}
          value={format(value)}
        />
      )}
    </FormField>
  );
}

export function identity<T>(value: T): T {
  return value;
}

type SelectFormFieldProps<T extends string> = {
  readonly allowEmpty?: boolean;
  readonly label: string;
  readonly onChange: (value: T) => void;
  readonly options: readonly { readonly id: T; readonly label: string }[];
  readonly schema: ZodMiniType<T>;
  readonly value: T | null;
};

export function SelectFormField<T extends string>({
  allowEmpty,
  label,
  onChange,
  options,
  schema,
  value,
}: SelectFormFieldProps<T>) {
  const { isSubmitting } = useForm();
  const parsedValue = schema.safeParse(value);

  return (
    <FormField
      error={
        parsedValue.success ? undefined : parsedValue.error.issues[0]?.message
      }
      label={label}
    >
      {({ setTouched, showError }) => (
        <Select<T>
          allowEmpty={allowEmpty}
          disabled={isSubmitting}
          hasError={showError}
          onChange={(selectedValue) => {
            setTouched();
            onChange(selectedValue);
          }}
          value={value}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    </FormField>
  );
}
