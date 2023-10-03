"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Categories() {
  const [name, setName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const getCategories = async () => {
    const response = await axios.get("/api/categories");
    setCategories(response.data);
    return response.data;
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSaveCategory = async (e) => {
    e.preventDefault();

    const categoryData = { name, parentCategory };

    if (editedCategory) {
      await axios.patch("/api/categories", {
        ...categoryData,
        _id: editedCategory._id,
      });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", categoryData);
    }

    setName("");
    getCategories();
    setParentCategory("Select parent category");
  };

  const handleEditCategory = async (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  };

  const handleDeleteCategory = async (id) => {
    await axios.delete("/api/categories", id);
  };
  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={handleSaveCategory}>
        <label>
          {editedCategory
            ? `Edit category ${editedCategory.name}  `
            : "Create category"}
        </label>
        <div className="flex gap-1">
          <input
            className="mb-0"
            type="text"
            placeholder="Enter new category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="mb-0"
            onChange={(e) => setParentCategory(e?.target?.value)}
            value={parentCategory}
          >
            <option value="">Select parent category</option>
            {categories &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
          <button type="submit" className=" btn-form">
            Save
          </button>
        </div>
      </form>
      <table className="">
        <thead>
          <tr>
            <td>Categories</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr>
                <td>{category?.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
