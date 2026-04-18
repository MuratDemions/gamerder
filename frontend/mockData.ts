import { User } from './types';

export const currentUser: User = {
  id: 'u1',
  username: 'NeonNinja',
  bio: 'Looking for a duo partner who can keep up. I main support but can carry if needed.',
  avatarUrl: 'https://picsum.photos/seed/neon1/400/400',
  preferredGenres: ['MOBA', 'FPS', 'Indie'],
  stats: [
    { gameName: 'Valorant', genre: 'FPS', score: 2450, rank: 'Ascendant' },
    { gameName: 'League of Legends', genre: 'MOBA', score: 1800, rank: 'Platinum' },
    { gameName: 'Hollow Knight', genre: 'Indie', score: 112, rank: 'Completionist' }
  ]
};

export const potentialMatches: User[] = [
  {
    id: 'u2',
    username: 'CyberValkyrie',
    bio: 'Headshots and heartbreaks. Let\'s 1v1 before we date.',
    avatarUrl: 'https://picsum.photos/seed/cyber2/400/400',
    preferredGenres: ['FPS', 'Strategy'],
    stats: [
      { gameName: 'Valorant', genre: 'FPS', score: 2500, rank: 'Ascendant' },
      { gameName: 'CS:GO', genre: 'FPS', score: 15000, rank: 'Global Elite' }
    ],
    matchScore: 94,
    isSoulmate: true
  },
  {
    id: 'u3',
    username: 'PixelPaladin',
    bio: 'RPG enthusiast. I read all the lore so you don\'t have to.',
    avatarUrl: 'https://picsum.photos/seed/pixel3/400/400',
    preferredGenres: ['RPG', 'Indie'],
    stats: [
      { gameName: 'Elden Ring', genre: 'RPG', score: 500, rank: 'Elden Lord' },
      { gameName: 'Stardew Valley', genre: 'Indie', score: 100, rank: 'Farmer' }
    ],
    matchScore: 45,
    isSoulmate: false
  },
  {
    id: 'u4',
    username: 'GankMaster',
    bio: 'If you don\'t ward, don\'t swipe right.',
    avatarUrl: 'https://picsum.photos/seed/gank4/400/400',
    preferredGenres: ['MOBA', 'Fighting'],
    stats: [
      { gameName: 'League of Legends', genre: 'MOBA', score: 1850, rank: 'Platinum' },
      { gameName: 'Tekken 8', genre: 'Fighting', score: 120000, rank: 'Tekken King' }
    ],
    matchScore: 88,
    isSoulmate: false
  },
  {
    id: 'u5',
    username: 'AimBot_Anna',
    bio: 'Radiant in game, radiant in real life. Need a pocket sage.',
    avatarUrl: 'https://picsum.photos/seed/anna5/400/400',
    preferredGenres: ['FPS'],
    stats: [
      { gameName: 'Valorant', genre: 'FPS', score: 3200, rank: 'Radiant' },
      { gameName: 'Apex Legends', genre: 'FPS', score: 9500, rank: 'Predator' }
    ],
    matchScore: 72,
    isSoulmate: false
  },
  {
    id: 'u6',
    username: 'ComboBreaker',
    bio: 'I will frame trap your heart. Local tournament champion.',
    avatarUrl: 'https://picsum.photos/seed/combo6/400/400',
    preferredGenres: ['Fighting', 'Indie'],
    stats: [
      { gameName: 'Street Fighter 6', genre: 'Fighting', score: 1500, rank: 'Master' },
      { gameName: 'Guilty Gear Strive', genre: 'Fighting', score: 1000, rank: 'Celestial' }
    ],
    matchScore: 60,
    isSoulmate: false
  }
];
