import React from 'react';
import { Server, Database, Bot, Code, ListTodo } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 space-y-12">
      <div className="border-b border-neon-purple/30 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(191,0,255,0.5)]">
          System Architecture
        </h1>
        <p className="text-gray-400">Project Neon Match - Technical Blueprint & Agent Workflow</p>
      </div>

      {/* 1. Agent Configuration */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neon-light flex items-center gap-3">
          <Bot className="text-neon-purple" />
          1. Multi-Agent System Workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AgentCard 
            title="Matchmaking Agent"
            role="Filter & Score"
            desc="Calculates Skill-Based Matchmaking (SBMM) scores. Compares UserStats vectors and GenrePreferences to find 'Soulmates'."
            color="border-blue-500"
          />
          <AgentCard 
            title="Game Engine Agent"
            role="Validation & Logic"
            desc="Handles the 'Challenge' phase. Validates mini-game scores, prevents cheating, and updates UserStats post-match."
            color="border-green-500"
          />
          <AgentCard 
            title="UI/UX Agent"
            role="Presentation"
            desc="Ensures strict adherence to the Pitch Black (#050505) and Electric Neon Purple (#BF00FF) aesthetic across all components."
            color="border-neon-purple"
          />
        </div>
        <div className="bg-pitch-gray p-4 rounded-lg border border-gray-800">
          <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Workflow</h3>
          <p className="text-sm text-gray-400 font-mono leading-relaxed">
            User Action -&gt; UI/UX Agent (Formats Request) -&gt; Matchmaking Agent (Queries DB, Calculates SBMM) -&gt; Returns Candidates.<br/>
            If Challenge Initiated -&gt; Game Engine Agent (Spins up instance, monitors score) -&gt; Updates DB -&gt; Matchmaking Agent (Recalculates).
          </p>
        </div>
      </section>

      {/* 2. Technical Architecture (Python OOP) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neon-light flex items-center gap-3">
          <Code className="text-neon-purple" />
          2. Python Backend Architecture (OOP)
        </h2>
        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden">
          <div className="bg-gray-900 px-4 py-2 border-b border-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-gray-500 font-mono">core_models.py</span>
          </div>
          <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
            <code dangerouslySetInnerHTML={{ __html: pythonCodeSnippet }} />
          </pre>
        </div>

        {/* Database Schema */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Database size={20} className="text-neon-purple" />
            Database Schema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DbTable 
              name="UserStats" 
              fields={['user_id (FK)', 'game_id', 'high_score', 'rank_tier', 'play_time_hours']} 
            />
            <DbTable 
              name="GenrePreferences" 
              fields={['user_id (FK)', 'genre_name', 'weight_preference (0-1)']} 
            />
            <DbTable 
              name="MatchHistory" 
              fields={['match_id (PK)', 'challenger_id', 'defender_id', 'game_id', 'winner_id', 'timestamp']} 
            />
          </div>
        </div>
      </section>

      {/* 3. Matchmaking Logic */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neon-light flex items-center gap-3">
          <Server className="text-neon-purple" />
          3. Eşleşme Algoritması (SBMM & Soulmate)
        </h2>
        <div className="bg-pitch-gray p-6 rounded-lg border border-neon-purple/30 shadow-[inset_0_0_20px_rgba(191,0,255,0.05)]">
          <p className="text-gray-300 mb-4 leading-relaxed">
            The algorithm uses a weighted Euclidean distance calculation between two users' normalized score vectors within shared genres.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
            <li><strong className="text-neon-light">Base Filter:</strong> Must share at least 1 preferred genre.</li>
            <li><strong className="text-neon-light">Skill Delta:</strong> Calculate difference in normalized high scores for shared games.</li>
            <li><strong className="text-neon-light">Soulmate Trigger:</strong> If Skill Delta &lt; 5% AND shared genres &gt;= 3, flag as <span className="text-neon-purple font-bold animate-pulse">SOULMATE</span>.</li>
          </ul>
        </div>
      </section>

      {/* 4. MVP Backlog */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neon-light flex items-center gap-3">
          <ListTodo className="text-neon-purple" />
          4. İlk Adım (MVP Backlog)
        </h2>
        <div className="bg-black border border-gray-800 rounded-lg p-1">
          <BacklogItem status="done" text="Define Pitch Black & Neon Purple UI/UX guidelines." />
          <BacklogItem status="done" text="Create React frontend prototype (Discovery, Profile, Architecture views)." />
          <BacklogItem status="todo" text="Implement Python FastAPI backend skeleton." />
          <BacklogItem status="todo" text="Setup PostgreSQL DB with UserStats, GenrePreferences schemas." />
          <BacklogItem status="todo" text="Develop Matchmaking Agent logic (Basic Euclidean distance)." />
          <BacklogItem status="todo" text="Integrate one simple mini-game (e.g., Reaction Time Test) for the 'Challenge' feature." />
        </div>
      </section>
    </div>
  );
};

// Helper Components for Architecture View

const AgentCard = ({ title, role, desc, color }: { title: string, role: string, desc: string, color: string }) => (
  <div className={`bg-black p-5 rounded-xl border-t-4 ${color} border-x border-b border-gray-800 shadow-lg`}>
    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-3">{role}</span>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

const DbTable = ({ name, fields }: { name: string, fields: string[] }) => (
  <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
    <div className="bg-gray-800 px-3 py-2 font-bold text-neon-light text-sm border-b border-gray-700">
      {name}
    </div>
    <ul className="p-3 space-y-1">
      {fields.map((f, i) => (
        <li key={i} className="text-xs font-mono text-gray-400 flex items-center gap-2">
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

const BacklogItem = ({ status, text }: { status: 'done' | 'todo', text: string }) => (
  <div className="flex items-start gap-3 p-3 border-b border-gray-900 last:border-0 hover:bg-gray-900/50 transition-colors">
    <div className={`mt-1 w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center ${status === 'done' ? 'bg-neon-purple border-neon-purple' : 'border-gray-600'}`}>
      {status === 'done' && <span className="text-black text-[10px] font-bold">✓</span>}
    </div>
    <span className={`text-sm ${status === 'done' ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
      {text}
    </span>
  </div>
);

const pythonCodeSnippet = `
<span class="text-purple-400">from</span> typing <span class="text-purple-400">import</span> List, Dict
<span class="text-purple-400">from</span> abc <span class="text-purple-400">import</span> ABC, abstractmethod

<span class="text-gray-500"># Base Entity</span>
<span class="text-blue-400">class</span> <span class="text-yellow-300">BaseModel</span>(ABC):
    <span class="text-blue-400">def</span> <span class="text-yellow-200">__init__</span>(self, id: str):
        self.id = id

<span class="text-gray-500"># User Class inheriting from BaseModel</span>
<span class="text-blue-400">class</span> <span class="text-yellow-300">User</span>(BaseModel):
    <span class="text-blue-400">def</span> <span class="text-yellow-200">__init__</span>(self, id: str, username: str):
        <span class="text-blue-400">super</span>().__init__(id)
        self.username = username
        self.stats: Dict[str, int] = {} <span class="text-gray-500"># game_id -> score</span>
        self.genres: List[str] = []

    <span class="text-blue-400">def</span> <span class="text-yellow-200">update_score</span>(self, game_id: str, score: int):
        self.stats[game_id] = <span class="text-blue-400">max</span>(self.stats.get(game_id, 0), score)

<span class="text-gray-500"># Matchmaking Agent Logic</span>
<span class="text-blue-400">class</span> <span class="text-yellow-300">MatchmakingAgent</span>:
    <span class="text-blue-400">def</span> <span class="text-yellow-200">calculate_sbmm</span>(self, user_a: User, user_b: User) -> float:
        <span class="text-gray-500"># Simplified Euclidean distance logic</span>
        shared_games = <span class="text-blue-400">set</span>(user_a.stats.keys()).intersection(<span class="text-blue-400">set</span>(user_b.stats.keys()))
        <span class="text-purple-400">if not</span> shared_games:
            <span class="text-purple-400">return</span> 0.0
            
        score_diff = 0
        <span class="text-purple-400">for</span> game <span class="text-purple-400">in</span> shared_games:
            score_diff += <span class="text-blue-400">abs</span>(user_a.stats[game] - user_b.stats[game])
            
        <span class="text-gray-500"># Lower diff = higher match percentage</span>
        <span class="text-purple-400">return</span> <span class="text-blue-400">max</span>(0, 100 - (score_diff * 0.1))
`;
