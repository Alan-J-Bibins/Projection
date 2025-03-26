import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "./session.server";
import { PrismaClient } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

// Define user type
export type User = {
    id: string;
    email: string;
    name: string;
};

// Create authenticator instance
export const authenticator = new Authenticator<User>(sessionStorage);

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
        const userEmail = await prisma.user.findUnique({
            where: { email: email }
        })
        console.log(userEmail);
        if (userEmail) {
            console.log("User Exists!!");
        } else {
            const user = await prisma.user.create({
                data: {
                    id: createId(),
                    name: profile.displayName,
                    email: email
                }
            });
            console.log("new User Added", user);
        }
        await prisma.$disconnect();
        return {
            id: profile.id,
            email: email,
            name: profile.displayName
        };
    }
);

// Add the strategy to the authenticator
authenticator.use(googleStrategy);

