import React from 'react'
import CheckoutButton from '../buttons/CheckoutButton'
import { CardSubscriptionProps } from '@/types'



const CardSubscription: React.FC<CardSubscriptionProps>  = ({ data, userEmail }) => {

    return (
        <div className=''>
            <div className={` rounded-xl w-[360px] ml-10 `}>
                <div className="flex flex-col p-8 translate-x-4 translate-y-4 bg-white shadow-xl rounded-xl w-96 md:w-auto">
                  
                    <div className="text-sm font-light w-60 md:w-auto">Unlimited access to all contents</div>
                    <div className="text-sm font-light w-60 md:w-auto">can be stopped at all time</div>

                    <div className="my-4">

                        <p className="font-light text-2xl"><span className='text-3xl'>{data.unit_amount/100}</span>€ /month</p>
                    </div>


                    

                    <CheckoutButton data={data} userEmail={ userEmail} />
                     </div>
            </div></div>
    )
}

export default CardSubscription