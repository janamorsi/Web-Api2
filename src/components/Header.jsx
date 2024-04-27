import React from 'react';
import { homebackg, banner1, banner2, banner3, banner4 } from '/Users/jana/Desktop/jayskitchen/src/images';

// This file is for creating the home page header and the title
// Array of images
const images = [homebackg, banner1, banner2, banner3, banner4];

const Header = ({ title, image, type }) => {
  // Randomly choose an image from the array
  return (
    <div className="relative w-full h-screen">  
      <div className="absolute w-full h-full">
        <img
          src={image ?? images[Math.floor(Math.random() * images.length)]}
          alt="Hero Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className='absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 z-8 flex flex-col items-center justify-center pt-40 2xl:pt-20 px-4'>
        <h1 className='text-white text-4xl md:text-5xl font-bold text-center'>{title}</h1>
        {type && (
          <p className='text-sm mt-4 text-center text-black bg-[#ffffff90]
          px-6 py-4 rounded-full'> {/* Corrected rounded class */}
            Welcome to Jay's Kitchen, you'll find recipes to all your favorite dishes here!
            <br className='hidden md:block' />
            Discover the magic of food creation.
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
 