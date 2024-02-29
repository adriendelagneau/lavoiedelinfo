import { getUserById } from '@/actions/userActions'
import SignOutButton from '@/components/buttons/SignOutButton'
import React from 'react'

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  
  const user = await getUserById(id)

  return (
    <div className='min-h-screen'>
      <SignOutButton />
      
    </div>
  )
}

export default ProfilePage