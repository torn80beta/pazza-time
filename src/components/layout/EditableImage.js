import Image from "next/image";
import NoImage from "../icons/NoImage";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink, variant }) {
  async function handleFileChange(e) {
    const files = e.target.files;

    if (files.length === 1) {
      const data = new FormData();
      data.append("file", files[0]);
      // setIsUploading(true);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((res) => {
        if (res.ok) {
          return res.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Upload failed!");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete.",
        error: "Upload failed.",
      });
    }
  }

  return (
    <>
      {(link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          alt="user image"
          width={250}
          height={250}
          priority={true}
        />
      )) || <NoImage />}
      <label className="p-0">
        <input className="hidden" type="file" onChange={handleFileChange} />
        <span className="block text-center border border-grey-300 rounded-lg p-2 cursor-pointer">
          {link ? "Edit" : `Upload ${variant}`}
        </span>
      </label>
    </>
  );
}
