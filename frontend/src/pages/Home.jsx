import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import api from '../api';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await api.get('/games/');
      setGames(response.data);
    } catch (err) {
      console.error("Failed to fetch games", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="w-full bg-cr_bg text-cr_gray pt-10 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-cr_green/30 pb-4">
          <div className="relative">
            <span className="absolute -left-6 top-2 text-[8px] text-cr_gray/50 rotate-90 tracking-widest font-mono">SYS_OP_001</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-widest text-white uppercase">
              Index <span className="text-cr_green italic">{`//`}</span> Featured
            </h1>
          </div>
          <div className="text-right font-mono text-[10px] uppercase tracking-widest text-cr_green mt-4 md:mt-0">
            <p>Qry_Exec_Time: 0.042ms</p>
            <p>Vol: High_Density</p>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-cr_green font-mono uppercase tracking-widest animate-pulse">Sys.Loading_Data...</div>
          </div>
        ) : games.length === 0 ? (
          /* Empty State */
          <div className="border border-dashed border-cr_gray p-16 flex flex-col items-center justify-center relative mt-16 max-w-4xl mx-auto">
            <span className="absolute top-4 left-4 text-[9px] font-mono text-cr_gray/50 uppercase">SEC_002 // ERR_LOG</span>
            <div className="border-2 border-cr_green px-8 py-3 bg-black mb-6 shadow-[0_0_15px_rgba(38,255,42,0.2)]">
              <h2 className="text-cr_green font-mono font-bold uppercase tracking-widest text-xl">
                Null_Exception: No games published yet.
              </h2>
            </div>
            <p className="text-cr_gray/80 font-mono text-xs uppercase tracking-widest text-center max-w-md leading-loose mb-12">
              Please check back later! The database is currently undergoing synchronization with main servers.
            </p>
            <button 
              onClick={fetchGames}
              className="border border-white px-8 py-3 font-mono text-xs text-white uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <span>↻</span> Refresh Directory
            </button>
            <span className="absolute bottom-4 right-4 text-[9px] font-mono text-cr_gray/50 uppercase">EOF</span>
          </div>
        ) : (
          /* Grid State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative border-l border-cr_green/30 pl-4 py-4">
            <div className="absolute top-0 left-0 w-4 h-[1px] bg-cr_green"></div>
            <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-cr_green"></div>
            
            {games.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
