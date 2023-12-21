"use client";

import Layout from "@/components/Layout/Layout";
import ProductForm from "@/components/ProductForm/ProductForm";
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
      <h1 className=" mb-2 ">Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
