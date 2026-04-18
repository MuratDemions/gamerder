import React from 'react';
import { currentUser } from '../mockData';
import { Settings, Edit3, Trophy, Gamepad2 } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';

export const ProfileView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-widest uppercase">My Profile</h1>
        <button className="p-2 text-gray-400 hover:text-neon-purple transition-colors">
          <Settings size={24} />
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-pitch-gray rounded-2xl border border-gray-800 overflow-hidden shadow-lg mb-8 relative">
        <div className="h-32 bg-gradient-to-r from-neon-dark/40 to-black relative">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-pitch-gray overflow-hidden shadow-neon">
              <img src={currentUser.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <button className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:text-neon-purple backdrop-blur-sm">
            <Edit3 size={16} />
          </button>
        </div>
        
        <div className="pt-16 px-6 pb-6">
          <h2 className="text-2xl font-bold text-white mb-1">{currentUser.username}</h2>
          <p className="text-gray-400 text-sm mb-4">{currentUser.bio}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {currentUser.preferredGenres.map(genre => (
              <span key={genre} className="text-xs px-3 py-1 bg-gray-900 text-neon-light border border-gray-700 rounded-full font-mono">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-2">
          <Trophy size={20} className="text-neon-purple" />
          Verified High Scores
        </h3>
        
        <div className="grid gap-4">
          {currentUser.stats.map((stat, idx) => (
            <div key={idx} className="bg-black border border-neon-purple/20 p-4 rounded-xl flex items-center justify-between group hover:border-neon-purple/60 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:shadow-[inset_0_0_10px_rgba(191,0,255,0.2)]">
                  <Gamepad2 size={24} className="text-gray-500 group-hover:text-neon-light transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-200">{stat.gameName}</h4>
                  <span className="text-xs text-neon-purple font-mono">{stat.rank}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                  {stat.score.toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.genre}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <NeonButton variant="outline" fullWidth>
            Sync New Game Data
          </NeonButton>
        </div>
      </div>
    </div>
  );
};
