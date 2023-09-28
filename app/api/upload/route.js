// import { mongooseConnect } from "@/app/lib/connectDb";
// import multiparty from "multiparty";

// export async function handle(req, res) {
//   //connected to database
//   //   await mongooseConnect();

//   const form = new multiparty.Form();

//   const { fields, files } = await new Promise((response, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       response({ fields, files });
//       console.log("req", req);
//       console.log("err", err);
//       console.log("fields", fields);
//     });
//     console.log("files", files.file.length);
//     return res.json("ok");
//   });

//   // try {
//   //   const { title, description, price } = await req.json();

//   //   const productData = await Product.create({
//   //     title,
//   //     description,
//   //     price,
//   //   });

//   //   return new Response(JSON.stringify(productData), { status: 201 });
//   // } catch (error) {
//   //   return new Response(JSON.stringify(error.message), { status: 500 });
//   // }
// }

// export const config = {
//   api: { bodyParser: false },
// };

import { Buffer } from "buffer";
import { decode } from "node-base64-image";

function makeId(length = 10) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.random() * charactersLength);
  }
  return result;
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    let nameFile = makeId(10);
    const fileData = await file.arrayBuffer();
    const buffer = Buffer.from(fileData);
    const base64Data = buffer.toString("base64");
    console.log("file", file);
    await decode(base64Data, { fname: "../images/" + nameFile, ext: "png" });
    return new Response(JSON.stringify({ message: "successful" }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Server side error" }), {
      status: 500,
    });
  }
}
