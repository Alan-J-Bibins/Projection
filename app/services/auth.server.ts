import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { sessionStorage } from './session.server';
import { PrismaClient, User } from '@prisma/client';

// Create authenticator instance
export const authenticator = new Authenticator<User | undefined | null>(
    sessionStorage
);

// Configure Google Strategy
const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.SITE_URL}/auth/google/callback`,
    },
    async ({ profile }) => {
        const email = profile.emails[0].value;
        const prisma = new PrismaClient();

        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });
            console.log('Ooh?', user);
            console.log('OHH?', profile);

            if (!user) {
                const user = await prisma.user.create({
                    data: {
                        name: profile.displayName,
                        pic: profile.photos[0].value,
                        email: email,
                    },
                });
                console.log('new User Added', user);
                return user;
            } else {
                console.log('User Exists!!', user);
                return user;
            }
        } catch (error) {
            console.log('Error in auth', error);
        } finally {
            await prisma.$disconnect();
        }
    }
);

// Add the strategy to the authenticator
authenticator.use(googleStrategy);
