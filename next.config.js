/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "**static-cdn.jtvnw.net",
        protocol: "https",
      },
    ],
  },
};
