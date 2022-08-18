import Link from 'next/link'

function Footer() {
  return (
    <div >
        <div className="grid grid-cols-1 md:grid-cols-2  px-32 py-14 bg-gray-100 text-gray-600">
        <div className="space-y-4 text-xs text-gray-800">
           <h5 className="font-bold">ABOUT</h5>
           <a href="https://photos.app.goo.gl/YiQq2xrx7oBvwwfG9" target="_blank" rel="noreferrer"><p className="buttonFooter">How 3illboard works</p></a>
           {/* <p className="buttonFooter">Newsroom</p>
           <p className="buttonFooter">Investors</p>
           <p className="buttonFooter">Partners</p>
           <p className="buttonFooter">Careers</p> */}
        </div>
        <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Support</h5>
        <Link href='/account/settings/feedback' passHref><p className="buttonFooter">Help Center</p></Link>
           {/* <p className="buttonFooter">Safety Information</p> */}
           
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
            <Link href='/help/privacy' passHref>
                <p className="cursor-pointer hover:text-orange-400 hover:scale-105 transition transform duration-200 ease-out">Privacy .</p>
                </Link>
                <Link href='/help/terms' passHref>
                <p className="cursor-pointer hover:text-orange-400 hover:scale-105 transition transform duration-200 ease-out"> Terms .</p>
                </Link>
                <p className="cursor-pointer hover:text-orange-400 hover:scale-105 transition transform duration-200 ease-out"> Sitemap</p>
                 
            </div>
          </div>
    </div>
  )
}

export default Footer