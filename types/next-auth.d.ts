import { DefaultSession } from "next-auth";
import { CustomUser } from ".";

  // Extend Session interface
  declare module "next-auth" {
    interface Session {
      user: CustomUser & DefaultSession["user"];
    }
  }
