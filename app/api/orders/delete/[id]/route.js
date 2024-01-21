import { isAdminRequest } from "@/app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@/lib/connectDb";
import Order from "@/model/Order";

export async function DELETE(req, ctx) {
  await mongooseConnect();
  await isAdminRequest();

  const { id } = ctx.params;
  console.log("id", id);
  try {
    const order = await Order.findById(id);

    if (!order) {
      return new Response(JSON.stringify({ message: "order not found" }), {
        status: 404,
      });
    }

    await Order.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: `order with id ${id} deleted successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
