import { barStyle, containerStyle } from "./styles.css";

function BurgerIcon() {
  return (
    <div className={containerStyle}>
      <div className={barStyle} />
      <div className={barStyle} />
      <div className={barStyle} />
    </div>
  );
}

export default BurgerIcon;
