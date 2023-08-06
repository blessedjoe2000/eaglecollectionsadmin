"use client";

import Layout from "@/app/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function NewProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  // const { data: session, status } = useSession();
  // console.log("session", session);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { title, description, price };
    await axios.post("/api/products", productData);
    router.push("/products");
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h1 className="text-purple-700 mb-2 text-xl ">New Product</h1>
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

        <div className="">
          <button type="submit" className=" btn-form">
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default NewProducts;
