import { model, Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

export const MenuItem = model?.MenuItem || model("MenuItem", MenuItemSchema);
