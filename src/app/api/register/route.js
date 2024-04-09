import { NextResponse } from "next/server";
import User from "../../models/User";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();

  await mongoose.connect(process.env.MONGO_URL);

  try {
    const createdUser = await User.create(body);
    return Response.json(createdUser);
  } catch (error) {
    console.log(error.message);
    // return Response.json(error.message, {
    //   status: 400,
    // });
    return NextResponse.json(
      { status: 400, message: error.message },
      { status: 400 }
    );
  }
}
