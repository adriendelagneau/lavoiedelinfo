import { getArticleBySlug } from '@/actions/articlesActions'
import HandleVisitor from '@/components/HandleVisitor';
import IncreaseNumberOfViews from '@/components/IncreaseNumberOfViews';
import { getSession } from 'next-auth/react';
import { headers } from 'next/headers';

import React from 'react'

interface SinglePageProps {
  params: {
    slug: string;
  };
}

const SinglePage: React.FC<SinglePageProps> = async ({ params: { slug } }) => {

  const session = await getSession()

  const article = await getArticleBySlug(slug)
  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]



  return (
    <div className='w-full   min-h-[200vh] mx-auto mt-24'>
        <h1 className='text-4xl leading-snug font-large  xl:leading-[1.2]  xl:text-5xl  font-newsreader lg:my-0 my-12 line-clamp-2'>{ article.title}</h1>
      {article._id && <IncreaseNumberOfViews id={article._id} />}
      
 
        <HandleVisitor ip={ip} />
      
    </div>
  )
}

export default SinglePage


