import mongoose from "mongoose";
import MenuItem from "../../models/MenuItem";
import { NextResponse } from "next/server";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  /* Check for item existence  */
  // const isItemExist = await MenuItem.find({ name: data.name });
  // if (isItemExist.length > 0) {
  //   console.log("Item already exists");
  //   return NextResponse.json({ error: "Item already exists" });
  // }
  // console.log(data);
  /*  */
  const createdMenuItem = await MenuItem.create(data);

  return NextResponse.json(createdMenuItem);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const menuItems = await MenuItem.find();
  return NextResponse.json(menuItems);
}
