//import { createCat, createSub } from "@/actions/categoryActions";
import { createArticle, getArticles } from "@/actions/articlesActions";
import Image from "next/image";

export default async function Home() {

  const articles = await getArticles({ limit: 6 });

  console.log(articles, "aze")

  return (
    <main className="flex min-h-[200vh] flex-col items-center justify-between p-24" id="yoyo">
   
    </main>
  );
}
