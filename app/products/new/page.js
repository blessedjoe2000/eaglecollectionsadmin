"use client";

import ProductForm from "@/components/ProductForm/ProductForm";

function NewProducts() {
  return (
    <div className="mx-5 mt-5 mb-10">
      <h1 className=" mb-2 ">New Product</h1>
      <ProductForm />
    </div>
  );
}

export default NewProducts;
