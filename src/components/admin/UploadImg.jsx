import { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeImg, uploadImg } from "../../api/product";
import useStore from "../../store/store";
import { Loader } from "lucide-react";

function UploadImg({ form, setForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const token = useStore((state) => state.token);

  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;

    if (files) {
      setIsLoading(true);
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        // console.log("🚀 ~ handleOnChange ~ i:", files[i]);

        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not image!`);
          continue;
        }

        //Image resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (data) => {
            try {
              // อัพโหลดรูปภาพไปยัง backend
              const res = await uploadImg(token, data);
              console.log("Upload successful:", res);

              allFiles.push(res.data);
              setForm({
                ...form,
                images: allFiles,
              });
              setIsLoading(false);
              toast.success("Upload image sucessful!");
            } catch (err) {
              setIsLoading(false);
              console.error("Error uploading image:", err);
            }
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = async (public_id) => {
    try {
      const images = form.images;

      // delete image fuction
      const res = await removeImg(token, public_id);

      // filler exit image
      const filterImages = images.filter(
        (item) => item.public_id !== public_id
      );

      // set form
      setForm({
        ...form,
        images: filterImages,
      });

      toast.success(`Image removed successfully!`);
    } catch (error) {
      toast.error(`Failed to remove the image: ${error.message}`);
      console.error("Error in handleDelete:", error);
    }
  };

  return (
    <div className="mb-4">
      {/* Image Preview */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {isLoading && <Loader className="animate-spin w-16 h-16" />}

        {form.images.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden relative group"
          >
            <img src={item.url} className="w-full h-96 object-cover" />
            <button
              type="button"
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-2 right-2 text-white text-3xl p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {/* Upload Button */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Upload Image
        </label>
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={handleOnChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}

export default UploadImg;
