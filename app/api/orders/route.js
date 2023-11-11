import { mongooseConnect } from "@/app/lib/connectDb";
import Order from "@/app/model/Order";

export async function POST(req) {
  //connected to database
  await mongooseConnect();

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req) {
  await mongooseConnect();

  const orders = await Order.find().sort({ createdAt: -1 });

  try {
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
