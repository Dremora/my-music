import { barStyle, containerStyle } from "./styles.css";

export function BurgerIcon() {
  return (
    <div className={containerStyle}>
      <div className={barStyle} />
      <div className={barStyle} />
      <div className={barStyle} />
    </div>
  );
}
