import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Search() {
  return (
    <div>
        <Header/>
        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='txt-xs'>200+ Ad spaces available</p>
                <h1 className='text-3xl font-semibold mt-2 mb-6'>Ads in Kakamega</h1>

                <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation Flexiblity</p>
                    <p className='button'>Type of Ad space</p>
                    <p className='button'>Price</p>
                    <p className='button'>More Filters</p>
                </div>


            </section>
        </main>
        <Footer/>
    </div>
  )
}

export default Search