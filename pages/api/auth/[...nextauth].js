import NextAuth from "next-auth";
import Providers from "next-auth/providers";
const providers = [
  Providers.Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
];

const callbacks = {};
const session = {
  jwt: true,
  maxAge: 30 * 24 * 60 * 60, // 30 days
};
const options = { providers, callbacks, session };

export default (req, res) => NextAuth(req, res, options);
