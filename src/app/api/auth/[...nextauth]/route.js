import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });
        const isPasswordOk =
          user && bcrypt.compareSync(password, user.password);

        if (isPasswordOk) {
          return user;
        }
        // console.log(credentials);

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
