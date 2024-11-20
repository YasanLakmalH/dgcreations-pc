import React from 'react'
import dynamic from 'next/dynamic';
import animationData from '@/public/animations/design.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function DesignBanner() {
  return (

    <section className='grid grid-cols-2 bg-black rounded-br-full max-h-screen'>
      <div className="grid relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 ">
        <div className=" text-left">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl text-left">
            Select Your
            <strong className='text-white'> Preferences</strong><br />
            Customize<br />
            <strong className="text-white">Order</strong>
          </h1>
          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="design"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:bg-white focus:outline-none focus:ring  sm:w-auto"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className='grid w-3/4 h-full'>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </section>
  )
}
