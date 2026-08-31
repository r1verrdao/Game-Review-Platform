import React from 'react';
import { useNavigate } from 'react-router-dom';
import screenImg from '../assets/images/screen.png';
import image2 from '../assets/images/Image2.jpeg';
import image3 from '../assets/images/Image3.jpeg';

const images = [screenImg, image2, image3];

const GameCard = ({ game, index }) => {
  const navigate = useNavigate();
  // Assign an image based on index to cycle through the 3 images
  const coverImage = images[index % images.length];

  // Split genres if they are comma separated to map them as tags
  const genres = game.genre.split(',').map(g => g.trim());

  return (
    <div className="border border-cr_gray hover:border-cr_green transition-colors group cursor-pointer flex flex-col h-[400px] relative bg-cr_bg"
         onClick={() => navigate(`/game/${game.id}`)}>
      
      {/* Glitch Effect on Hover */}
      <div className="absolute inset-0 bg-cr_green opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />

      {/* Image Container */}
      <div className="h-[280px] w-full border-b-2 border-cr_green overflow-hidden relative">
        <img 
          src={coverImage} 
          alt={game.title} 
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 border border-cr_green bg-black/80 px-2 py-0.5 flex items-center gap-1 z-10 backdrop-blur-sm">
          <span className="text-cr_green text-[10px]">★</span>
          <span className="text-white font-mono text-[10px] tracking-widest mt-0.5">5/5</span>
        </div>

        {/* Genre Tags */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 z-10">
          {genres.map((g, i) => (
            <span key={i} className="bg-white/90 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-serif font-bold uppercase tracking-widest text-xl text-white truncate mb-4 group-hover:text-cr_green transition-colors">
          {game.title}
        </h3>
        
        <div className="mt-auto flex justify-between items-center border-t border-cr_gray/30 pt-3">
          <span className="text-[9px] text-cr_gray font-mono uppercase tracking-widest">
            ID: {game.id.substring(0, 8).toUpperCase()}
          </span>
          <span className="text-[9px] text-cr_green font-mono uppercase tracking-widest">
            STATUS: VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
