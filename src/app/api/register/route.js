import { NextResponse } from "next/server";
import User from "../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();

  await mongoose.connect(process.env.MONGO_URL);

  const pass = body.password;

  if (!pass?.length || pass.length < 8) {
    return NextResponse.json(
      { status: 400, message: "Password must be at least 8 characters long" },
      { status: 400 }
    );
    // new Error({
    //   message: "Password must be at least 8 characters long",
    // });

    // return false;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pass, salt);
  body.password = hashedPassword;

  try {
    const createdUser = await User.create(body);
    return Response.json(createdUser);
  } catch (error) {
    // console.log(error.message);
    return NextResponse.json(
      { status: 400, message: error.message },
      { status: 400 }
    );
  }
}
