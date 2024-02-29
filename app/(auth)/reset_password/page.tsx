"use client"

import { verifyTokenPassword } from '@/actions/authActions';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import React, { useEffect, useState } from 'react'
import { Hourglass } from 'react-loader-spinner';

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
         <div>
         <Hourglass
           visible={true}
           height="160"
           width="160"
           ariaLabel="hourglass-loading"
           wrapperStyle={{}}
           wrapperClass=""
           colors={['#306cce', '#72a1ed']}
         />
         <p>Verification in progress...</p>
       </div>
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