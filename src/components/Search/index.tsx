import { type ChangeEvent, useCallback } from "react";

import { imageStyle, inputStyle, rootStyle } from "./styles.css";

type Props = {
  readonly value: string;
  readonly onChange: (value: string) => void;
};

export function Search({ onChange, value }: Props) {
  const updateValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={rootStyle}>
      <img
        alt=""
        className={imageStyle}
        height={20}
        src="/search.svg"
        width={20}
      />
      <input
        className={inputStyle}
        onChange={updateValue}
        placeholder="Search for music…"
        value={value}
      />
    </div>
  );
}
