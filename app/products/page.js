"use client";

import Link from "next/link";
import Layout from "../components/Layout";

export default function Products() {
  return (
    <Layout>
      <Link
        href="/products/new"
        className="bg-purple-500 p-3 rounded-lg text-white"
      >
        Add new products
      </Link>
    </Layout>
  );
}
