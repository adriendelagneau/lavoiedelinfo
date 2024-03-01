import { createCat, createSub } from "@/actions/categoryActions";
import { createArticle, createAuthor, getArticles } from "@/actions/articlesActions";
import MainGutter from "@/components/MainGutter";
import MainCard from "@/components/cards/MainCard";
import Image from "next/image";

export default async function Home() {

  const articles = await getArticles({ limit: 6 });



  return (
    <main className="w-full mx-auto mt-24 ">

    <div className="w-full my-10 text-center ">
      <h1 className="text-5xl font-semibold">
        La Voie De L&rsquo;Info
      </h1>
      <p className="font-normal ">Votre fenêtre sur l&rsquo;actualité</p>
    </div>

    <div className="relative flex h-auto gap-6 mx-auto z-5">
      <div>
        <ul className="">
          {articles.data?.slice(0, 3).map((a, i) => (
            <li key={i}>
              <MainCard article={a} />
              <div className="w-[90%] h-[1px] mx-auto bg-slate-300 my-14"></div>
            </li>
          ))}
        </ul>
        </div>
        
        <div className="sticky z-0 h-screen top-24 w-[250px] min-h-screen hidden 2xl:inline-block">
          <MainGutter />
        </div>
    </div>

  

  </main>
  );
}
