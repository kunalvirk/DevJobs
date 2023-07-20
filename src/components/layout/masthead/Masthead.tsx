import Image from 'next/image';
import React from 'react';
import illustration from "@public/images/hero-illustration.png";

const Masthead: React.FC<{title?: string}> = ({title}) => {
  return (
    <>
        <section className="entry-content relative">
          {/* Gradient */}
          <div
            className="w-full top-0 bottom-0 -z-20 absolute"
            style={{
              backgroundImage:
                "linear-gradient(to bottom,var(--tw-gradient-stops))",
            }}
          >
            <div className="gradient-img">
              <Image src={illustration.src} alt="" fill sizes="100vw" />
            </div>
          </div>

          <div className={`container mx-auto pt-40 ${!title ? 'pb-28' : ''}`}>
            <div className={`entry-content font-inter ${title ? 'max-w-full text-center' : 'max-w-xl'}`}>
              <h1 className={`${title ? 'text-5xl' : 'text-6xl'} font-extrabold leading-tight mb-6`}>
                {title ? title : "Discover the finest tech startups in the industry"}
              </h1>

            {!title ? <p className="text-gray-600">
              where developers from around the globe share remote job opportunities within their own companies.
              </p> : ''}

              
            </div>
          </div>
        </section>
    </>
  )
}

export default Masthead