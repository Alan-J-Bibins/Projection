import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "./session.server";
import { PrismaClient } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

// Define user type
export type User = {
    id?: string;
    email: string;
    name: string;
};

// Create authenticator instance
export const authenticator = new Authenticator<User | undefined>(sessionStorage);

// Configure Google Strategy
const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.SITE_URL}/auth/google/callback`
    },
    async ({ profile }) => {
        const email = profile.emails[0].value;
        const prisma = new PrismaClient();

        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            })
            console.log(user);

            if (!user) {
                const cuid = createId();
                const user = await prisma.user.create({
                    data: {
                        id: cuid,
                        name: profile.displayName,
                        email: email
                    }
                });
                console.log("new User Added", user);
            } else {
                console.log("User Exists!!", user);
            }
            return {
                id: user?.id,
                email: email,
                name: profile.displayName,
            };
        } catch (error) {
            console.log('Error in auth', error);
        } finally {
            await prisma.$disconnect();
        }
    }
);

// Add the strategy to the authenticator
authenticator.use(googleStrategy);

