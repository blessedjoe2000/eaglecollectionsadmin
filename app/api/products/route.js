import { mongooseConnect } from "@/lib/connectDb";
import Product from "@/model/Product";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function POST(req) {
  //connected to database
  await mongooseConnect();
  await isAdminRequest();

  try {
    const {
      title,
      description,
      price,
      images,
      category,
      newPrice,
      colors,
      sizes,
    } = await req.json();

    const productData = await Product.create({
      title,
      description,
      price,
      images,
      category,
      newPrice,
      colors,
      sizes,
    });

    return new Response(JSON.stringify(productData), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
