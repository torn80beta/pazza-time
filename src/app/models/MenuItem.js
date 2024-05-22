import mongoose, { Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: { type: String },
  price: { type: Number },
});

const MenuItemSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    image: { type: String },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extras: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

const MenuItem =
  mongoose.models?.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

export default MenuItem;
