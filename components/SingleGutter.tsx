import React from 'react'
import MainGutterCard from './cards/MainGutterCard'
import { getArticles } from '@/actions/articlesActions'
import SingleGutterCard from './cards/SingleGutterCard'

const SingleGutter = async () => {
  const articles = await getArticles({ limit: 5 })
  return (
    <div className="w-[300px] min-h-[90vh] hidden 2xl:inline-block">
  
      <h3 className='text-3xl capitalize pb-3'>related articles</h3>
      {articles.data.map((a, i) => (
        <SingleGutterCard article={a} key={i} />
      ))}
  </div>
  )
}

export default SingleGutter