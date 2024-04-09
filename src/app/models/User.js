import mongoose, { Schema } from "mongoose";

/* another way to validate */

// function passValidator(pass) {
//   return pass.length > 7;
// }

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate:
        // passValidator,
        (pass) => {
          if (!pass?.length || pass.length < 8) {
            new Error({
              message: "Password must be at least 8 characters long",
            });
            return false;
          }
        },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
