"use client"

import { verifyTokenPassword } from '@/actions/authActions';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import React, { useEffect, useState } from 'react'

const ResetPasswordPage = ({ searchParams }: { searchParams: { token: string } }) => {

  const [isVerified, setIsVerified] = useState("")
  const [userId, setUserId] = useState("")
  const token = searchParams?.token;

  useEffect(() => {
    const verifyEmailAsync = async () => {
      if (token) {

        const res = await verifyTokenPassword(token);
        if (res.msg) {
      
          setUserId(res.msg)
          setIsVerified("success")
        }
        else setIsVerified("error")

      } else {
        console.error('Token not found in search params');
        setIsVerified("error")
      }
    };

    verifyEmailAsync();
  }, [token]);

  console.log(userId, "UID")

  return (
    <div>
      {isVerified === '' ? (
        <p>Verification in progress...</p>
      ) : isVerified === 'success' ? (
        <div>
          <ResetPasswordForm userId={userId}/>
        </div>
      ) : (
        <p>token validation. Please try again or contact support.</p>
      )}
    </div>
  )
}

export default ResetPasswordPage