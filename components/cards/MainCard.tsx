import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TArticle } from '@/types'

const MainCard = ({ article }: { article: TArticle }) => {

    return (
        <div className='flex flex-col max-w-screen-xl p-3 mx-auto lg:flex-row-reverse'>

            <div className='rounded-sm lg:w-1/2'>
                <Link href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/article/${article.slug}`}>
                    <Image src={article.images[0].url} width={844} height={482} alt={article.images[0].legend} />
                    <p className='py-3 text-sm text-gray-800 capitalize'>{article.images[0].legend}</p>
                </Link>
            </div>

            <div className='flex flex-col pr-3 lg:w-1/2 lg:justify-between'>
                <div className='text-4xl leading-snug font-large  xl:leading-[1.2]  xl:text-5xl   lg:my-0 my-12 line-clamp-2'>
                    <Link href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/article/${article.slug}`}>{article.title}</Link>
                </div>
                <div>
                    <div className='text-xl line-clamp-3'>{article.content[0]}</div>
                    <p className='py-5'>written by: {article.author.name}</p>
                </div>
            </div>

        </div>
    )
}

export default MainCard