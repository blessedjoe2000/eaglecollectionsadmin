"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/").slice(-1)[0];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/api/products/${id}`);
    toast.success("product deleted", {
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
    router.push("/products/page/1");
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-5 mt-5 mb-10">
      <p className="font-bold text-light-green text-xl">
        Are you sure you want to delete?
      </p>

      <div className="flex items-center gap-3">
        <div>
          <Image
            src={product?.images?.[0]}
            alt={product?.title}
            width={100}
            height={50}
            priority
            className="rounded-sm"
          />
        </div>
        <div className="text-lg">
          {product && (
            <div>
              <div>
                Title:{" "}
                {product?.title.slice(0, 1).toUpperCase() +
                  product?.title.slice(1)}
              </div>
              <div>
                Description:{" "}
                {product?.description.slice(0, 1).toUpperCase() +
                  product?.description.slice(1)}
              </div>

              <div>{product?.colors && <p>Colors: {product?.colors}</p>} </div>
              <div>{product?.sizes && <p>Sizes: {product?.sizes}</p>}</div>
              <div className="flex">
                Price: $
                {product?.newPrice ? (
                  <p>{product?.newPrice}</p>
                ) : (
                  <p>{product?.price}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1 justify-center text-white">
        <button
          onClick={handleDelete}
          className=" bg-sharp-pink hover:text-light-green text-md px-2 py-1 rounded-md"
        >
          Delete
        </button>
        <Link href="/products/page/1" className="btn-cancel">
          Cancel
        </Link>
      </div>
    </div>
  );
}
