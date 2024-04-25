import { Category } from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name } = await req.json();

  const newCategory = await Category.create({ name });

  return NextResponse.json(newCategory);
}
