import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import { createUser } from "./User/userController";

const authOptions: NextAuthOptions = {
  providers: [
   
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(data) {
      console.log(data);
      if (data.user.name && data.user.email) {
        await createUser(data.user.name, data.user.email);
      }
      return true;
    },
  },
};

export default authOptions;