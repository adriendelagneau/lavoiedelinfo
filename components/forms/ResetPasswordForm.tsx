"use client"

import React, { useState } from 'react'
import RippleButton from '../buttons/RippleButton';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
import { IResetPasswordSchema } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/lib/zod/schema';
import { changePassword } from '@/actions/authActions';

const ResetPasswordForm = ({userId}: {userId: string}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<IResetPasswordSchema>({
      resolver: zodResolver(resetPasswordSchema),
    });
  
  const onSubmit: SubmitHandler<IResetPasswordSchema> = async (data) => {
      
    try {
     const res = await  changePassword(userId, data)
      
      if (res?.msg) toast.success("password chang successfully")
      if(res?.error) toast.error("error during password change")
    } catch (err) {
      console.log(err)
      toast.error("error during password change")
    }
    };
  
    return (
      <div className='p-6 border shadow-xl'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col   gap-y-2  w-[300px] ">
  
      
  
          <div className="relative mt-3">
            <input
              {...register("password")}
              id='password'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
            />
            <label
              htmlFor="password"
              className="absolute z-20 px-1 text-xs capitalize transition-all bg-white text-primaryGray left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
            >
              Mot de passe
            </label>
            <Eye
              className="absolute w-4 h-4 top-3.5 right-3 hover:cursor-pointer z-10"
              onMouseDown={(e) => {
                e.preventDefault()
                setIsPasswordVisible(prevState => !prevState);
              }} />
            <p className="w-full h-5 pt-1 text-primaryRed">{errors.password?.message}</p>
          </div>

          
          <div className="relative mt-3">
            <input
              {...register("confirmPassword")}
              id='confirmPassword'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="confirmPassword"
              className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
            />
            <label
              htmlFor="Confirm password"
              className="absolute z-20 px-1 text-xs capitalize transition-all bg-white text-primaryGray left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
            >
             Confirmation
            </label>
            <Eye
              className="absolute w-4 h-4 top-3.5 right-3 hover:cursor-pointer z-10"
              onMouseDown={(e) => {
                e.preventDefault()
                setIsPasswordVisible(prevState => !prevState);
              }} />
            <p className="w-full h-5 pt-1 text-primaryRed">{errors.confirmPassword?.message}</p>
          </div>
  
          <RippleButton
            text={"Connection"}
            buttonClasses={"w-full mt-10 text-xl rounded-md bg-primaryBlue text-white p-2 "}
            type="submit"
            isLoading={isSubmitting}
          />
  
        </form>
       
      </div>
    )
  }

export default ResetPasswordForm