import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");
    // console.log(file);

    const s3Client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = nanoid() + "." + ext;

    /* saving file */
    const chunks = [];

    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const bucket = "pizza-time-app";

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    const link = "http://" + bucket + ".s3.amazonaws.com/" + newFileName;
    return NextResponse.json(link);
  }
  // console.log(data);
  return NextResponse.json({ ok: true });
}
