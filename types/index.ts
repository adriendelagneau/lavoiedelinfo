import { registerSchema } from '@/lib/zod/schema';
import  { ReactNode, MouseEvent } from 'react';
import { z } from "zod";

// Ripple button
export interface IRippleButtonProps {
    text: string;
    buttonClasses?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    icon?: ReactNode;
    isLoading?: boolean;
}
export interface IRipple {
    x: number;
    y: number;
    size: number;
    id: number;
}
  
// based on Zod schema
export type IRegisterSchema = z.infer<typeof registerSchema>;