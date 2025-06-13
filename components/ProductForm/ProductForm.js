import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

export default function ProductForm({
  _id,
  title: existingTitle,
  images: existingImages,
  description: existingDescription,
  price: existingPrice,
  newPrice: existingNewPrice,
  colors: existingColors,
  sizes: existingSizes,
  category: existingCategory,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [newPrice, setNewPrice] = useState(existingNewPrice || "");
  const [colors, setColors] = useState(existingColors || "");
  const [sizes, setSizes] = useState(existingSizes || "");
  const [category, setCategory] = useState(existingCategory || []);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const categories = [
    "Uncategorized",
    "Laces",
    "Georges",
    "Ankara",
    "Headtie",
    "Shoes",
    "Brocade",
    "Intorika",
    "Jewelries",
    "Beads",
    "Slippers",
    "Accessories",
    "Bags",
    "Shoes and Bags",
    "Clutches",
    "Belts",
    "Velvet",
    "Men Shoes",
    "Men Hats",
    "Dresses",
    "Men Fabrics",
  ];

  const removePhotos = (imageLink) => {
    const filteredImg = images.filter((imgLink) => imgLink !== imageLink);
    setImages(filteredImg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      description,
      price,
      images,
      newPrice,
      colors,
      sizes,
      category,
    };

    if (!title) {
      return toast.error("Title is required. Please enter title", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }

    if (!category || category.length === 0) {
      return toast.error("Choose product category", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }

    if (!price) {
      return toast.error("Price is required. Please enter price", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }

    try {
      if (_id) {
        //update product
        await axios.patch(`/api/products/${_id}`, { ...productData });
        toast.success("product updated successfully", {
          style: {
            border: "1px solid #01B700",
            padding: "16px",
            color: "#01B700",
          },
          iconTheme: {
            primary: "#01B700",
            secondary: "#FFFAEE",
          },
        });
      } else {
        //create product
        await axios.post("/api/products", productData);
        toast.success("product created successfully", {
          style: {
            border: "1px solid #01B700",
            padding: "16px",
            color: "#01B700",
          },
          iconTheme: {
            primary: "#01B700",
            secondary: "#FFFAEE",
          },
        });
      }

      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const redirectBack = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">
          Product name<span className="required">*</span>
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
          cols="5"
          rows="3"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor="category">
          Choose Category<span className="required">*</span>
        </label>
        <select
          className="text-sm"
          value={category || ""}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories &&
            categories?.map((categoryValue, index) => (
              <option value={categoryValue} key={index}>
                {categoryValue}
              </option>
            ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="colors">Colors</label>
        <input
          className="p-0"
          name="colors"
          type="text"
          placeholder="Enter product colors, separate with comma"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 py-2">
        <label htmlFor="sizes">Sizes</label>
        <input
          className="p-0"
          name="sizes"
          type="text"
          placeholder="Enter product sizes, separate with comma"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {!!images?.length &&
          images.map((imgLink, index) => (
            <div className="h-24 relative" key={index}>
              <button
                type="button"
                className="absolute right-0 bg-white/70 px-1 text-sharp-pink text-sm rounded-full"
                onClick={() => removePhotos(imgLink)}
              >
                X
              </button>
              <Image
                src={imgLink}
                alt="product image"
                width={70}
                height={50}
                className="rounded-lg"
              />
            </div>
          ))}

        {isUploading && (
          <div className="h-24 p-2 flex items-center">
            <Spinner />
          </div>
        )}

        <UploadButton
          endpoint="courseImage"
          onUploadBegin={() => setIsUploading(true)}
          onClientUploadComplete={(res) => {
            setIsUploading(false);
            if (res && res.length > 0) {
              const imageUrls = res.map((img) => img.ufsUrl);
              setImages((prev) => [...prev, ...imageUrls]);
              toast.success("Upload complete!");
            }
          }}
          onUploadError={(err) => {
            setIsUploading(false);
            toast.error("Upload failed");
            console.error(err);
          }}
        />
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

      <div>
        <label htmlFor="newPrice">New price (in USD)</label>
        <input
          type="number"
          id="newPrice"
          placeholder="$"
          className=""
          min={0}
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className=" btn-save
        "
        >
          Save
        </button>
        <button type="button" onClick={redirectBack} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}
