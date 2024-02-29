"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmail } from '@/actions/authActions';
import {Hourglass} from "react-loader-spinner"

const VerifyPage = ({ searchParams }: { searchParams: { token: string } }) => {
  const [verificationStatus, setVerificationStatus] = useState<string>('verifying');
  const { push } = useRouter();
  const token = searchParams?.token;

  useEffect(() => {
    const verifyEmailAsync = async () => {
      if (token) {
        try {
          const res = await verifyEmail(token);



          // If registration is successful, redirect to login page
          if (res.msg === 'Verification success') {
            setVerificationStatus('success');
            setTimeout(() => {
              push('/login');
            }, 3000); // Redirect after 3 seconds (adjust as needed)
          }

          if(res.error) setVerificationStatus("error")

        } catch (error) {
          console.error('Error verifying email:', error);
          setVerificationStatus('error');
        }
      } else {
        console.error('Token not found in search params');
        setVerificationStatus('error');
      }
    };

    verifyEmailAsync();
  }, [push, token]);

  console.log(verificationStatus)

  return (
    <div className='flex flex-col items-center justify-center'>
      {verificationStatus === 'verifying' ? (
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
          <p>Verifying...</p>
        </div>
      ) : verificationStatus === 'success' ? (
        <div>
          <p>Your registration is successful. You will be redirected to the login page shortly.</p>
          <button className="your-button-style" onClick={() => push('/login')}>
            Go to Login
          </button>
        </div>
      ) : verificationStatus === 'error' ? (
        <p>Registration failed. Please try again or contact support.</p>
      ) : null}
    </div>
  );
};

export default VerifyPage;
1