import { buttonGroupStyle, buttonStyle, containerStyle } from "./styles.css";

type AppleMusicFilterProps = {
  readonly onChange: (value: boolean | null) => void;
  readonly value: boolean | null;
};

export function AppleMusicFilter({ onChange, value }: AppleMusicFilterProps) {
  return (
    <div className={containerStyle}>
      <div className={buttonGroupStyle}>
        <button
          className={buttonStyle({ active: value === null })}
          onClick={() => {
            onChange(null);
          }}
          type="button"
        >
          All
        </button>
        <button
          className={buttonStyle({ active: value === true })}
          onClick={() => {
            onChange(true);
          }}
          type="button"
        >
          In Apple Music
        </button>
        <button
          className={buttonStyle({ active: value === false })}
          onClick={() => {
            onChange(false);
          }}
          type="button"
        >
          Not in Apple Music
        </button>
      </div>
    </div>
  );
}
