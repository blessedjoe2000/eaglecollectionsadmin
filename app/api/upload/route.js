import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { extname, join, resolve } from "path";
import * as dateFn from "date-fns";
import { NextResponse } from "next/server";
import mime from "mime-types";
import fs, { promises as fsPromises, mkdirSync } from "fs";
import { stat, mkdir, writeFile } from "fs/promises";
import { mongooseConnect } from "@/lib/connectDb";
import { isAdminRequest } from "../auth/[...nextauth]/route";

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function POST(request) {
  await mongooseConnect();
  await isAdminRequest();

  const formData = await request.formData();

  const file = formData.get("file");

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // const domainUrl = process.env.NEXTAUTH_URL;

  const pathDist = join(process.cwd(), `/public/images`);

  const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(pathDist, relativeUploadDir);

  console.log("upload directory", uploadDir);

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === "ENOENT") {
      try {
        await new Promise((resolve, reject) => {
          fsPromises.mkdir(uploadDir, { recursive: true }, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      } catch (mkdirError) {
        console.error(
          "Error creating directory when uploading a file:",
          mkdirError
        );
        return NextResponse.json(
          { error: "Failed to create directory for file upload." },
          { status: 500 }
        );
      }
    } else {
      console.error("Error checking directory when uploading a file:", e);
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

    console.log("filename", filename);

    await writeFile(`${uploadDir}/${filename}`, buffer);

    const finalFilePath = `${uploadDir}/${filename}`;

    console.log("finalFilePath", finalFilePath);

    const client = new S3Client({
      region: "us-west-1",
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });

    const bucketName = "eaglecollections";
    const links = [];

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        ACL: "public-read",
        Body: fs.readFileSync(finalFilePath),
        ContentType: mime.lookup(finalFilePath),
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${filename}`;
    links.push(link);

    return NextResponse.json({ links }, { status: 200 });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
