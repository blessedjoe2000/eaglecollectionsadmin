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
              className="text-sm"
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
                    className="btn-delete text-sm mb-0 flex gap-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Remove
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
        <table className="auto">
          <thead>
            <tr>
              <th>Categories</th>
              <th>Parent Category</th>
              <th></th>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="btn-delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
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
