import { INFTContext, NFTContext } from "context/NFTContext";
import { ChangeEvent, useContext } from "react";

interface IInputProps {
  inputType: string;
  title: string;
  placeholder: string;
  handleOnClick: (
    event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => void;
}
const Input = ({
  inputType,
  title,
  placeholder,
  handleOnClick,
}: IInputProps) => {
  const  { nft } = useContext<INFTContext>(NFTContext)
  return (
    <div className="mt-10 w-full">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        {title}
      </p>

      {inputType === "textarea" ? (
        <textarea
          placeholder={placeholder}
          rows={10}
          className="dark:bg-nft-black-1 bg-white border border-nft-gray-2 dark:border-nft-dark-1 rounded-lg w-full font-poppins text-base dark:text-white text-nft-gary-2 mt-4 py-3 outline-none px-4"
          onChange={handleOnClick}
        />
      ) : inputType === "number" ? (
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-black-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            placeholder={placeholder}
            onChange={handleOnClick}
          />
          <p>{nft}</p>
        </div>
      ) : (
        <>
          <input
            type={inputType}
            placeholder={placeholder}
            className="dark:bg-nft-black-1 bg-white border dark:borer-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          />
        </>
      )}
    </div>
  );
};

export default Input;
