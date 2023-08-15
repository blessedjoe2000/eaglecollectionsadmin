import { mongooseConnect } from "@/app/lib/connectDb";
import Product from "@/app/model/Product";

export async function GET(req, ctx) {
  await mongooseConnect();

  try {
    const { id } = ctx.params;

    const product = await Product.findById(id);

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
