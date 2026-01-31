/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import SkillsTabs from './Skills/SkillsTabs'
import MovingSkills from './Skills/MovingSkills'
import GlowEffect from '@/components/shared/GlowEffect'

export default function Skills() {
    return (
        <div className='text-center  py-16 md:py-20 relative max-w-7xl mx-auto'>
            <GlowEffect />
            
            <h2 className="text-3xl md:text-4xl lg:text-[55px] font-bold main-txt mb-4 md:mb-6">
                Skills & Technologies
            </h2>
            <p className="text-gray-400 mb-6 md:mb-10 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Technologies I've been working with recently to create amazing web experiences.
            </p>
            <SkillsTabs />
            <MovingSkills />
        </div>
    )
}