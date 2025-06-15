import type { ReactNode } from "react";

import Text from "components/Text";

import { containerStyle, contentsStyle, labelStyle } from "./styles.css";

type Props = {
  readonly label: string;
  readonly children: ReactNode;
};

function FormField({ children, label }: Props) {
  return (
    <label className={containerStyle}>
      <div className={labelStyle}>
        <Text color="darkPlatinum" weight="bold">
          {label}
        </Text>
      </div>
      <div className={contentsStyle}>{children}</div>
    </label>
  );
}

export default FormField;
