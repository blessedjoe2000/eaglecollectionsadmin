"use client";

import Layout from "@/app/components/Layout";
import ProductForm from "@/app/components/productForm";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const pathname = usePathname();
  const id = pathname?.split("/").slice(-1)[0];

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products/" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h2 className="text-purple-700 mb-2 text-xl ">Edit Product</h2>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
