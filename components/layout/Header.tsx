'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link";

import { TCategory } from "@/types";
import Sidebar from './Sidebar';
import RippleButton from "../buttons/RippleButton";

import { TextSearch } from "lucide-react";
import { useSession } from 'next-auth/react';

const Header: React.FC<{ cat: TCategory[] }> = ({ cat }) => {

  const [showTitle, setShowTitle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const { data: session, status } = useSession()

  console.log(session)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 120) {
        setShowTitle(true);
      } else {
        setShowTitle(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} cat={cat} />

      <header className="fixed top-0 left-0 z-50 w-full h-[70px] bg-white">
        <nav className="relative flex items-center justify-between w-full h-full gap-3 p-3 bg-primaryBackground">

          {/* Left side */}
          <div className={`${showTitle ? '' : 'flex flex-grow gap-6 items-center'}`}>
            <TextSearch size={28} strokeWidth={1} onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer" />
            <div className={`${showTitle ? 'hidden' : 'flex flex-grow '}`}>
              <ul className="hidden gap-4 text-lg capitalize text-lm sm:flex">
                {cat?.map((c, i) => (
                  <li key={i}>
                    <Link href={`/articles?category=${c.name}`} onClick={() => setIsMenuOpen(false)}>{c.name}</Link>
                  </li>
                ))}

              </ul>
            </div>
          </div>

          <div className={`${showTitle ? 'absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-3xl hidden sm:inline-block' : 'hidden'}`}><Link href={"/"}> la voie de l&#39;info </Link></div>

          {/* Right side */}
          <div className="flex gap-3">
            <Link href="/subscribe" >
              <RippleButton text="Subscribe" buttonClasses="rounded-full text-white py-1 border border-primaryBlue px-3 bg-primaryBlue"/>
            </Link>
            {session?.user ? (
             <Link href={`/profile/${session.user.userId}`}>
             <RippleButton text="Profile" buttonClasses="rounded-full py-1 border border-primaryBlue px-3 bg-white text-primaryBlue "/>
             </Link>
            ): (
            <Link href="/login">
            <RippleButton text="Connexion" buttonClasses="rounded-full py-1 border border-primaryBlue px-3 bg-white text-primaryBlue "/>
            </Link>
                
            )}
          </div>

        </nav>
      </header>
    </>
  )
}

export default Header