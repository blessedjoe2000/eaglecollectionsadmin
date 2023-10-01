"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function page() {
  const [name, setName] = useState([]);

  const saveName = async (e) => {
    e.preventDefault();
    console.log("here");

    await axios.post("/api/categories", { name });
    setName("");
  };
  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={saveName}>
        <label>
          New category name<span className="required">*</span>
        </label>
        <div className="flex gap-1">
          <input
            className="mb-0"
            type="text"
            placeholder="Enter new category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className=" btn-form">
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
}
