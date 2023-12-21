"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/").slice(-1)[0];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/api/products/${id}`);
    router.push("/products");
  };

  return (
    <Layout>
      <p>Are you sure you want to delete?</p>

      {product && (
        <div>
          <div>Title: {product.title}</div>
          <div>Description: {product.description}</div>
          <div>price: ${product.price}</div>
        </div>
      )}

      <div className="flex gap-1">
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
        <Link href="/products" className="btn-cancel">
          Cancel
        </Link>
      </div>
    </Layout>
  );
}
