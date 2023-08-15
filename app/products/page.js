"use client";

import Link from "next/link";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

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

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">Product Title</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allProducts &&
            allProducts.map((product) => {
              return (
                <tr key={product._id}>
                  <td scope="row">{product.title}</td>
                  <td className="">
                    <Link
                      className="bg-purple-500 text-white px-3 py-1 mx-2 rounded-md no-underline"
                      href={"/products/edit/" + product._id}
                    >
                      Edit
                    </Link>
                    <Link
                      className="bg-purple-500 text-white px-3 py-1 rounded-md no-underline"
                      href={"/products/:id" + product._id}
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
