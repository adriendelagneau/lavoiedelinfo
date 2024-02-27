
import React from 'react';
import { verifyEmail } from '@/actions/authActions'; 




const VerifyPage = async ({ searchParams }: {searchParams: {token: string}}) => {

  const token = searchParams?.token;

  
  const res = await verifyEmail(token);
  
  console.log(res)
     

  return <div>Verification in progress...</div>;
};

export default VerifyPage;
