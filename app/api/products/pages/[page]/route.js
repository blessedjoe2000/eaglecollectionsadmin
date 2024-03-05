import { isAdminRequest } from "@/app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@/lib/connectDb";
import Product from "@/model/Product";

export const dynamic = "force-dynamic";

export async function GET(req, ctx) {
  await mongooseConnect();
  await isAdminRequest();

  try {
    let { page } = ctx.params;
    page = parseInt(page);
    const itemLimit = 50;

    const skipPage = (page - 1) * itemLimit;

    const allProducts = await Product.find()
      .sort({ updatedAt: -1 })
      .limit(itemLimit)
      .skip(skipPage);

    return new Response(JSON.stringify(allProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
