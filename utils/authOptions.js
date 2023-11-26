import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/models/User';
import bcrypt from 'bcrypt';
import dbConnect from "@/utils/dbConnect";
import GoogleProvider from "next-auth/providers/google";



export const AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
                async authorize(credentials, req) {
                    await dbConnect();
                    const {email, password} = credentials;
                    const user = await User.findOne({email});

                    if (!user) {
                        throw new Error('Kullanıcı bulunamadı.');
                    }

                    const isValid = await bcrypt.compare(password, user.password);

                    if (!isValid) {
                        throw new Error('Geçersiz bilgi.');
                    }

                    return user;

                },
            }
        )
    ],
    callbacks: {
        async signIn({user}) {
            const {email, name, image} = user;
            await dbConnect();
            const userDB = await User.findOne({email});
            if (!userDB) {
                await User.create({
                    email,
                    name,
                    image,
                });
            }
            return true;
        },
        jwt: async ({ token}) => {
            const userByEmail = await User.findOne({email: token.email});
            userByEmail.password = undefined;
            userByEmail.resetCode = undefined;
            token.user = userByEmail;
            return token;
        },
        session: async ({session, token}) => {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
}


