"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get("/api/orders");
    setOrders(response.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const dateToUSFormat = (dateString) => {
    const originalDate = new Date(dateString);

    return originalDate.toLocaleString("en-US");
  };

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="auto">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders?.map((order) => (
              <tr key={order._id} className="shadow-lg">
                <td>{dateToUSFormat(order.createdAt)}</td>
                <td>
                  {order.name} <br /> {order.email}
                  <br />
                  {order.phone}
                  <br />
                  <div className="">
                    <p>{order?.address?.line1}</p>
                    <p>{order?.address?.line2}</p>
                    <p>{order?.address?.city}</p>
                    <p>{order?.address?.state}</p>
                    <p>{order?.address?.postal_code}</p>
                    <p>{order?.address?.country}</p>
                  </div>
                </td>
                {order.line_items.map((product, index) => (
                  <td key={index} className="flex gap-2">
                    <div>{product.price_data.product_data?.name}</div>
                    <div>x {product.quantity}</div>
                  </td>
                ))}
                <td className="">
                  {order.paid ? (
                    <p className="text-green-500">Yes</p>
                  ) : (
                    <p className="text-red-500">No</p>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Orders;
