import React from 'react'
import SkillsTabs from './Skills/SkillsTabs'
import MovingSkills from './Skills/MovingSkills'

export default function Skills() {
    return (
        <div className='text-center my-20 relative'>
            <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

            <h2 className="text-4xl md:text-[55px] font-bold main-txt mb-6">
                Skills & Technologies
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
                Technologies I’ve been working with recently to create amazing web experiences.
            </p>
            <SkillsTabs />
            <MovingSkills />
        </div>
    )
}
