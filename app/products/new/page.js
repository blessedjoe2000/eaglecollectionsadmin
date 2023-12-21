"use client";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

function NewProducts() {
  return (
    <Layout>
      <h1 className="text-purple-700 mb-2 text-xl ">New Product</h1>
      <ProductForm />
    </Layout>
  );
}

export default NewProducts;
