

function Footer() {
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-10 px-32 py-14 bg-gray-100 text-gray-600">
        <div className="space-y-4 text-xs text-gray-800">
           <h5 className="font-bold">ABOUT</h5>
           <p className="cursor-pointer hover:text-[#FAB038]">How 3illboard works</p>
           <p className="cursor-pointer hover:text-orange-400">Newsroom</p>
           <p className="cursor-pointer hover:text-orange-400">Investors</p>
           <p className="cursor-pointer hover:text-orange-400">Partners</p>
           <p className="cursor-pointer hover:text-orange-400">Careers</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Support</h5>
           <p className="cursor-pointer hover:text-orange-400">Help Center</p>
           <p className="cursor-pointer hover:text-orange-400">Safety Information</p>
           
        </div>
        </div>
        
        
        <div className="text-center p-2 bg-gray-200">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <a
                href=""
                className="hover:text-orange-400 hover:scale-150 transition transform duration-200 ease-out"
              >
                3illboard
              </a>
              , All right reserved
            </p>
            <div className="flex justify-center p-2">
                <p className="cursor-pointer hover:text-orange-400 hover:scale-105 transition transform duration-200 ease-out">Privacy .</p>
                <p className="cursor-pointer hover:text-orange-400 hover:scale-105 transition transform duration-200 ease-out"> Terms .</p>
                <p className="cursor-pointer hover:text-orange-400 hover:scale-105 transition transform duration-200 ease-out"> Sitemap</p>
                 
            </div>
          </div>
    </div>
  )
}

export default Footer