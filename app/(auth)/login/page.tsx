import LoginForm from '@/components/forms/LoginForm'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
    <h1 className='mb-12 text-4xl'>Se connecter</h1>
      <LoginForm />
      
    
    <Link href="/register" className="mt-9 group">
      Pas encore de compte ? <span className='group-hover:underline'>S'ENREGISTRER</span> 
      </Link>
      </div>
  )
}

export default LoginPage