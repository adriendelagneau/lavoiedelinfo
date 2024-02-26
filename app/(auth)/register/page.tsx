import React from 'react'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'

const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>

      <h1 className='mb-12 text-4xl'>S&apos;enregister</h1>

      <RegisterForm />

      <Link href="/login" className="mt-9 group">
        Dejas un compte ? <span className='group-hover:underline'>SE CONNECTER</span>
      </Link>

    </div>
  )
}

export default RegisterPage