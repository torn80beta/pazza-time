import mongoose from "mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  mongoose.connect(process.env.MONGO_URL);
  const user = await User.findById(id);

  return NextResponse.json(user);
}
