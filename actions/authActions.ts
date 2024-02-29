"use server"

import ContactFormEmail from "@/emails/contact-form-email";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { forgotPasswordSchema, registerSchema, resetPasswordSchema } from "@/lib/zod/schema";
import { IForgotPasswordSchema, IRegisterSchema, IResetPasswordSchema } from "@/types";
import { generateToken, verifyToken } from "@/utils/token";
import bcrypt from "bcryptjs";
import { Resend } from 'resend'

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY


// Function for registering a user with credentials
export const registerWithCredential = async (data: IRegisterSchema) => {
    try {
        // Connect to the database
        await dbConnect();

        // Validate the registration data using the defined schema
        const validationResult = registerSchema.safeParse(data);

        // If validation fails, return an error with details
        if (!validationResult.success) {
            console.log("Validation error");
            return { error: `Validation error: ${validationResult.error.errors}` };
        }

        // Check if a user with the provided email already exists
        const user = await User.findOne({ email: validationResult.data.email });

        // If user already exists, return an error
        if (user) {
            return { error: "User already exists" };
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(validationResult.data.password, 10);

        // Generate a token for email verification
        const token = generateToken({ user: { ...validationResult.data, password: hashedPassword } });

        // Initialize the Resend library with the API key
        const resend = new Resend(RESEND_API_KEY);

        // Prepare data for the email
        let message = "Hello World";
        let name = validationResult.data.name;
        let email = validationResult.data.email;
        let url = `${BASE_URL}/verify_email?token=${token}`;

        // Send the email using Resend library
        await resend.emails.send({
          //  from: 'onboardding@resend.dev',
         from: 'contact@la-voie-de-linfo.fr',
            to: [email],
            subject: 'Contact form submission',
            text: `Name: ${name}\nEmail: ${data.email}\nMessage: ${message}`,
            react: ContactFormEmail({ email, url })
        });

        // Return a success message if the email is sent successfully
        return { msg: "Verification mail has been sent" };
    } catch (err) {
        // If an error occurs during the process, log it and return an error message
        console.error(err);
        return { error: `Something went wrong: ${err}` };
    }
};

// Function for verifying the email based on the token
export const verifyEmail = async (token: string) => {
    try {
        // Connect to the database
        await dbConnect();

        // Verify the token
        const { user } = verifyToken(token);

        // Check if the user already exists with the provided email
        const userExist = await User.findOne({ email: user.email });

        // If user already exists, return an error
        if (userExist) return { error: "User already exists" };

        // Create a new user with the provided user data
        const newUser = new User(user);

        // Save the new user to the database
        await newUser.save();

        return { msg: "Verification success" };
    } catch (err) {
        // If an error occurs during the process, return an error message
        console.error(err);
        return { error: err };
    }
};

// Function for handling password reset with credentials
export const forgotPasswordWithCredentials = async (data: IForgotPasswordSchema) => {
    try {
        // Connect to the database
        await dbConnect();

        // Validate input data
        const validationResult = forgotPasswordSchema.safeParse(data);
        if (!validationResult.success) {
            return { error: "Validation" };
        }

        // Find user by email
        const user = await User.findOne({ email: validationResult.data.email });
        if (!user) return { error: "Email does not exist" };

        // Check if the user is using credentials as a provider
        if (user?.provider !== 'credentials') {
            return { error: `This account is signed with ${user?.provider}, you can't use this function` };
        }

        // Generate a token for password reset
        const token = generateToken({ user: user._id });

        // Send an email with a password reset link
        const resend = new Resend(RESEND_API_KEY);
        const email = user.email;
        const url = `${BASE_URL}/reset_password?token=${token}`;

        await resend.emails.send({
            //from: 'onboardding@resend.dev',
              from: 'contact@la-voie-de-linfo.fr',
            to: [email],
            subject: 'Changement de mot de passe',
            text: 'Liens pour changer votre mot de passe',
            react: ContactFormEmail({ email, url })
        });

        return { msg: "Change password success" };
    } catch (err) {
        console.error(err);
        return { error: "An error occurred during password reset" };
    }
};

// Function for verifying the password reset token
export const verifyTokenPassword = async (token: string) => {
    try {
        // Connect to the database
        await dbConnect();

        // Verify the token
        const { user } = verifyToken(token);

        // Check if the user exists
        const userExist = await User.findById(user);
        if (!userExist) {
            return { error: "User does not exist" };
        }

        return { msg: userExist._id };
    } catch (err) {
        console.error(err);
        return { error: "An error occurred during verification" };
    }
};

// Function for changing the user's password
export const changePassword = async (userId: string, data: IResetPasswordSchema) => {
    try {
        // Connect to the database
        await dbConnect();

        // Validate input data
        const validationResult = resetPasswordSchema.safeParse(data);
        if (!validationResult.success) {
            // If validation fails, return an error with details
            console.log("Validation error");
            return { error: `Validation error: ${validationResult.error.errors}` };
        }

        // Check if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return { error: "User not found" };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(validationResult.data.password, 10);

        // Update the user's password
        const newUser = await User.findByIdAndUpdate(userId, { password: hashedPassword });

        if (newUser) {
            return { msg: "Change password success" };
        }
    } catch (err) {
        console.error(err);
        return { error: "An error occurred during password change" };
    }
};