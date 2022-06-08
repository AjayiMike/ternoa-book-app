import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiImageAdd } from "react-icons/bi";
import { useRouter } from "next/router";
import { Book } from "../../../types/apiData";
import Image from "next/image";
import { toast } from "react-toastify";
import ipfs from "../../../utils/ipfs"
import clsx from "clsx";
import { useWeb3React } from "@web3-react/core";
import ErrorPage from 'next/error'

const EditBook = () => {
    const router = useRouter();
    const { id } = router.query;

    const onDrop = useCallback(async (acceptedFiles: any) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
            const binaryStr = new Buffer(reader.result as string);
            const imagePreview = `data:${
                acceptedFiles[0].type
            };base64,${binaryStr.toString("base64")}`;
            setSeletedImagePreviewSrc(imagePreview);
            setSeletedImage(binaryStr);
        };
        reader.readAsArrayBuffer(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
        maxFiles: 1,
    });

    const {active, account} = useWeb3React()

    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [imageAreaText, setImageAreaText] = useState(
        "Drag 'n' drop the book cover here, or click to select files"
    );
    const [seletedImagePreviewSrc, setSeletedImagePreviewSrc] =
        useState<any>(null);
    const [seletedImage, setSeletedImage] = useState<any>(null);
    const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [processing, setProcessing] = useState<boolean>(false)
  const [error, setError] = useState<{statusCode: number | null, isError:boolean}>({statusCode: null, isError: false})

    const init = async () => {
        if(!active || !account) {
             toast('Wallet not connected');
             return router.push("/")
        }
        try {
            const bookRes = await fetch(`/api/books/${id}`);
            if (bookRes.status !== 200) return setError({
                isError: true,
                statusCode: bookRes.status
            })
            const parsedRes = await bookRes.json();
            if(parsedRes.book === null) return setError({
                isError: true,
                statusCode: 404
            })

            if(parsedRes.book.ownerAddress !== account) {
                toast('You can not update a book that is not created by you!');
                return router.push("/")
            }
            setCurrentBook(parsedRes.book);
            setSeletedImagePreviewSrc(`https://gateway.ipfs.io/ipfs/${parsedRes.book.coverImageIpfsPath}`)
            setTitle(parsedRes.book.title)
            setDescription(parsedRes.book.description)
        } catch (error) {
            return setError({
                isError: true,
                statusCode: 500
            })
        }
    };
    useEffect(() => {
        if (!id) return;
        init();
    }, [id]);

    useEffect(() => {
        if (isDragActive) return setImageAreaText("Drop the file here ...");

        return setImageAreaText(
            "Drag 'n' drop the book cover here, or click to select files"
        );
    }, [isDragActive]);

    const onSubmit = async (e: any) => {
      e.preventDefault();
      
      if(!setSeletedImage || !title || !description) return toast('No field should be empty!');
      setProcessing(true)
      try {
        let newImgPath;
        if(seletedImage) {
          const res = await ipfs.add(seletedImage);
          if(!res.path) throw "an error occured"

          newImgPath = res.path;
        }
        const serverRes = await fetch("/api/books/update", {
          method: "PUT",
          body: JSON.stringify({
            id,
            title,
            description,
            ipfsPath: seletedImage ? newImgPath : currentBook?.coverImageIpfsPath,
          })
        })
        if(serverRes.status !== 200)
        
        return toast('Something went wrong! Please try again');

        toast('Book Updated successfully');
        router.push("/")
      } catch (error) {
        console.log(error);
        return toast('Something went wrong! Please try again');
      } finally {
        setProcessing(false)
      }
      
    }

    if(error.isError) return <ErrorPage statusCode={error.statusCode as number} />

    return (
        <main className="min-h-fit container mx-auto max-w-3xl mt-8 px-4 sm:px-0 mb-16">
            <h1 className="text-lg md:text-2xl font-bold mb-6">Edit Book</h1>
            <form onSubmit={onSubmit}>
                <div
                    {...getRootProps()}
                    className="flex justify-center items-center border-2 border-gray-300 border-dashed rounded-2xl py-4 md:py-8"
                >
                    <input {...getInputProps()} />
                    {seletedImagePreviewSrc ? (
                        <Image
                            src={seletedImagePreviewSrc}
                            width={80}
                            height={100}
                        />
                    ) : (
                        <div className="">
                            <BiImageAdd className="w-12 h-12 text-gray-400 block mx-auto" />
                            <p className="text-center text-xs text-gray-400">
                                {imageAreaText}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <label
                        htmlFor="title"
                        className="block text-gray-500 text-sm"
                    >
                        TITLE
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange = {(e) => setTitle(e.target.value)}
                        className="block border border-gray-500 w-full p-1 rounded"
                    />
                </div>
                <div className="mt-8">
                    <label
                        htmlFor="description"
                        className="block text-gray-500 text-sm"
                    >
                        DESCRIPTION
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange = {(e) => setDescription(e.target.value)}
                        className="block w-full border border-gray-500 h-32 md:h-40 lg:h-52 p-1 rounded"
                    />
                </div>
                <div className="mt-8">
                <div className="mt-4">
                <button className = {clsx({"bg-gradient-to-r from-red-500 to-orange-300 p-4 rounded-lg font-black text-white w-full": true, "from-gray-400 to-gray-300": processing})} disabled = {processing}>{processing ? "Updating Book..." : "Update Book"}</button>
              </div>
                </div>
            </form>
        </main>
    );
};

export default EditBook;
