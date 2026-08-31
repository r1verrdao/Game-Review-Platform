import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-cr_gray bg-cr_bg text-cr_gray font-mono mt-16 pb-8 pt-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Left Column */}
        <div className="flex-1">
          <h2 className="font-serif font-bold text-xl tracking-widest text-white mb-2">CRITIQUE.DB</h2>
          <p className="text-[10px] uppercase tracking-widest leading-relaxed text-cr_gray/80 max-w-xs">
            UNBIASED_TECHNICAL_EVALUATION_PROTOCOL_ACTIVE.<br />
            PERFORMANCE_DATA_VERIFIED_BY_SYSTEM_CORE.
          </p>
        </div>

        {/* Middle Column */}
        <div className="flex-1">
          <h3 className="text-xs text-cr_green uppercase tracking-widest mb-4 font-bold">Directory</h3>
          <ul className="text-[10px] uppercase tracking-widest text-cr_gray/80 space-y-2">
            <li className="hover:text-cr_green transition-colors cursor-pointer">/INDEX</li>
            <li className="hover:text-cr_green transition-colors cursor-pointer">/ARCHIVE</li>
            <li className="hover:text-cr_green transition-colors cursor-pointer">/BENCHMARKS</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <h3 className="text-xs text-cr_green uppercase tracking-widest mb-4 font-bold">System_Info</h3>
          <ul className="text-[10px] uppercase tracking-widest text-cr_gray/80 space-y-2">
            <li>VER: 2.4.0-STABLE</li>
            <li>LAT: 37.77 / LONG: -122.41</li>
            <li>STATUS: OPERATIONAL</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cr_gray/30 text-center">
        <p className="text-[9px] uppercase tracking-widest text-cr_gray/50">
          ESTABLISHED_2024 // ALL_RIGHTS_RESERVED // NO_SOFT_DATA_ALLOWED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
