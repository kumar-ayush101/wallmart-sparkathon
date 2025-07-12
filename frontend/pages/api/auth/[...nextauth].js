import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,  // 🔥 ensure secret is explicitly set
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // optionally attach token data to session
      session.user.id = token.sub; 
      return session;
    }
  }
})
