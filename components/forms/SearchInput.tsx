'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchInputProps } from '@/types';
import RippleButton from '../buttons/RippleButton';


const SearchInput: React.FC<SearchInputProps> = ({ setIsMenuOpen }) => {

  const { push } = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form)
    const search = formData.get('search')

    push(`${baseUrl}/articles?query=${search}`);
    setIsMenuOpen(false)
    form.reset()

  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='w-full'>
      <div className="relative mt-3">
        <input
          id='search'
          name="search"
          type="text"
          placeholder="search"
          className="relative  z-10 w-full p-2 bg-transparent border-2  rounded outline-none peer  placeholder:text-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:border-primaryBlue"
        />
        <label
          htmlFor="search"
          className="absolute z-20 px-1 text-xs capitalize transition-all bg-white text-primaryGray left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:text-primaryBlue peer-placeholder-shown:-z-10 peer-focus:z-20"
        >
          Search
        </label>
      </div>

    
    </form>
  );
}

export default SearchInput;
