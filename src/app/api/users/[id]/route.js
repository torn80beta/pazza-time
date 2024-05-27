import mongoose from "mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  mongoose.connect(process.env.MONGO_URL);
  const user = await User.findById(id);

  return NextResponse.json(user);
}

/* PUT - Update user info */
export async function PUT(request, { params }) {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = params;
  const data = await request.json();
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(updatedUser);
}
