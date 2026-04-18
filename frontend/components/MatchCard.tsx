import React from 'react';
import { User } from '../types';
import { NeonButton } from './NeonButton';
import { Swords, Heart, X, Zap } from 'lucide-react';

interface MatchCardProps {
  user: User;
  onChallenge?: (userId: string) => void;
  onPass?: (userId: string) => void;
  onLike?: (userId: string) => void;
  dragX?: number;
}

export const MatchCard: React.FC<MatchCardProps> = ({ user, onChallenge, onPass, onLike, dragX = 0 }) => {
  // Calculate opacity for stamps based on drag distance
  const likeOpacity = Math.min(Math.max(dragX / 100, 0), 1);
  const passOpacity = Math.min(Math.max(-dragX / 100, 0), 1);

  return (
    <div className="relative w-full max-w-md mx-auto bg-pitch-gray rounded-xl overflow-hidden border border-neon-purple/30 shadow-neon flex flex-col h-[600px] select-none">
      
      {/* LIKE Stamp */}
      <div 
        className="absolute top-12 left-8 z-50 border-4 border-green-500 text-green-500 font-bold text-5xl p-2 rounded-lg transform -rotate-12 pointer-events-none shadow-[0_0_20px_rgba(34,197,94,0.5)]"
        style={{ opacity: likeOpacity }}
      >
        LIKE
      </div>

      {/* PASS Stamp */}
      <div 
        className="absolute top-12 right-8 z-50 border-4 border-red-500 text-red-500 font-bold text-5xl p-2 rounded-lg transform rotate-12 pointer-events-none shadow-[0_0_20px_rgba(239,68,68,0.5)]"
        style={{ opacity: passOpacity }}
      >
        PASS
      </div>

      {/* Soulmate Badge */}
      {user.isSoulmate && (
        <div className="absolute top-4 right-4 z-10 bg-black/80 border border-neon-purple px-3 py-1 rounded-full flex items-center gap-2 shadow-neon backdrop-blur-sm pointer-events-none">
          <Zap size={16} className="text-neon-purple animate-pulse" />
          <span className="text-neon-purple font-bold text-xs tracking-widest uppercase">Soulmate Match</span>
        </div>
      )}

      {/* Match Score Indicator */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 border border-gray-700 px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm pointer-events-none">
        <span className="text-gray-300 text-xs font-mono">SBMM:</span>
        <span className="text-white font-bold text-sm">{user.matchScore}%</span>
      </div>

      {/* Image Section */}
      <div className="relative h-1/2 w-full pointer-events-none">
        <img 
          src={user.avatarUrl} 
          alt={user.username} 
          className="w-full h-full object-cover opacity-80 pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-gray via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white mb-1 drop-shadow-[0_0_8px_rgba(191,0,255,0.5)]">
            {user.username}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.preferredGenres.map(genre => (
              <span key={genre} className="text-xs px-2 py-1 bg-neon-purple/20 text-neon-light border border-neon-purple/50 rounded-md font-mono">
                {genre}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6 italic border-l-2 border-neon-purple/50 pl-3">
          "{user.bio}"
        </p>

        {/* Stats Section */}
        <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-3 custom-scrollbar pointer-events-auto">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Top High Scores</h3>
          {user.stats.map((stat, idx) => (
            <div key={idx} className="bg-black/50 p-3 rounded-lg border border-gray-800 flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-gray-200">{stat.gameName}</div>
                <div className="text-xs text-neon-purple/80 font-mono">{stat.rank}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-neon-light">{stat.score.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase">{stat.genre}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-4 pt-4 border-t border-gray-800 pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); onPass?.(user.id); }}
            className="p-4 rounded-full bg-gray-900 border border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all"
          >
            <X size={24} />
          </button>
          
          <NeonButton 
            variant="primary" 
            className="flex-1 py-4"
            onClick={(e) => { e.stopPropagation(); onChallenge?.(user.id); }}
          >
            <Swords size={20} />
            CHALLENGE
          </NeonButton>

          <button 
            onClick={(e) => { e.stopPropagation(); onLike?.(user.id); }}
            className="p-4 rounded-full bg-gray-900 border border-gray-700 text-gray-400 hover:text-neon-purple hover:border-neon-purple hover:bg-neon-purple/10 hover:shadow-neon transition-all"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
