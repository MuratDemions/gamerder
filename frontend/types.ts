export type GameGenre = 'FPS' | 'RPG' | 'MOBA' | 'Indie' | 'Strategy' | 'Fighting';

export interface GameStats {
  gameName: string;
  genre: GameGenre;
  score: number;
  rank: string;
}

export interface User {
  id: string;
  username: string;
  bio: string;
  avatarUrl: string;
  preferredGenres: GameGenre[];
  stats: GameStats[];
  matchScore?: number; // Calculated SBMM score relative to current user
  isSoulmate?: boolean;
}

export type ViewState = 'discover' | 'profile' | 'architecture';
