import { getArticleBySlug } from '@/actions/articlesActions'

import React from 'react'

interface SinglePageProps {
  params: {
    slug: string;
  };
}

const SinglePage: React.FC<SinglePageProps> = async ({ params: { slug } }) => {

  const article = await getArticleBySlug(slug)

console.log(article)
  return (
    <div className='w-full   min-h-[200vh] mx-auto mt-24'>
        <h1 className='text-4xl leading-snug font-large  xl:leading-[1.2]  xl:text-5xl  font-newsreader lg:my-0 my-12 line-clamp-2'>{ article.title}</h1>
       
    </div>
  )
}

export default SinglePage


