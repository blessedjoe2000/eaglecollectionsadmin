import { mongooseConnect } from "@/app/lib/connectDb";
import Product from "@/app/model/Product";

export async function POST(req) {
  try {
    //connected to database
    await mongooseConnect();

    const { title, description, price } = await req.json();

    const productData = await Product.create({
      title,
      description,
      price,
    });

    return new Response(JSON.stringify(productData), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await mongooseConnect();

    const allProducts = await Product.find();

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
