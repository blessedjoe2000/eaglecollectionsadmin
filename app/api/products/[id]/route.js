import { mongooseConnect } from "@/app/lib/connectDb";
import Product from "@/app/model/Product";
import { isAdminRequest } from "../../auth/[...nextauth]/route";

export async function GET(req, ctx) {
  await mongooseConnect();
  await isAdminRequest();

  try {
    const { id } = ctx.params;

    const product = await Product.findById(id);

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(req, ctx) {
  await mongooseConnect();
  await isAdminRequest();

  const { id } = ctx.params;
  try {
    const productUpdate = await req.json();

    const product = await Product.findById(id);

    if (!product) {
      return new Response(JSON.stringify({ message: "product not found" }), {
        status: 404,
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: { ...productUpdate },
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await mongooseConnect();
  await isAdminRequest();

  const { id } = ctx.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return new Response(JSON.stringify({ message: "product not found" }), {
        status: 404,
      });
    }

    await Product.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: `product id ${id} deleted successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
