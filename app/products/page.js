"use client";

import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

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
        className="bg-main-purple px-2 py-1 rounded-md text-white "
      >
        Add new product
      </Link>

      <div className="my-5">
        <div className="flex justify-between items-center bg-main-pink px-2 text-white my-5">
          <div>Images</div>
          <div className="">Product Names</div>
          <div>Action</div>
        </div>
        <div>
          {allProducts &&
            allProducts.map((product) => {
              return (
                <div
                  key={product._id}
                  className="flex justify-between items-center py-1 border-b-2 border-light-pink"
                >
                  <div>
                    <Image
                      src={product.images?.[0]}
                      alt={product.title}
                      width={30}
                      height={20}
                      priority
                      className="rounded-sm"
                    />
                  </div>
                  <div className="">
                    {product.title.slice(0, 1).toUpperCase() +
                      product.title.slice(1)}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      className="btn-edit"
                      href={"/products/edit/" + product._id}
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
                    </Link>
                    <Link
                      href={`/products/delete/${product._id}`}
                      className="btn-delete hover:text-main-purple"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}
