import { getArticleBySlug } from '@/actions/articlesActions'
import HandleVisitor from '@/components/HandleVisitor';
import IncreaseNumberOfViews from '@/components/IncreaseNumberOfViews';
import SingleGutter from '@/components/SingleGutter';
import SingleCard from '@/components/cards/SingleCard';
import { getSession } from 'next-auth/react';
import { headers } from 'next/headers';
import Image from 'next/image';

import React from 'react'

interface SinglePageProps {
  params: {
    slug: string;
  };
}

const SinglePage: React.FC<SinglePageProps> = async ({ params: { slug } }) => {

  //const {session} = await getSession()

  const article = await getArticleBySlug(slug)
  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  let articleCreationDate = new Date(article.createdAt)
  const formatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' });
  const formattedDate = formatter.format(articleCreationDate)



  return (
    <div className='w-full   min-h-[200vh] mx-auto mt-28'>
      <h1 className='text-4xl leading-snug font-large  xl:leading-[1.2]  xl:text-5xl  font-newsreader lg:my-0 my-12 line-clamp-2'>{article.title}</h1>

      <div className="flex mx-auto h-auto gap-6 relative mt-12">


        <div className='flex-grow mx-3'>
          <div className='flex gap-6 my-3 items-center justify-between'>

            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-full'><Image src={article.author.image} width={482} height={482} alt={article.images[0].legend} className='rounded-full' /></div>
              <div className='text-xl'>published by: {article.author.name}</div>
            </div>

            <p className='text-lg'>{formattedDate}</p>

          </div>

          <SingleCard article={article} />
        </div>

        <div className="h-screen sticky top-0 pt-[75px] mx-3">
          <SingleGutter />
        </div>

      </div>


      {article._id && <IncreaseNumberOfViews id={article._id} />}
      <HandleVisitor ip={ip} />
    </div>
  )
}

export default SinglePage


