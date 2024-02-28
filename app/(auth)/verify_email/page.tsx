"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmail } from '@/actions/authActions';

const VerifyPage = ({ searchParams }: { searchParams: { token: string } }) => {
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const { push } = useRouter();
  const token = searchParams?.token;

  useEffect(() => {
    const verifyEmailAsync = async () => {
      if (token) {
        try {
          const res = await verifyEmail(token);

      

          // If registration is successful, redirect to login page
          if (res.msg === 'verify success') {
            setVerificationStatus('success');
            setTimeout(() => {
              push('/login');
            }, 3000); // Redirect after 3 seconds (adjust as needed)
          }

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

  return (
    <div className='flex flex-col items-center justify-center'>
      {verificationStatus === '' ? (
        <p>Verification in progress...</p>
      ) : verificationStatus === 'success' ? (
        <div>
          <p>Your registration is successful. You will be redirected to the login page shortly.</p>
          <button onClick={() => push('/login')}>Go to Login</button>
        </div>
      ) : (
        <p>Registration failed. Please try again or contact support.</p>
      )}
    </div>
  );
};

export default VerifyPage;
1