import "./Button.scss";

type ButtonContinueProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

function ButtonContinue({ onClick, disabled, label = "Continue" }: ButtonContinueProps) {
  return (
    <button
      className="button-continue"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default ButtonContinue;
