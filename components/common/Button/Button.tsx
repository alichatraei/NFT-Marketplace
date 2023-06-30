interface IButtonProps {
  buttonName: string;
  classStyles: string;
  handleClickOnButton: () => void;
}

const Button = ({
  buttonName,
  classStyles,
  handleClickOnButton,
}: IButtonProps) => {
  return (
    <button
      type="button"
      className={` text-sm font-poppins minlg:text-lg py-2 px-6 minlg:px-8 font-semibold text-white  ${classStyles}`}
      onClick={handleClickOnButton}
    >
      {buttonName}
    </button>
  );
};

export default Button;
