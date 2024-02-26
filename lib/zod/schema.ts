import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Minimum 8 characters"),
  })

  export const forgotPasswordSchema = z
  .object({
    email: z.string().email(),
  })
