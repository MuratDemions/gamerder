import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { MatchCard } from '../components/MatchCard';
import { potentialMatches } from '../mockData';
import { Radar, Filter } from 'lucide-react';

export const DiscoveryView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRank, setSelectedRank] = useState<string | null>(null);
  
  // Swipe State
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  // Extract all unique ranks for the filter
  const allRanks = useMemo(() => {
    const ranks = new Set<string>();
    potentialMatches.forEach(user => {
      user.stats.forEach(stat => ranks.add(stat.rank));
    });
    return Array.from(ranks).sort();
  }, []);

  // Filter matches based on selected rank
  const filteredMatches = useMemo(() => {
    if (!selectedRank) return potentialMatches;
    return potentialMatches.filter(user => 
      user.stats.some(stat => stat.rank === selectedRank)
    );
  }, [selectedRank]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setDragX(0);
    setExitDirection(null);
  }, [selectedRank]);

  const handleAction = useCallback((userId: string, action: 'pass' | 'like' | 'challenge') => {
    console.log(`Action: ${action} on user ${userId}`);
    
    if (action === 'challenge') {
      // Challenge doesn't swipe, just logs for now
      alert(`Challenge sent to ${userId}! Game Engine Agent spinning up...`);
      return;
    }

    // Trigger swipe animation
    setExitDirection(action === 'like' ? 'right' : 'left');
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDragX(0);
      setExitDirection(null);
    }, 300);
  }, []);

  // Mouse & Touch Event Handlers
  const onDragStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
    setDragX(0);
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    const currentX = clientX - startX;
    setDragX(currentX);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100; // pixels required to trigger a swipe
    if (dragX > threshold) {
      handleAction(filteredMatches[currentIndex].id, 'like');
    } else if (dragX < -threshold) {
      handleAction(filteredMatches[currentIndex].id, 'pass');
    } else {
      // Snap back
      setDragX(0);
    }
  };

  // Dynamic styles for the swiping card
  const getCardStyle = () => {
    if (exitDirection === 'right') {
      return { transform: `translateX(1000px) rotate(30deg)`, transition: 'transform 0.3s ease-out' };
    }
    if (exitDirection === 'left') {
      return { transform: `translateX(-1000px) rotate(-30deg)`, transition: 'transform 0.3s ease-out' };
    }
    return {
      transform: `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease-out'
    };
  };

  if (currentIndex >= filteredMatches.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="relative mb-8">
          <Radar size={64} className="text-neon-purple animate-spin-slow opacity-50" />
          <div className="absolute inset-0 bg-neon-purple/20 blur-xl rounded-full animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No more players found</h2>
        <p className="text-gray-400 max-w-md">
          {selectedRank 
            ? `We couldn't find more players with the rank "${selectedRank}". Try changing your filters.`
            : `We're scanning the servers for more matches based on your skill level and genre preferences.`}
        </p>
        <button 
          onClick={() => { setSelectedRank(null); setCurrentIndex(0); }}
          className="mt-8 text-neon-purple hover:text-neon-light underline underline-offset-4 font-mono text-sm"
        >
          Reset Filters & Demo
        </button>
      </div>
    );
  }

  const currentUser = filteredMatches[currentIndex];
  const nextUser = filteredMatches[currentIndex + 1];

  return (
    <div className="flex flex-col items-center h-full p-4 pt-8 overflow-hidden">
      
      {/* Header & Rank Filter */}
      <div className="w-full max-w-md mb-4 z-20">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
            Matchmaking
          </h1>
          <span className="text-xs font-mono text-gray-500">
            {currentIndex + 1} / {filteredMatches.length} Online
          </span>
        </div>
        
        {/* Rank Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <Filter size={16} className="text-neon-purple flex-shrink-0" />
          <button
            onClick={() => setSelectedRank(null)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-mono transition-all ${
              selectedRank === null 
                ? 'bg-neon-purple text-white shadow-neon' 
                : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-neon-purple/50'
            }`}
          >
            All Ranks
          </button>
          {allRanks.map(rank => (
            <button
              key={rank}
              onClick={() => setSelectedRank(rank)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                selectedRank === rank 
                  ? 'bg-neon-purple text-white shadow-neon' 
                  : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-neon-purple/50'
              }`}
            >
              {rank}
            </button>
          ))}
        </div>
      </div>
      
      {/* Card Stack Container */}
      <div className="relative w-full max-w-md h-[600px] mt-2">
        
        {/* Next Card (Background) */}
        {nextUser && (
          <div className="absolute inset-0 scale-95 opacity-50 translate-y-4 pointer-events-none transition-all duration-300">
            <MatchCard user={nextUser} />
          </div>
        )}

        {/* Current Card (Foreground - Swipeable) */}
        {currentUser && (
          <div 
            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
            style={getCardStyle()}
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
          >
            <MatchCard 
              user={currentUser} 
              dragX={dragX}
              onPass={(id) => handleAction(id, 'pass')}
              onLike={(id) => handleAction(id, 'like')}
              onChallenge={(id) => handleAction(id, 'challenge')}
            />
          </div>
        )}
      </div>
      
      {/* Swipe Instructions */}
      <div className="mt-6 text-gray-500 text-xs font-mono uppercase tracking-widest flex gap-8 opacity-50">
        <span>&larr; Swipe Pass</span>
        <span>Swipe Like &rarr;</span>
      </div>
    </div>
  );
};
