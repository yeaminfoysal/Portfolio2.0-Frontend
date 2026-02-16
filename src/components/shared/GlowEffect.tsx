import React from 'react'

const GlowEffect = ({
  className = "w-[300px] h-[500px] sm:w-[500px] sm:h-[500px] lg:w-[750px] lg:h-[800px]"
}) => {
  return (
    <div className={` ${className} absolute rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[80px] sm:blur-[120px] lg:blur-[160px] overflow-hidden`}></div>
  )
}

export default GlowEffect