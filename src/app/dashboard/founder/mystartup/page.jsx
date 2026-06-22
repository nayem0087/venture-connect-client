import { getAllStartups } from '@/lib/api/startup';


const MyStartupPage = async () => {
  const startups = await getAllStartups();

  return (
    <div className="p-4 md:p-10 min-h-screen w-full text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold">My Startups</h2>
        <p className='text-gray-500 mt-1 mb-6'>View your startup application.</p>
        
        <div className="grid grid-cols-1 gap-6">
          {startups.map((startup) => (
            <div 
              key={startup._id} 
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl hover:border-gray-700 transition-all"
            >
              {/* Header: Logo, Title, and Action Buttons (Responsive) */}
              <div className="flex items-start justify-center gap-6 mb-4">
                {/* Logo */}
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold truncate">{startup.name}</h3>
                  <div className="flex flex-wrap md:gap-6 gap-4 mt-2">
                    <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium">{startup.industry}</span>
                    <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium">{startup.funding}</span>
                    <span className="bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border text-center border-green-800">{startup.status}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {startup.description}
              </p>

              <div className="flex gap-2 w-full pt-4 border-t border-gray-800">
                <button className="flex-1 bg-gray-800 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-semibold transition">
                  Edit
                </button>
                <button className="flex-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 py-2 rounded-lg text-sm font-semibold transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStartupPage;