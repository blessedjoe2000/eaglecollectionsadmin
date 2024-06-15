"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import toast from "react-hot-toast";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function Orders() {
  const [orders, setOrders] = useState([]);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const updateOrderStatus = ["Pending", "Processing", "Shipped", "Delivered"];

  let pageId = pathname.split("/").pop();

  pageId = typeof pageId === "string" ? Number(pageId) : 1;

  const getOrders = async () => {
    const response = await axios.get(`/api/orders/${pageId}`);

    setOrders(response.data);
  };
  const itemsPerPage = 10;
  const pagesRemaining = Math.ceil(orders.length % itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        router.push("/login");
      } else {
        await getOrders();
        Modal.setAppElement("body");
      }
    };

    fetchData();
  }, [session, status, router, pageId, orderStatus, deleteOrderId]);

  const dateToUSFormat = (dateString) => {
    const originalDate = new Date(dateString);

    return originalDate.toLocaleString("en-US");
  };

  let subtitle;

  const openModal = () => {
    setModalIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f72585";
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderStatus) {
      return toast.error("Status must be updated", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }
    await axios.patch(`/api/orders/edit/${selectedOrderId}`, { orderStatus });
    setOrderStatus("");
    toast.success("status updated", {
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
    closeModal();
  };

  const handleEdit = (orderId) => {
    setSelectedOrderId(orderId);
    openModal();
  };

  const openDeleteModal = (orderId) => {
    setDeleteModalIsOpen(true);
    setDeleteOrderId(orderId);
  };

  function afterOpenDeleteModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f72585";
  }

  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }

  const handleDelete = async () => {
    await axios.delete(`/api/orders/delete/${deleteOrderId}`);
    toast.success("order deleted", {
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
    closeDeleteModal();
  };

  if (!orders.length) {
    return (
      <div className="my-10">
        <h2 className="text-center ">You do not have any order.</h2>
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
    <div className="mx-5 mb-10 mt-5 ">
      <h1 className="text-center text-light-green py-2">Orders Received</h1>
      <div className="">
        <div className="sm:flex justify-between items-center bg-dark-green text-white px-2 gap-2">
          <div>Date & Time</div>
          <div>Recipients info</div>
          <div>Shipping Address</div>
          <div>Products ordered</div>
          <div className="">Payment Confirmation</div>
          <div className="">Status</div>
          <div className="">Action</div>
        </div>

        <div className="sm:text-sm">
          {orders.length > 0 &&
            orders?.map((order, index) => (
              <div
                key={index}
                className="sm:border-b-2 sm:border-light-green py-2 sm:flex justify-between items-center gap-2 px-2 border-b-2 border-light-green "
              >
                <div className="border-b-2 border-dark-green/30 sm:border-none ">
                  <p>{dateToUSFormat(order.createdAt).split(",")[0]}</p>
                  <p>{dateToUSFormat(order.createdAt).split(",")[1]}</p>
                </div>
                <div className="border-b-2 border-dark-green/30 sm:border-none ">
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

                <div className="border-b-2 border-dark-green/30 sm:border-none ">
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
                <div className="border-b-2 border-dark-green/30 sm:border-none ">
                  {order.line_items.map((product, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="my-1">
                        <Image
                          src={product.price_data.product_data.images?.[0]}
                          alt={`${product.price_data.product_data?.title}`}
                          width={50}
                          height={20}
                          priority
                          className="rounded-sm"
                        />
                      </div>
                      <div>
                        <p>
                          {product.price_data.product_data?.name
                            ?.slice(0, 1)
                            .toUpperCase() +
                            product.price_data.product_data?.name?.slice(1)}
                        </p>
                        <p>
                          {product.price_data.product_data?.colors
                            ? product.price_data.product_data?.colors
                                ?.slice(0, 1)
                                .toUpperCase() +
                              product.price_data.product_data?.colors?.slice(1)
                            : ""}
                        </p>
                        <p>
                          {product.price_data.product_data?.sizes
                            ? product.price_data.product_data?.sizes
                                ?.slice(0, 1)
                                .toUpperCase() +
                              product.price_data.product_data?.sizes?.slice(1)
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-b-2 border-dark-green/30 sm:border-none ">
                  {order?.paid ? (
                    <p
                      className="text-alert-green
                    "
                    >
                      Yes
                    </p>
                  ) : (
                    <p className="text-sharp-pink">No</p>
                  )}
                </div>
                <div className="border-b-2 border-dark-green/30 sm:border-none ">
                  {order?.status && <p>{order.status}</p>}
                </div>

                <div className="sm:flex gap-1 flex-col justify-center items-center text-sm mt-1 ">
                  <button
                    onClick={() => handleEdit(order?._id)}
                    className="btn-edit mr-1 "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(order?._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
                <div className="hidden">
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <h2
                        className=""
                        ref={(_subtitle) => (subtitle = _subtitle)}
                      >
                        Update order status
                      </h2>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <select
                            className="text-sm"
                            value={orderStatus || ""}
                            onChange={(e) => setOrderStatus(e.target.value)}
                          >
                            {updateOrderStatus &&
                              updateOrderStatus?.map((statusValue, index) => (
                                <option value={statusValue} key={index}>
                                  {statusValue}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="flex gap-1 text-sm items-center justify-center">
                          <button className="btn-save" type="submit">
                            Save
                          </button>
                          <button className="btn-cancel" onClick={closeModal}>
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </Modal>
                  <Modal
                    isOpen={deleteModalIsOpen}
                    onAfterOpen={afterOpenDeleteModal}
                    onRequestClose={closeDeleteModal}
                    style={customStyles}
                  >
                    <div className="flex flex-col justify-center items-center font-bold">
                      <h2
                        className="text-xl "
                        ref={(_subtitle) => (subtitle = _subtitle)}
                      >
                        Are you sure?
                      </h2>
                      <p className="font-bold py-1">
                        Do you want to proceed to delete?
                      </p>

                      <div className="flex gap-1 text-sm">
                        <button
                          className="rounded-md bg-sharp-pink px-2 text-white"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                        <button
                          className="btn-cancel "
                          onClick={closeDeleteModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Modal>
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
