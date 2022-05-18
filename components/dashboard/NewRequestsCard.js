import React from 'react'
import Avatar from 'react-avatar'

function NewRequestsCard() {
  return (
    <div className='bg-white shadow-lg rounded-sm border border-slate-200'>
        <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">New Requests</h2>
      </header>
      <div className='flex flex-row p-2'>
      <Avatar size="40" round={true} />
          <div>
              <h4 className='font-bold'>Test Client</h4>
              <p className='text-sm'>testclient@gmail.com</p>
          </div>
          <div className='text-sm'>A beautiful billboard in ngong</div>
          <div><h4>24 July-30 Sept</h4></div>
          <button className='bg-[#fab038] text-white font-semibold rounded'>Respond</button>

      </div>
    </div>
  )
}

export default NewRequestsCard