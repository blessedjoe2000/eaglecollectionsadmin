import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { extname } from "path";
import { NextResponse } from "next/server";
import mime from "mime-types";
import { isAdminRequest } from "../auth/[...nextauth]/route";

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function POST(request) {
  await isAdminRequest();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  try {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.name);
    const originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;

    const binaryFile = await file.arrayBuffer();
    const fileBuffer = Buffer.from(binaryFile);

    const awsAccessKey = process.env.AWS_S3_ACCESS_KEY;
    const awsSecretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

    const client = new S3Client({
      region: "us-west-1",
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey,
      },
    });

    const bucketName = process.env.AWS_S3_BUCKET;

    const links = [];

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        ACL: "public-read",
        Body: fileBuffer,
        ContentType: mime.lookup(fileBuffer),
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${filename}`;
    links.push(link);

    return NextResponse.json({ links }, { status: 200 });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
