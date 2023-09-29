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

// import { Buffer } from "buffer";
// import { decode } from "node-base64-image";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// function makeId(length = 10) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   for (let i = 0; i < charactersLength; i++) {
//     result += characters.charAt(Math.random() * charactersLength);
//   }
//   return result;
// }

import { extname, join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { NextRequest, NextResponse } from "next/server";

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function POST(request, res) {
  const formData = await request.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const pathDist = join(process.cwd(), "/public/images");
  const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(pathDist, relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.name);
    const originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
    console.log("filename : " + filename);
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const finalFilePath =
      "http://localhost:3000/images/" + `${relativeUploadDir}/${filename}`;

    console.log("finalFilePath", finalFilePath);
    return NextResponse.json(
      { done: "ok", filename: filename, httpfilepath: finalFilePath },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
