import React from 'react';

function RecentCard() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Activity</h2>
      </header>
      <div className="p-3 relative  h-[50vh]">
      <p className='my-auto absolute top-[50%] w-full text-center'>No notifications at the moment</p>


      </div>
    </div>
  );
}

export default RecentCard;

