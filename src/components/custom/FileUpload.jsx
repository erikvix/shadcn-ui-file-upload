import { File, UploadCloud, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [progressBar, setProgressBar] = useState("");
  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles);
    setFiles((prevFiles) => {
      return [...prevFiles, ...acceptedFiles];
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const onUploadProgress = (event) => {
    const percentCompleted = Math.round((event.loaded * 100) / event.total);
    console.log("onUploadProgress", percentCompleted);
  };

  const upload = async (files) => {
    const data = new FormData();

    for (const [index, file] of files.entries()) {
      data.append(index, file);
    }

    try {
      const result = await axios.put("/endpoint/url", data, {
        onUploadProgress,
      });

      console.log("result is", result);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Upload complete");
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className=" text-center">
          <div className=" border p-2 rounded-md max-w-min mx-auto">
            <UploadCloud size={20} />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">Arraste e solte os arquivos</span>
          </p>
          <p className="text-xs text-gray-500">
            Click to upload files &#40;files should be under 10 MB&#41;
          </p>
        </div>
        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <ScrollArea className="h-40">
          <div>
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Uploaded Files
            </p>
            <div className="space-y-2 pr-3">
              {files.map((file) => {
                return (
                  <div
                    key={file.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div className="text-white">
                        <File className="text-primary" />
                      </div>
                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">
                            {file.name.slice(0, 25)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file)}
                      className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      )}
      <div></div>
    </div>
  );
}
