import { mongooseConnect } from "@/app/lib/connectDb";
import Category from "@/app/model/Category";

export async function POST(req) {
  //connected to database
  await mongooseConnect();

  try {
    const { name, parentCategory } = await req.json();

    const category = await Category.create({
      name,
      parent: parentCategory,
    });

    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req) {
  await mongooseConnect();

  try {
    const categories = await Category.find().populate("parent");

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

// export async function PATCH(req, ctx) {
//   await mongooseConnect();

//   const { id } = ctx.params;
//   try {
//     const categoryData = await req.json();

//     const category = await Category.findById(id);

//     if (!category) {
//       return new Response(JSON.stringify({ message: "category not found" }), {
//         status: 404,
//       });
//     }

//     const updatedCategory = await Category.findByIdAndUpdate(
//       id,
//       {
//         $set: { ...categoryData },
//       },
//       { new: true }
//     );

//     return new Response(JSON.stringify(updatedCategory), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify(error.message), { status: 500 });
//   }
// }

export async function PATCH(req) {
  //connected to database
  await mongooseConnect();

  try {
    const { name, parentCategory, _id } = await req.json();

    const category = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory,
      }
    );

    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(req) {
  await mongooseConnect();

  try {
    const { _id } = await req.json();
    console.log("_id", _id);

    await Category.deleteOne(_id);

    return new Response(
      JSON.stringify({ message: `category id ${id} deleted successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
