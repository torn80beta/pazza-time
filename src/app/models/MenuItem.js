import mongoose, { Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    image: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

const MenuItem =
  mongoose.models?.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

export default MenuItem;
