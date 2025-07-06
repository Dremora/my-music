import { type ChangeEvent, useCallback } from "react";

import { imageStyle, inputStyle, rootStyle } from "./styles.css";

type SearchProps = {
  readonly onChange: (value: string) => void;
  readonly value: string;
};

export function Search({ onChange, value }: SearchProps) {
  const updateValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={rootStyle}>
      <svg
        className={imageStyle}
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.846 8.462a5.391 5.391 0 0 1-5.384 5.384 5.391 5.391 0 0 1-5.385-5.384 5.391 5.391 0 0 1 5.385-5.385 5.391 5.391 0 0 1 5.384 5.385zm6.154 10c0-.41-.168-.806-.445-1.082l-4.122-4.123a8.442 8.442 0 0 0 1.49-4.795A8.459 8.459 0 0 0 8.462 0 8.459 8.459 0 0 0 0 8.462a8.459 8.459 0 0 0 8.462 8.461 8.445 8.445 0 0 0 4.795-1.49l4.123 4.11c.276.289.673.457 1.082.457A1.55 1.55 0 0 0 20 18.462z"
          fill="#DCD4D4"
          fillRule="evenodd"
        />
      </svg>
      <input
        className={inputStyle}
        onChange={updateValue}
        placeholder="Search for music…"
        value={value}
      />
    </div>
  );
}
