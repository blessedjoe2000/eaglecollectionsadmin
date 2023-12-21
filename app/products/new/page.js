"use client";

import Layout from "@/components/Layout/Layout";
import ProductForm from "@/components/ProductForm/ProductForm";

function NewProducts() {
  return (
    <Layout>
      <h1 className=" mb-2 ">New Product</h1>
      <ProductForm />
    </Layout>
  );
}

export default NewProducts;
