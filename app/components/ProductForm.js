import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { title, description, price };
    if (_id) {
      //update product
      await axios.patch(`/api/products/${_id}`, { ...productData });
    } else {
      //create product
      await axios.post("/api/products", productData);
    }
    router.push("/products");
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
