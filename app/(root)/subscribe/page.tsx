"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import CardSubscription from '@/components/cards/CardSubscription';

const SubscribePage = () => {
  const { data: session } = useSession()
  const userEmail = session?.user.email
  const [products, setProducts] = useState([]);

  console.log(session)

  useEffect(() => {
    fetchProducts()
  }, [])


  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-products`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  
  return (
    <div className='min-h-screen pt-48'>
      {
        products.map((s: any, i) => (
          <CardSubscription
            key={i}
            // data={s}
            data={{
              id: s.id,
              unit_amount: s.unit_amount,
            }}
            userEmail={userEmail}
          />
        ))
      }
    </div>
  )
}

export default SubscribePage