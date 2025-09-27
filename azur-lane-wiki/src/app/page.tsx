export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Azur Lane Wiki
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Your comprehensive guide to ships, equipment, and strategies in Azur Lane
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Ships Database</h2>
            <p className="text-slate-300 mb-4">
              Detailed information about every shipgirl, including stats, skills, and tier ratings.
            </p>
            <div className="text-sm text-slate-400">
              • Base and max stats<br/>
              • Skill descriptions<br/>
              • Tier ratings by game mode
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Equipment Guide</h2>
            <p className="text-slate-300 mb-4">
              Complete equipment database with stats, compatibility, and enhancement info.
            </p>
            <div className="text-sm text-slate-400">
              • Equipment stats and effects<br/>
              • Enhancement levels<br/>
              • Ship compatibility
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Build Recommendations</h2>
            <p className="text-slate-300 mb-4">
              Optimized builds for different game modes and strategies.
            </p>
            <div className="text-sm text-slate-400">
              • Campaign builds<br/>
              • PvP strategies<br/>
              • Event recommendations
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Browse Ships
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              View Equipment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
