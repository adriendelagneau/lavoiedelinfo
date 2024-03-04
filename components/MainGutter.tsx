import { getArticles } from '@/actions/articlesActions'
import React from 'react'
import MainGutterCard from './cards/MainGutterCard'

const MainGutter = async () => {

  const articles = await getArticles({ limit: 4 })

  return (
    <div className="w-[250px] min-h-screen">
      <p className='pb-8 text-3xl capitalize'>derniers articles</p>
      <ul>
        {articles.data?.map((a, i) => (
          <div key={i}>
            <MainGutterCard article={a} />
            <div className="w-[90%] h-[1px] mx-auto bg-slate-300 my-4"></div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default MainGutter