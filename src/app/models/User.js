import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt";

/* another way to validate */

// function passValidator(pass) {
//   return pass.length > 7;
// }

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      // required: true,
      // validate:
      //   // passValidator,
      //   (pass) => {
      //     if (!pass?.length || pass.length < 8) {
      //       new Error({
      //         message: "Password must be at least 8 characters long",
      //       });
      //       return false;
      //     }
      //   },
    },
    image: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

// UserSchema.post("validate", function (user) {
//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(user.password, salt);
//   user.password = hashedPassword;
// });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
