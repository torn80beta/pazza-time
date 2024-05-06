import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();

  const newCategory = await Category.create({ name });

  return NextResponse.json(newCategory);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const categories = await Category.find();

  return NextResponse.json(categories);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();

  await Category.updateOne({ _id }, { name });
  return NextResponse.json({ _id, name });
}
