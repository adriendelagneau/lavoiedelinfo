import React from 'react'
import Image from 'next/image'
import { TArticle } from '@/types'


const MainGutterCard = ({ article }: { article: TArticle }) => {

  return (
    <div className='py-6'>
      <div className='w-[70px] h-[70px] float-right rounded-md pl-3 '>
        <Image src={article.images[1].url} width={482} height={482} alt={article.images[0].legend} />
      </div>
      <p className='text-xl '>{article.title}</p>
    </div>
  )
}

export default MainGutterCard