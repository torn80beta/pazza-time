import mongoose from "mongoose";
import { MenuItem } from "../../models/MenuItem";
import { NextResponse } from "next/server";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const createdMenuItem = await MenuItem.create(data);

  return NextResponse.json(createdMenuItem);
}
