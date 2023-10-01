import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  images: existingImages,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const uploadImages = async (e) => {
    const files = e?.target?.files;
    setIsUploading(true);

    if (!files) return;

    const filesArray = Array.from(files);

    if (filesArray?.length > 0) {
      const formData = new FormData();

      filesArray.forEach((file) => formData.append("file", file));

      const response = await axios.post(`/api/upload`, formData);
      setIsUploading(false);

      setImages((oldImages) => {
        return [...oldImages, ...response.data.links];
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { title, description, price, images };

    if (!title || !price) {
      console.log("title and price is required");
      return;
    }

    try {
      if (_id) {
        //update product
        await axios.patch(`/api/products/${_id}`, { ...productData });
      } else {
        //create product
        await axios.post("/api/products", productData);
      }
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const sortImagesOrder = (images) => {
    setImages(images);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">
          Title<span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title..."
          className=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="10"
          rows="5"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <label>Photos </label>
      <div className="flex flex-wrap gap-1 mb-2">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={sortImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div className=" h-24" key={link}>
                <img className="rounded-lg" src={link} alt="product item" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24  p-2 flex items-center">
            <Spinner />
          </div>
        )}
        <label
          htmlFor="images"
          className=" w-24 h-24 cursor-pointer bg-gray-200 rounded-lg text-gray-900 p-2 flex flex-col justify-center items-center text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>

        <input
          className="hidden"
          name="images"
          id="images"
          type="file"
          onChange={uploadImages}
        ></input>
      </div>

      <div>
        <label htmlFor="price">
          Price (in USD)<span className="required">*</span>
        </label>
        <input
          type="number"
          id="price"
          placeholder="$"
          className=""
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className=" btn-form">
          Save
        </button>
        <Link href={"/products"} className="btn-cancel">
          Cancel
        </Link>
      </div>
    </form>
  );
}
