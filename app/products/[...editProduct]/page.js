"use client";

import Layout from "@/app/components/Layout";
import { usePathname, useRouter } from "next/navigation";

async function EditProduct() {
  const router = useRouter();
  const pathname = usePathname();

  // console.log("router", router);
  console.log("pathname", pathname);
  const id = pathname.split("/").slice(-1);
  console.log("id", id);

  return <Layout>Edit Product</Layout>;
}

export default EditProduct;
