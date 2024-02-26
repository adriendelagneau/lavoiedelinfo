"use client"

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {registerWithCredential } from '@/actions/authActions';
import RippleButton from '../buttons/RippleButton';
import { toast } from "sonner";
import { Eye } from 'lucide-react';
import { registerSchema } from '@/lib/zod/schema';
import { IRegisterSchema } from '@/types';


const RegisterForm = () => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IRegisterSchema> = async data => {

    const resp = await registerWithCredential(data)

    if (resp.msg) toast.success(`Email verification send to ${data.email}`)
    else toast.error(`Error: ${resp.error}`)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 border shadow-xl gap-y-2  w-[300px] ">

      <div className="relative mt-3">
        <input
          {...register("name")}
          id='name'
          type="name"
          placeholder="Name"
          className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
        />
        <label
          htmlFor="name"
          className="absolute z-20 px-1 text-xs capitalize transition-all bg-white text-primaryGray left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
        >
          Nom
        </label>
        <p className="w-full h-5 pt-1 text-primaryRed">{errors.name?.message}</p>
      </div>

      <div className="relative mt-3">
        <input
          {...register("email")}
          id='email'
          type="email"
          placeholder="Email"
          className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
        />
        <label
          htmlFor="email"
          className="absolute z-20 px-1 text-xs capitalize transition-all bg-white left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-sm peer-focus:text-xs text-primaryGray peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
        >
          Email
        </label>
        <p className="w-full h-5 pt-1 text-primaryRed">{errors.email?.message}</p>
      </div>

      <div className="relative mt-3">
        <input
          {...register("password")}
          id='password'
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Password"
          className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(239,239,239)] focus:border-primaryBlue"
        />
        <label
          htmlFor="password"
          className="absolute z-20 px-1 text-xs capitalize transition-all bg-white left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-sm peer-focus:text-xs text-primaryGray peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
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
          placeholder="Confirm password"
          className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(239,239,239)] focus:border-primaryBlue"
        />
        <label
          htmlFor="confirmPassword"
          className="absolute z-20 px-1 text-xs capitalize transition-all bg-white left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-sm peer-focus:text-xs text-primaryGray peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
        >
          Comfirmation
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
        text={"S'enregistrer"}
        buttonClasses={"w-full mt-10 text-xl rounded-md bg-primaryBlue text-white p-2 "}
        type="submit"
        isLoading={isSubmitting}
      />

    </form>
  )
}

export default RegisterForm