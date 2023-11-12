import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
    // add user to database
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // for google auth
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;