"use server"

import ContactFormEmail from "@/emails/contact-form-email";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { forgotPasswordSchema, registerSchema } from "@/lib/zod/schema";
import { IForgotPasswordSchema, IRegisterSchema } from "@/types";
import { generateToken, verifyToken } from "@/utils/token";
import bcrypt from "bcryptjs";
import { Resend } from 'resend'

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY


export const registerWithCredential = async (data: IRegisterSchema) => {
    // Connect to the database
    await dbConnect();

    // Validate the registration data using the defined schema
    const validationResult = registerSchema.safeParse(data);
    if (!validationResult.success) {
        // If validation fails, return an error with details
        console.log("validation error")
        return { error: `Validation error: ${validationResult.error.errors}`, };
    }

    // Check if a user with the provided email already exists
    const user = await User.findOne({ email: validationResult.data.email });
    if (user) {
        // If user already exists, return an error
        return { error: "User Already exists" };
    }

    try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(validationResult.data.password, 10);

        // Generate a token for email verification
        const token = generateToken({ user: { ...validationResult.data, password: hashedPassword } });

        // Initialize the Resend library with the API key
        const resend = new Resend("re_5r6ZHmTe_4qnmmiR58DfJDUxhamfjCJU5");


        // Prepare data for the email
        let message = "Hello World";
        let name = validationResult.data.name;
        let email = validationResult.data.email;
        let url = `${BASE_URL}/verify_email?token=${token}`;

        // Send the email using Resend library
        await resend.emails.send({
            from: 'la-voie-de-linfo.fr',
            to: [email],
            subject: 'Contact form submission',
            text: `Name: ${name}\nEmail: ${data.email}\nMessage: ${message}`,
            react: ContactFormEmail({ email, url })
        });

        // Return a success message if the email is sent successfully
        return { msg: "Verification mail has been sent" };
    } catch (err) {
        // If an error occurs during the process, log it and return an error message
        console.log(err);
        return { error: `something went wrong: ${err}` };
    }
};

export const verifyEmail = async (token: string) => {
    await dbConnect()

    try {
        const { user } = verifyToken(token)

        const userExist = await User.findOne({ email: user.email })

        if (userExist) return { error: "user already exist !" }

        const newUser = new User(user)

        await newUser.save()
        return ({ msg: "verify success" })
    } catch (err) {
        return ({ error: err })
    }
};


export const forgotPasswordWitnCredentials = async (data: IForgotPasswordSchema) => {

    await dbConnect()

    const validationResult = forgotPasswordSchema.safeParse(data);

    if (!validationResult.success) {

        return ({ errors: "falidation" });
    }

    try {
        const user = await User.findOne({ email: validationResult.data.email })
        if (!user) throw new Error("email do not exist");



        if (user?.provider !== 'credentials') {
            throw new Error(`this account is signed with ${user?.provider} you can t use  this function`)
        }

        const token = generateToken({ user: user._id })

        const resend = new Resend('re_K8wxihkq_NZ4CUyMECA3pgjKJ32Cv25Aq');
        let message = "hello wold"
        // let name = validationResult.data.name
        let email = validationResult.data.email
        let url = `${BASE_URL}/reset_password?token=${token}`

        await resend.emails.send({
            from: 'onboardding@resend.dev',
            to: [email],
            subject: 'Changement de mot de passe',
            text: `Liens pour changer votre mot de passe`,
            react: ContactFormEmail({ email, url })
        })


        return ({ msg: "change password success" })
    } catch (err) {
        console.log(err)
        return ({ errors: err })
    }
}