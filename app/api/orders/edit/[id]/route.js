import { isAdminRequest } from "@/app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@/lib/connectDb";
import Order from "@/model/Order";

export async function PATCH(req, ctx) {
  await mongooseConnect();
  await isAdminRequest();

  const { id } = ctx.params;

  const { orderStatus } = await req.json();

  try {
    const order = await Order.findById(id);

    if (!order) {
      return new Response(JSON.stringify({ message: "product not found" }), {
        status: 404,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: orderStatus },
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
