import { TArticle } from '@/types'
import Image from 'next/image'
import React from 'react'
import Share from '../Share'

const SingleCard = ({ article }: { article: TArticle }) => {



  console.log(article)

  return (
    <>

    

      <div className='w-full rounded'>
        <Image src={article.images[0].url} width={908} height={519} alt={article.images[0].legend} />
        <p className='capitalize py-3 text-sm text-gray-800'>{article.images[0].legend}</p>
      </div>
      <Share />

      <ul>
        {article.content.map((c, i) => (
          <li key={i} className='my-24'>
            <p className='text-2xl first-letter:text-3xl leading-10' key={i}>{c}</p>
          </li>
        ))}
      </ul>

    </>
  )
}

export default SingleCard