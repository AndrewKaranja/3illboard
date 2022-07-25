import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const terms = () => {
  return (
    <div className="">
      <Head>
        <title>Terms of Service</title>
        <meta name="description" content="Our privacy policy" />
        <link rel="icon" href="/3illboardLogoMini.ico" />
      </Head>

      {/* Header */}
      <Header/>
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
  <section className='pt-6'>
   <h2 className='text-4xl font-semibold pb-5'>Terms of Service</h2>
   <div>
       <h4 className='text-xl text-black font-bold m-2'>Thank you for using 3illboard!</h4>
       <p className='m-5'>These Terms of Service (“Terms”) are a binding legal agreement between you and 3illboard that govern your right to use the websites, applications, and other offerings from 3illboard (collectively, the “3illboard Platform”). When used in these Terms, “3illboard,” “we,” “us,” or “our” refers to the 3illboard entity set out on Schedule 1 with whom you are contracting.

The 3illboard Platform offers an online venue that enables users (“Members”) to publish, offer, search for, and book services. Members who publish and offer services are “Listers” and Members who search for, book, or use services are “Clients.” Listers offer accommodations (“Accommodations”), activities, excursions, and events (“Experiences”), and a variety of travel and other services (collectively, “Lister Services,” and each Lister Service offering, a “Listing”). You must register an account to access and use many features of the 3illboard Platform, and must keep your account information accurate. As the provider of the 3illboard Platform, 3illboard does not own, control, offer or manage any Listings or Lister Services. 3illboard is not a party to the contracts entered into directly between Listers and Guests, nor is 3illboard a real estate broker, travel agency, or insurer. 3illboard is not acting as an agent in any capacity for any Member, except as specified in the Payments Terms of Service (“Payment Terms”). To learn more about 3illboard’s role see Section 16.

We maintain other terms and policies that supplement these Terms like our Privacy Policy, which describes our collection and use of personal data, and our Payments Terms, which govern any payment services provided to Members by the 3illboard payment entities (collectively &quot;3illboard Payments&quot;).

If you are a Lister, you are responsible for understanding and complying with all laws, rules, regulations and contracts with third parties that apply to your Lister Services.</p>
         </div> 
   </section>
   </main>
   <Footer/>
      </div>
  )
}

export default terms