"use client";

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
      toast.success("Product edited successfully", {
        style: {
          border: "1px solid #01B700",
          padding: "16px",
          color: "#01B700",
        },
        iconTheme: {
          primary: "#01B700",
          secondary: "#FFFAEE",
        },
      });
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
