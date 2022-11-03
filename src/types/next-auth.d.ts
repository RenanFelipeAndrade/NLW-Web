import NextAuth from "next-auth";
import { DiscordUser } from "./DiscordUser";

declare module "next-auth" {
  interface Session {
    user: DiscordUser;
  }
}
