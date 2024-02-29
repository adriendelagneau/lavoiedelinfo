import React from 'react'
import { getCategories } from '@/actions/categoryActions'
import Header from './Header'

const Navigation = async () => {

  const category = await getCategories()

  return (
    <div><Header cat={category } /></div>
  )
}

export default Navigation