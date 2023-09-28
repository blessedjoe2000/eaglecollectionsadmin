import { mongooseConnect } from "@/app/lib/connectDb";
import Product from "@/app/model/Product";

export async function POST(req) {
  //connected to database
  await mongooseConnect();

  try {
    const { title, description, price, images } = await req.json();

    const productData = await Product.create({
      title,
      description,
      price,
      images,
    });

    return new Response(JSON.stringify(productData), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req) {
  await mongooseConnect();

  try {
    const allProducts = await Product.find();

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
