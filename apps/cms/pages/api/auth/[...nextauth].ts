import NextAuth from "next-auth";
import ms from "ms";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  console.log("Refreshing");

  try {
    const url = "http://localhost:3000/token";

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        // client_id: process.env.GOOGLE_CLIENT_ID,
        // client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log("ERROR", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    {
      id: "imerza",
      name: "Imerza",
      type: "oauth",
      wellKnown: "http://localhost:3000/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      checks: ["pkce", "state"],
      clientId: "cms",
      clientSecret: "TEST",
      profile: (profile) => {
        return {
          name: profile.name,
          id: profile.sub,
        };
      },
    },
  ],
  callbacks: {
    jwt({ token, user, account }) {
      if (account && user) {
        console.log(account.refresh_token);
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  // debug: true,
  pages: {
    signIn: "/login",
  },
});
