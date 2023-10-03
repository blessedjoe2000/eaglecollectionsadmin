"use client";

import Link from "next/link";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    const response = await axios.get("/api/products");
    setAllProducts(response.data);
    return response.data;
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <Link
        href="/products/new"
        className="bg-purple-500 p-2 rounded-lg text-white"
      >
        Add new product
      </Link>

      <table className="">
        <thead>
          <tr>
            <td>Product Title</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {allProducts &&
            allProducts.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td className="">
                    <Link
                      className="btn-edit"
                      href={"/products/edit/" + product._id}
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/products/delete/${product._id}`}
                      className="btn-delete"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
