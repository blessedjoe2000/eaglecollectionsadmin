"use client";

import ProductForm from "@/components/ProductForm/ProductForm";

function NewProducts() {
  return (
    <div className="mx-5 mt-5 mb-10">
      <h2 className=" text-light-green mb-2 ">New Product</h2>
      <ProductForm />
    </div>
  );
}

export default NewProducts;
