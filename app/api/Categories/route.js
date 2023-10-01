import { mongooseConnect } from "@/app/lib/connectDb";
import Category from "@/app/model/Categories";

export async function POST(req) {
  //connected to database
  await mongooseConnect();

  try {
    const { name } = await req.json();

    const categoryName = await Category.create({
      name,
    });

    return new Response(JSON.stringify(categoryName), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req) {
  await mongooseConnect();

  try {
    const categoryNames = await Category.find();

    return new Response(JSON.stringify(categoryNames), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
