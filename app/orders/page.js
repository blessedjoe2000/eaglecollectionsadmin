"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
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
                  {order.address}
                  <br /> {order.zipCode}
                  <br />
                  {order.country}
                </td>
                {order.line_items.map((product, index) => (
                  <td key={index} className="flex gap-2">
                    <div>{product.price_data.product_data?.name}</div>
                    <div>x {product.quantity}</div>
                    <br />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Orders;
