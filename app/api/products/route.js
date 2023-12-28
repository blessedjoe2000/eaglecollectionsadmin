import { mongooseConnect } from "@/lib/connectDb";
import Product from "@/model/Product";
import { isAdminRequest } from "../auth/[...nextauth]/route";

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

export async function GET(req) {
  await mongooseConnect();
  await isAdminRequest();

  try {
    const allProducts = await Product.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
