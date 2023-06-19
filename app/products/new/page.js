"use client";

import Layout from "@/app/components/Layout";
import { useState } from "react";

function NewProducts() {
  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            value={Title}
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
            Price<span className="required">*</span>
          </label>
          <input
            type="number"
            id="price"
            placeholder="$"
            className=""
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="">
          <button type="submit" className=" btn-form">
            Save
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default NewProducts;
