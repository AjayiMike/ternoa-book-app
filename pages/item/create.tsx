import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {BiImageAdd} from 'react-icons/bi'

const CreateItem = () => {
    const onDrop = useCallback(async (acceptedFiles:any) => {
      console.log(acceptedFiles);
      
        const formData = new FormData();
        const [file] = acceptedFiles;
        formData.append("file", file);

        // await fetch("https://httpbin.org/post", {
        //   method: "POST",
        //   body: formData
        // });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
          'image/*': ['.jpeg', '.png']
        }
    });
    return (
        <main className="min-h-fit container mx-auto mt-8 px-4 sm:px-0 mb-16">
          <form>
            <div {...getRootProps()} className="flex justify-center items-center border-2 border-gray-300 border-dashed rounded-2xl py-8">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-center text-sm text-gray-400">Drop the file here ...</p>
                ) : (
                  <div className="">
                    <BiImageAdd className="w-16 h-16 text-gray-400 block mx-auto" />
                    <p className="text-center text-sm text-gray-400">Drag 'n' drop the book cover here, or click to select files</p>
                  </div>
                )}
            </div>

            
              <div className="mt-8">
                <label htmlFor="title" className="block text-gray-500">TITLE</label>
                <input type = "text" id = "title" className="block border border-gray-500 w-full p-2 rounded" />
              </div>
              <div className="mt-8">
                <label htmlFor="description" className="block text-gray-500">DESCRIPTION</label>
                <textarea id = "description" className="block w-full border border-gray-500 h-32 md:h-40 lg:h-52 p-2 rounded" />
              </div>
              <div className="mt-8">
                <button className="bg-gradient-to-r from-red-500 to-orange-300 p-3 rounded-xl text-white w-full">Create</button>
              </div>
            </form>
        </main>
    );
};

export default CreateItem;
