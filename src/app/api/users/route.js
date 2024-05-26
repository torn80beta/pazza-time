import mongoose from "mongoose";
import User from "../../models/User";
import { NextResponse } from "next/server";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const users = await User.find();
  return NextResponse.json(users);
}
