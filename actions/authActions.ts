"use server"

import ContactFormEmail from "@/emails/contact-form-email";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/zod/schema";
import { IRegisterSchema } from "@/types";
import { generateToken, verifyToken } from "@/utils/token";
import bcrypt from "bcryptjs";
import { Resend } from 'resend'

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY

export const registerWithCredential = async (data: IRegisterSchema) => {
    await dbConnect();

    const validationResult = registerSchema.safeParse(data);
    if (!validationResult.success) return { error: `Validation error: ${validationResult.error.errors}`, };

    const user = await User.findOne({ email: validationResult.data.email })
    if (user) return { error: "User Already exist" };

    try {

        const hashedPassword = await bcrypt.hash(validationResult.data.password, 10);
        const token = generateToken({ user: { ...validationResult.data, password: hashedPassword } });

        const resend = new Resend( RESEND_API_KEY );
        let message = "hello wold"
        let name = validationResult.data.name
        let email = validationResult.data.email
        let url = `${BASE_URL}/verify_email?token=${token}`

        await resend.emails.send({
            from: 'onboardding@resend.dev',
            to: [email],
            subject: 'Contact form submission',
            text: `Name: ${name}\nEmail: ${data.email}\nMessage: ${message}`,
            react: ContactFormEmail({ email, url })
        })

        return { msg: "Verification mail has been sent" };
    } catch (err) {
        console.log(err)
        return { error: `something went wrong: ${err}`}
    }
};


// export const verifyEmail = async (token: string) => {
//     await dbConnect()

//     try {
//         const { user } = verifyToken(token)

//         const userExist = await User.findOne({ email: user.email })

//         if (userExist) return { msg: "verify success !" }

//         const newUser = new User(user)

//         await newUser.save()
//         return NextResponse.json({ msg: "verify success" })
//     } catch (err) {
//         return NextResponse.json({ error: err })
//     }
// };


