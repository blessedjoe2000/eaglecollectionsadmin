import { mongooseConnect } from "@/lib/connectDb";
import Order from "@/model/Order";
import { isAdminRequest } from "../../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function POST(req) {
  //connected to database
  await mongooseConnect();
  await isAdminRequest();

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req, ctx) {
  await mongooseConnect();
  await isAdminRequest();

  let { page } = ctx.params;
  page = parseInt(page);

  try {
    const itemLimit = 10;

    const skipPage = (page - 1) * itemLimit;
    const orders = await Order.find()
      .sort({ updatedAt: -1 })
      .limit(itemLimit)
      .skip(skipPage);

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
