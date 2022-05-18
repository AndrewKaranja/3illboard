import React from 'react'

function ListingsOverviewCard({totalListings}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        <div className="p-3 my-2 bg-white rounded">
            <h4 >Listed Ad spaces</h4>
            <p className="text-xl font-bold">{totalListings}</p>
        </div>
        <div className="p-3 my-2 bg-white rounded">
            <h4>Online enquiries</h4>
            <p className="text-xl font-bold">69</p>
        </div>
        <div className="p-3 my-2 bg-white rounded">
            <h4>Bookings</h4>
            <p className="text-xl font-bold">69</p>
        </div>
        <div className="p-3 my-2 bg-white rounded">
            <h4>Occupancy</h4>
            <p className="text-xl font-bold">69%</p>
        </div>

    </div>
  )
}

export default ListingsOverviewCard