"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  let pageId = pathname.split("/").pop();

  pageId = typeof pageId === "string" ? Number(pageId) : 1;

  const getOrders = async () => {
    const response = await axios.get(`/api/orders/ ${pageId}`);

    setOrders(response.data);
  };
  const itemsPerPage = 10;
  const pagesRemaining = Math.ceil(orders.length % itemsPerPage);

  useEffect(() => {
    getOrders();
  }, [pageId]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const dateToUSFormat = (dateString) => {
    const originalDate = new Date(dateString);

    return originalDate.toLocaleString("en-US");
  };

  if (!orders.length) {
    return (
      <div className="my-10">
        <p className="text-center font-bold">You do not have any order.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center py-5">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-5 mb-10 mt-5">
      <h1 className="text-center text-light-green py-2">Orders Received</h1>
      <div className="">
        <div className="flex justify-between items-center bg-dark-green text-white px-2 gap-2">
          <div>Date & Time</div>
          <div>Recipients Info</div>
          <div>Delivery Address</div>
          <div>Products Ordered</div>
          <div className="basis-0">Payment Confirmation</div>
        </div>

        <div className="">
          {orders.length > 0 &&
            orders?.map((order, index) => (
              <div
                key={index}
                className="sm:border-b-2 sm:border-light-green py-2 sm:flex justify-between items-center gap-2 px-2 border-b-2 border-sharp-purple"
              >
                <div className="border-b-2 border-light-green sm:border-none ">
                  <p>{dateToUSFormat(order.createdAt).split(",")[0]}</p>
                  <p>{dateToUSFormat(order.createdAt).split(",")[1]}</p>
                </div>
                <div className="border-b-2 border-light-green sm:border-none ">
                  <p>
                    {" "}
                    {order.name.split(" ")?.[0].slice(0, 1).toUpperCase() +
                      order.name.split(" ")?.[0].slice(1) +
                      " " +
                      order.name.split(" ")?.[1].slice(0, 1).toUpperCase() +
                      order.name.split(" ")?.[1].slice(1)}
                  </p>
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                </div>

                <div className="border-b-2 border-light-green sm:border-none ">
                  <div className="flex gap-1">
                    <p>{order?.address?.line1}</p>
                    <p>{order?.address?.line2}</p>
                  </div>
                  <p>{order?.address?.city}</p>
                  <div className="flex gap-1">
                    <p>{order?.address?.state}</p>
                    <p>{order?.address?.postal_code}</p>
                    <p>{order?.address?.country}</p>
                  </div>
                </div>
                <div className="border-b-2 border-light-green sm:border-none ">
                  {order.line_items.map((product, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="my-1">
                        <Image
                          src={product.price_data.product_data.images?.[0]}
                          alt={`${product.price_data.product_data?.title}`}
                          width={25}
                          height={20}
                          priority
                          className="rounded-sm"
                        />
                      </div>
                      <div>
                        {product.price_data.product_data?.name
                          ?.slice(0, 1)
                          .toUpperCase() +
                          product.price_data.product_data?.name?.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center ">
                  {order.paid ? (
                    <p className="text-alert-green">Yes</p>
                  ) : (
                    <p className="text-sharp-pink">No</p>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-between mt-4">
          {pageId > 1 ? (
            <Link
              href={`/orders/page/${pageId - 1}`}
              className="bg-dark-green px-2 py-1 text-white rounded-md hover:text-light-green"
            >
              Previous
            </Link>
          ) : (
            <div className="disabled bg-gray-300 px-2 py-1 text-white rounded-md cursor-not-allowed">
              Previous
            </div>
          )}
          {pagesRemaining != 0 ? (
            <div className="disabled-link bg-gray-300 px-2 py-1 text-white rounded-md cursor-not-allowed">
              Next
            </div>
          ) : (
            <Link
              href={`/orders/page/${pageId + 1}`}
              className="bg-dark-green px-2 py-1 text-white rounded-md hover:text-light-green"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
