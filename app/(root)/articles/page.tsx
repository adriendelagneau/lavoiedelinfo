import { getArticles } from '@/actions/articlesActions'
import { getCategoryByName } from '@/actions/categoryActions'
import Collection from '@/components/Collection'
import InfinitScroll from '@/components/InfiniteScroll'

import { GetArticlesParams, IGetArticlesResponse, TSubcategory } from '@/types'
import Link from 'next/link'
import React from 'react'

const ArticlesPage = async ({ searchParams }: { searchParams: GetArticlesParams }) => {

  const res = await getArticles(searchParams)

  const categoryParams = searchParams.category ? searchParams.category : ""
  const queryryParams = searchParams.query ? searchParams.query : ""

  const categories = await getCategoryByName(categoryParams)



  return (
    <div className='min-h-screen pt-24'>

      {queryryParams && (
        <p>search , serach page</p>
      )}

      {categoryParams && (
        <>
          <h1 className='w-full text-6xl text-center capitalize'>
            <Link href={`?category=${searchParams.category}`}>
              {searchParams.category}
            </Link>
          </h1>
          <ul className='flex justify-center w-full gap-3 mt-6 mb-24'>
            {categories.sub.map((subcategory: TSubcategory, i: number) => (
              <li key={i} className={`capitalize text-2xl ${searchParams.subcategory === subcategory.name && "underline underline-offset-4"}`}>
                <Link href={`?category=${searchParams.category}&subcategory=${subcategory.name}`}>
                  {subcategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <Collection {...res} />
      <InfinitScroll {...res} />
    </div>
  )
}

export default ArticlesPage