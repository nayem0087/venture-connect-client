import { getAllStartups } from '@/lib/api/startup';
import React from 'react';

const MyStartupPage = async () => {
  const startups = await getAllStartups();
  console.log('Total startups found:', startups.length);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Startups</h2>
      <p className='text-gray-500 mb-6'>Create and manage your startup profile.</p>
      
      {/* কার্ডগুলোর জন্য একটি গ্রিড লেআউট ব্যবহার করা ভালো */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          // মেইন ডিভ-এ key প্রপটি বসানো হয়েছে
          <div key={startup._id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
            <div className="flex">
              {/* <img src="/placeholder-logo.png" alt="logo" className="w-12 h-12 rounded-full" /> */}
              <h3 className="text-xl font-bold text-white">{startup.name}</h3>
              </div>
              <div>
                <div className="flex gap-2 mt-1">
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">{startup.industry}</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{startup.funding}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">approved</span>
                </div>
              </div>
            <p className="text-gray-600 text-sm mb-4">{startup.description}</p>

            {/* Edit and Delete Buttons */}
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600">Edit</button>
              <button className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStartupPage;