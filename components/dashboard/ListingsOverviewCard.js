import React from 'react'

function ListingsOverviewCard({totalListings,enquiries,bookings}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        <div className="p-3 my-2 bg-white rounded flex flex-col justify-between">
        <svg className="shrink-0 h-8 w-8" viewBox="0 0 24 24">
                    <path className="fill-current text-indigo-500" d="M0 20h24v2H0z" />
                    <path className="fill-current text-[#fab038]" d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z" />
                  </svg>
                  <div>
                  <h4 className="text-xs font-semibold text-gray-500">Listed Ad spaces</h4> 
            <p className="text-xl font-bold text-gray-700">{totalListings}</p>

                  </div>
            
        </div>
        <div className="p-3 my-2 bg-white rounded flex flex-col justify-between">
        <svg className="shrink-0 h-8 w-8" viewBox="0 0 24 24">
                    <path className="fill-current text-indigo-500" d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                    <path className="fill-current text-[#fab038]" d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                  </svg>
                  <div>
                  <h4 className="text-xs font-semibold text-gray-500">Online enquiries</h4>
            <p className="text-xl font-bold text-gray-700">{enquiries}</p>
            </div>
            
        </div>
        <div className="p-3 my-2 bg-white rounded flex flex-col justify-between">
        <svg className="shrink-0 h-8 w-8" viewBox="0 0 24 24">
                    <path className="fill-current text-indigo-500" d="M1 3h22v20H1z" />
                    <path className="fill-current text-[#fab038]" d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z" />
                  </svg>
                  <div>
                  <h4 className="text-xs font-semibold text-gray-500">Bookings</h4>
                  <p className="text-xl font-bold text-gray-700">{bookings}</p>
                  </div>
                  
        </div>
        <div className="p-3 my-2 bg-white rounded flex flex-col justify-between">
        <svg className="shrink-0 h-8 w-8" viewBox="0 0 24 24">
                            <circle className="fill-current text-slate-400" cx="18.5" cy="5.5" r="4.5" />
                            <circle className="fill-current text-[#fab038]" cx="5.5" cy="5.5" r="4.5" />
                            <circle className="fill-current text-indigo-500" cx="18.5" cy="18.5" r="4.5" />
                            <circle className="fill-current text-slate-400" cx="5.5" cy="18.5" r="4.5" />
                          </svg>
                          <div>
                          <h4 className="text-xs font-semibold text-gray-500">Occupancy</h4>
                          <p className="text-xl font-bold text-gray-700">{Math.round(bookings/totalListings*100)}%</p>

                          </div>
                          
        </div>

    </div>
  )
}

export default ListingsOverviewCard