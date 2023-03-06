import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      async profile(profile: DiscordProfile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        try {
          const user = (
            await axios.post("http://localhost:8000/users", {
              id: profile.id,
              name: profile.username,
              username: profile.username + "#" + profile.discriminator,
              email: profile.email,
              image: profile.image_url,
            })
          ).data;

          return user;
        } catch (error) {
          console.log(error);
          return {};
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userInfo = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          image: user.image,
        };
        token.user = userInfo;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    error: "/",
    signIn: "/",
  },
};
export default NextAuth(authOptions);
