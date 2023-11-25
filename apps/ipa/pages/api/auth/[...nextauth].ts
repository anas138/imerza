import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import config from "../../../public/config.json";
import ms from "ms";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
// async function refreshAccessToken(token: any) {
//   console.log("Refreshing");

//   try {
//     const url = "http://localhost:3000/token";

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({
//         // client_id: process.env.GOOGLE_CLIENT_ID,
//         // client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       }),
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log("ERROR", error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      id:"credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;
        const res = await fetch(`${config.baseUrl2}auth/login`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });
        const user = await res.json();
        console.log(user, "nex");
        if (res.ok && !user?.error) {
          return user;
        } else {
          return null;
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id:"redirect",
      name: "redirect",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" }
      },
      async authorize(redirect, req) {
        const payload = redirect as any;
        const res = await fetch(`${config.baseUrl2}auth/redirect`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
           ...payload
          }),
        });
        const user = await res.json();
        console.log(user, "nex");
        if (res.ok && !user?.error) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

