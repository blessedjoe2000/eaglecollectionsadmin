import { mongooseConnect } from "@/app/lib/connectDb";
import Category from "@/app/model/Category";

export async function DELETE(req, ctx) {
  const { id } = ctx.params;
  await mongooseConnect();

  try {
    await Category.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: `category id ${id} deleted successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}