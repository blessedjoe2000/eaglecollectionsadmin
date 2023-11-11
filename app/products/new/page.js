"use client";

import Layout from "@/app/components/Layout";
import ProductForm from "@/app/components/ProductForm";

function NewProducts() {
  return (
    <Layout>
      <h1 className="text-purple-700 mb-2 text-xl ">New Product</h1>
      <ProductForm />
    </Layout>
  );
}

export default NewProducts;
