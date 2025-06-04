import { useCallback } from "react";

import { imageStyle, inputStyle, rootStyle } from "./styles.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function Search({ onChange, value }: Props) {
  const updateValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
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

export default Search;
