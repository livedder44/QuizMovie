import "./BackButton.scss";

type BackButtonProps = {
  onClick: () => void;
};

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button type="button" className="button-back" onClick={onClick}>
    </button>
  );
}

export default BackButton;
