import React from 'react'

const GlowEffect = ({className="w-[140px] lg:w-[750px] h-[800px]"}) => {
  return (
    <div className={` ${className} absolute rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden`}></div>
  )
}

export default GlowEffect