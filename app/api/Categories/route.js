import { mongooseConnect } from "@/lib/connectDb";
import Category from "@/model/Category";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(req) {
  //connected to database
  await mongooseConnect();
  await isAdminRequest();

  try {
    const { name, parentCategory, properties } = await req.json();

    let category;

    category = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });

    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req) {
  await mongooseConnect();
  await isAdminRequest();

  try {
    const categories = await Category.find().populate("parent");

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(req) {
  //connected to database
  await mongooseConnect();
  await isAdminRequest();

  try {
    const { name, parentCategory, properties, _id } = await req.json();

    const category = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );

    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
