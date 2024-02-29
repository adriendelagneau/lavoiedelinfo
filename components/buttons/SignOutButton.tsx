'use client'

import React from 'react'
import { signOut } from 'next-auth/react'
import RippleButton from './RippleButton'


const SignOutButton = () => {

  return (
    <div className='mt-24'>
      <RippleButton
        buttonClasses="rounded-full text-white py-1 border border-primaryBlue px-3 bg-primaryBlue"
        text="Sign out"
        onClick={() => signOut({callbackUrl: "/"})}
      />
    </div>
  )
}

export default SignOutButton