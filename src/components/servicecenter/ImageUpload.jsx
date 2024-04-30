import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

export default function ImageUpload({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-pure-greys-600" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-gray-600" : ""
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-gray-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
              loading="lazy"
            />
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-gray-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-blue-150" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-gray-400">
              Drag and drop an image, or click to{" "}
              <span className="font-semibold text-sky-500">Browse</span> a
              file
            </p>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-500">
          {label} is required
        </span>
      )}
    </div>
  )
}
