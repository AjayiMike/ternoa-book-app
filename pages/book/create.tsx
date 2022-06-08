import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {BiImageAdd} from 'react-icons/bi'
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import clsx from "clsx";
import ipfs from "../../utils/ipfs"
import { useWeb3React } from "@web3-react/core";

const CreateBook = () => {

  const router = useRouter()
  const [seletedImage, setSeletedImage] = useState<any>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setdescription] = useState<string>("")
  const [seletedImagePreviewSrc, setSeletedImagePreviewSrc] = useState<any>(null)
  const [imageAreaText, setImageAreaText] = useState("Drag 'n' drop the book cover here, or click to select file")
  const [processing, setProcessing] = useState<boolean>(false)
    const onDrop = useCallback(async (acceptedFiles:any) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
          const binaryStr = new Buffer(reader.result as string)
          const imagePreview = `data:${acceptedFiles[0].type};base64,${binaryStr.toString("base64")}`;
          setSeletedImagePreviewSrc(imagePreview)
          setSeletedImage(binaryStr)
          
      }
      reader.readAsArrayBuffer(acceptedFiles[0])

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1
    });

    const {active, account} = useWeb3React()

    useEffect(() => {

      if(isDragActive) return setImageAreaText("Drop the file here ...")

      return setImageAreaText("Drag 'n' drop the book cover here, or click to select files")
      
    }, [isDragActive])


    const onSubmit = async (e: any) => {
      e.preventDefault();
      if(!setSeletedImage || !title || !description) return toast('No field should be empty!');
      if(!active || !account) return toast('Please connect your wallet to create a book');

      setProcessing(true)
      try {
        const res = await ipfs.add(seletedImage);
        if(!res.path) throw "an error occured"
        const serverRes = await fetch("/api/books/upload", {
          method: "POST",
          body: JSON.stringify({
            title,
            description,
            ipfsPath: res.path,
            ownerAddress: account,
          })
        })
        if(serverRes.status !== 200)
        return toast('Something went wrong! Please try again');

        toast('Book added successfully');
        router.push("/")
      } catch (error) {
        console.error(error);
        return toast('Something went wrong! Please try again');
      } finally {
        setProcessing(false)
      }
      
    }
    

    return (
        <main className="min-h-fit container max-w-3xl mx-auto mt-8 px-4 sm:px-0 mb-16">
          <h1 className="text-lg md:text-2xl font-bold mb-6">Add to the list of books you&apos;ve read</h1>
          <form onSubmit={onSubmit}>
            <div {...getRootProps()} className="flex justify-center items-center border-2 border-gray-300 border-dashed rounded-2xl py-4 md:py-8">
              <input {...getInputProps()} />
                  {seletedImagePreviewSrc ? 
                    <Image 
                      src = {seletedImagePreviewSrc}
                      width = {80}
                      height = {100}
                      alt = "Book cover preview"
                    /> : 
                    <div className="">
                      <BiImageAdd className="w-12 h-12 text-gray-400 block mx-auto" />
                      <p className="text-center text-xs text-gray-400">{imageAreaText}</p>
                  </div>
                  }
            </div>
              <div className="mt-4">
                <label htmlFor="title" className="block text-gray-500 text-sm">TITLE</label>
                <input type = "text" id = "title" className="block border border-gray-500 w-full p-1 rounded" value={title} onChange = {(e) => setTitle(e.target.value)} />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block text-gray-500 text-sm">DESCRIPTION</label>
                <textarea id = "description" className="block w-full border border-gray-500 h-32 md:h-40 lg:h-52 p-1 rounded" value={description} onChange = {(e) => setdescription(e.target.value)} />
              </div>
              <div className="mt-4">
                <button className = {clsx({"bg-gradient-to-r from-red-500 to-orange-300 p-4 rounded-lg font-black text-white w-full": true, "from-gray-400 to-gray-300": processing})} disabled = {processing}>{processing ? "Creating..." : "Create"}</button>
              </div>
            </form>
        </main>
    );
};

export default CreateBook;
