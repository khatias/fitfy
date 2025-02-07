import React from 'react'
import Image from "next/image";
import image3 from "../../assets/freepik__adjust__38815.png";
function Hero() {
  return (
    <div>
             <div >
        <Image
        src={image3.src}
        alt="banner"
        width={6000}
        height={3000}
        // fill
        quality={100}
        className="w-full object-contain"
        />
      </div>
    </div>
  )
}

export default Hero