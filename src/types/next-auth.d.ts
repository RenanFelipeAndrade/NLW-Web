import { DiscordUser } from "./DiscordUser";

declare module "next-auth" {
  interface Session {
    user: DiscordUser;
  }
  interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    image: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
