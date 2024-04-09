import mongoose, { Schema } from "mongoose";

function passValidator(pass) {
  return pass.length > 7;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: passValidator,
      // (pass) => {
      //   console.log(pass);
      //   if (!pass?.length || pass.length < 8) {
      //     return new Error({
      //       message: "Password must be at least 8 characters long",
      //     });
      //   }
      // },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
