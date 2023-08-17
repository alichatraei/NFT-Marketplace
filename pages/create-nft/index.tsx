import { ChangeEvent, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button, Input } from "@/components/index";
import images from "@/assets/index";
import { NFTContext } from "context/NFTContext";

type TFormInfo = { name: string; description: string; price: string };

const CreatedNFT = () => {
  const [fileURL, setFileURL] = useState<{ url: string } | null>(null);
  const [formInfo, setFormInfo] = useState<TFormInfo | null>(null);
  const { uploadToIPFS } = useContext(NFTContext);
  const { theme } = useTheme();
  const onDrop = useCallback(async (acceptedFile: File[]) => {
    // upload image to blockchain ipfs
    const result = await uploadToIPFS(acceptedFile[0]);
    console.log(result);
    setFileURL(result as any);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*", maxSize: 5000000 });
  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
      ${isDragActive ? "border-file-active" : null}
      ${isDragAccept ? "border-file-accept" : null}
      ${isDragReject ? "border-file-reject" : null}`,
    [isDragActive, isDragAccept, isDragReject]
  );
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold xs:ml-0">
          Create new NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flex flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM Max 5mb.
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    alt="file uplaod"
                    objectFit="contain"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  or Browse media on your device
                </p>
              </div>
            </div>
            {fileURL && (
              <aside>
                <div>
                  <img
                    src={`https://achkit.infura-ipfs.io/${fileURL}`}
                    alt="asset_file"
                    width={200}
                    height={200}
                  />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name "
          placeholder="NFT name"
          handleOnClick={(event: ChangeEvent<HTMLInputElement>) => {
            setFormInfo({
              ...(formInfo as TFormInfo),
              name: event.target.value,
            });
          }}
        />
        <Input
          inputType="textarea"
          title="Description "
          placeholder="NFT Description"
          handleOnClick={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setFormInfo({
              ...(formInfo as TFormInfo),
              description: event.target.value,
            });
          }}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT price"
          handleOnClick={(event: ChangeEvent<HTMLInputElement>) => {
            setFormInfo({
              ...(formInfo as TFormInfo),
              price: event.target.value,
            });
          }}
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            buttonName="Create NFT"
            classStyles="py-3 nft-gradient rounded-xl"
            handleClickOnButton={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatedNFT;
