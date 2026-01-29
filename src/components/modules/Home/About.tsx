/* eslint-disable react/no-unescaped-entities */
import img from '../../../../public/png3.png'
import Image from 'next/image';
import GlowButton from '@/components/shared/GlowButton';
import GlowEffect from '@/components/shared/GlowEffect';


const About = () => {
    return (
        <div className='section max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center py-24 gap-10 2xl:gap-20 relative'>

            <GlowEffect />
            {/* <div className="absolute w-[550px] h-[300px] rounded-full bg-gradient to-transparent opacity-20 left-0 -top-60 blur-[120px] overflow-hidden"></div> */}

            <div className='relative dark:bg-none bg-background py-4 md:py-8 shadow-2xl rounded-2xl w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-none'>
                <div className='bg-secondery mx-auto rounded-2xl'>
                    <Image 
                        className='mx-auto w-full h-auto' 
                        src={img} 
                        alt="Yeamin Foysal" 
                        priority
                    />
                </div>
            </div>
            
            <div className='px-4 md:px-0'>
                <p className='color-main uppercase font-secondery text-sm md:text-base'>
                    Visit my portfolio & Hire me
                </p>
                <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-[700] main-txt mt-2'>
                    About Me
                </h2>
                <p className='leading-[1.9] color-desc mb-6 text-sm md:text-base'>
                    Hi, I'm Yeamn Foysal from Tangail, now living in Dhaka, Bangladesh. I'm an undergraduate student in Computer Science and Engineering with a deep passion for programming.
                </p>
                <p className='leading-[1.9] color-desc mb-6 text-sm md:text-base'>
                    I started learning to code at an early age and love exploring new programming languages in my free time. When I'm not coding, I enjoy traveling and discovering new places, which keeps me inspired and refreshed.
                </p>
                <p className='leading-[1.9] color-desc text-sm md:text-base'>
                    With a mix of curiosity and determination, I'm always eager to grow and make an impact in the world of technology.
                </p>
                <div className='mt-8 md:mt-16'>
                    <GlowButton href={'https://drive.google.com/file/d/10OHfCrpRPlkzlYazOIU3FGg4YVSreJb4/view?usp=sharing'}>
                        DOWNLOAD MY CV
                    </GlowButton>
                </div>
            </div>
        </div>
    );
};

export default About;