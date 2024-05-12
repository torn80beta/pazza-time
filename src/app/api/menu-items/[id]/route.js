import { NextResponse } from "next/server";
import mongoose from "mongoose";
import MenuItem from "@/app/models/MenuItem";

export async function GET(request, { params }) {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = params;
  const menuItem = await MenuItem.findById(id);

  return NextResponse.json(menuItem);
}
