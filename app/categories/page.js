"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [name, setName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [properties, setProperties] = useState([]);

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

    const categoryData = {
      name,
      parentCategory,
      properties: properties?.map((p) => ({
        name: p.name,
        values: p.values.trim().split(","),
      })),
    };

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
    setParentCategory("");
    setProperties("");
  };

  const handleEditCategory = async (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(category.properties);
  };

  const handleDeleteCategory = (category) => {
    swal
      .fire({
        title: "Confirm Delete",
        text: `Are you sure you want to delete ${category.name} category?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        confirmButtonColor: "#DC2625",
        reverseButtons: true,
      })
      .then(async (result) => {
        const { _id } = category;
        if (result.isConfirmed) {
          await axios.delete(`/api/categories/${_id}`);
          getCategories();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (index, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValuesChange = (index, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const handleCloseProperty = (index) => {
    setProperties((prev) => {
      return [...prev].filter((property, innerIndex) => innerIndex !== index);
    });
  };

  const cancleEditedCategory = () => {
    setEditedCategory(null);
    setName("");
    setParentCategory("");
    setProperties("");
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
        <div className="">
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Enter new category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              onChange={(e) => setParentCategory(e?.target?.value)}
              value={parentCategory}
            >
              <option value="">Select parent category</option>
              {categories &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          {" "}
          {editedCategory ? (
            <label className="block"> Edit Properties</label>
          ) : (
            <label className="block">Properties</label>
          )}
          <div>
            <button className="btn-form" type="button" onClick={handleProperty}>
              Add new property
            </button>
          </div>
          {properties &&
            properties.map((property, index) => (
              <div key={index}>
                <div className="flex gap-1 mb-2">
                  <input
                    className="mb-0"
                    type="text"
                    placeholder="Enter property name (example: color)"
                    value={property.name}
                    onChange={(e) =>
                      handlePropertyNameChange(index, e.target.value)
                    }
                  />
                  <input
                    className="mb-0"
                    type="text"
                    placeholder="Property values, (comma seperated)"
                    value={property.values}
                    onChange={(e) =>
                      handlePropertyValuesChange(index, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleCloseProperty(index)}
                    type="button"
                    className="btn-cancel text-sm mb-0"
                  >
                    close
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex gap-1 mt-5">
          <button type="submit" className=" btn-save">
            Save
          </button>
          {editedCategory && (
            <button
              onClick={cancleEditedCategory}
              type="button"
              className="btn-cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {!editedCategory && (
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
                <tr key={category._id}>
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
                      onClick={() => handleDeleteCategory(category)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
