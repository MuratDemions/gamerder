import React, { useState } from 'react';
import { ViewState } from './types';
import { DiscoveryView } from './views/DiscoveryView';
import { ProfileView } from './views/ProfileView';
import { ArchitectureView } from './views/ArchitectureView';
import { Gamepad2, UserCircle, Code2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('discover');

  return (
    <div className="min-h-screen bg-pitch-black text-white font-sans selection:bg-neon-purple selection:text-white flex flex-col">
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Ambient Background Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {currentView === 'discover' && <DiscoveryView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'architecture' && <ArchitectureView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-black/90 backdrop-blur-md border-t border-gray-800 z-50 pb-safe">
        <div className="max-w-md mx-auto flex justify-around items-center p-4">
          <NavItem 
            icon={<Gamepad2 size={24} />} 
            label="Match" 
            isActive={currentView === 'discover'} 
            onClick={() => setCurrentView('discover')} 
          />
          <NavItem 
            icon={<Code2 size={24} />} 
            label="Architecture" 
            isActive={currentView === 'architecture'} 
            onClick={() => setCurrentView('architecture')} 
          />
          <NavItem 
            icon={<UserCircle size={24} />} 
            label="Profile" 
            isActive={currentView === 'profile'} 
            onClick={() => setCurrentView('profile')} 
          />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
        isActive 
          ? 'text-neon-light drop-shadow-[0_0_8px_rgba(191,0,255,0.8)] scale-110' 
          : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {icon}
      <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
      {/* Active Indicator Dot */}
      <div className={`w-1 h-1 rounded-full mt-1 transition-all duration-300 ${isActive ? 'bg-neon-purple shadow-neon' : 'bg-transparent'}`} />
    </button>
  );
};

export default App;
