"use client"

import { increaseViewsById } from '@/actions/articlesActions'
import React, { useEffect } from 'react'

const IncreaseNumberOfViews = ({id}: {id: string}) => {

    useEffect(() => {
        const res = increaseViewsById(id)
    },[id])
  return (
    <div>IncreaseNumberOfViews</div>
  )
}

export default IncreaseNumberOfViews