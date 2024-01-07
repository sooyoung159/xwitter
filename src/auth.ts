import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(`${process.env.AUTH_URL}/api/login`);
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });
        console.log(authResponse.ok);

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        console.log("user", user);

        return { id: user.id, image: user.image, name: user.nickname, ...user };
      },
    }),
  ],
});
