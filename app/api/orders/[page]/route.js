import { mongooseConnect } from "@/lib/connectDb";
import Order from "@/model/Order";

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

export async function GET(req, ctx) {
  await mongooseConnect();

  let { page } = ctx.params;
  page = parseInt(page);
  const itemLimit = 10;

  const skipPage = (page - 1) * itemLimit;

  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(itemLimit)
    .skip(skipPage);

  try {
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
