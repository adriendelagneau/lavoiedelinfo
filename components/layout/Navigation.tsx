import React from 'react'
import { getCategories } from '@/actions/categoryActions'

const Navigation = async () => {

  const category = await getCategories()

  console.log(category)

  return (
    <div>Navigation</div>
  )
}

export default Navigation