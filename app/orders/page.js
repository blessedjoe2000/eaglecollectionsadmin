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

  console.log("orders", orders);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
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
                {order.line_items.map((product) => (
                  <td className="flex">
                    {product.price_data.product_data?.name}
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
