import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>

      <h1 className='mb-6 text-4xl'>Mot de pass oublié</h1>
      <ForgotPasswordForm />
      <p className='mt-9'>Nous vous enverron un liens pour changer votre mot de passe</p>
    </div>
  )
}

export default ForgotPasswordPage