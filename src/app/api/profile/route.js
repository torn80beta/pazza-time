import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import User from "@/app/models/User";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const newName = data.name;
  // let user = await User.findOne({ email: email });

  // const user = await User.findOne({ email: email });
  // console.log({ email, data });
  // console.log(newName);

  if ("name" in data) {
    const user = await User.findOneAndUpdate(
      { email },
      { name: newName },
      { new: true }
    );
    // const user = await User.findOne({ email: email });
    // user.name = data.name;

    // user = await user.save();
    // console.log(user);
    // if (!user.name) {
    //   // console.log(user.name);
    //   // console.log("user: " + user.name);
    // }
  }

  return NextResponse.json({ ok: true });
}
