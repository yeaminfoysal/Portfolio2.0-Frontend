import Link from 'next/link';
import img from '../../../../public/png3.png'
import Image from 'next/image';
import GlowButton from '@/components/shared/GlowButton';


const About = () => {
    return (
        <div id='about' className='section w-[95%] lg:w-[80%] 2xl:max-w-[1492px] mx-auto flex flex-col lg:flex-row  justify-between items-center py-24 gap-10 2xl:gap-20'>
            <div className='p-8 shadow-2xl rounded-2xl '>
                <div className='bg-secondery mx-auto rounded-2xl relative'>
                     <div className="absolute w-[550px] h-[300px] rounded-full bg-gradient to-transparent opacity-20 left-0 -top-66 blur-[120px] overflow-hidden"></div>
                    <Image className=' mx-auto ' src={img} alt="" />
                </div>
            </div>
            <div className=''>
                <p className='color-main uppercase font-secondery'>
                    Visit my portfolio & Hire me</p>
                <h2 className='text-[60px] font-[700] main-txt'>About Me</h2>
                <p className=' leading-[1.9] color-desc mb-6'>
                    Hi, I’m Yeamn Foysal from Tangail, now living in Dhaka, Bangladesh. I’m an undergraduate student in Computer Science and Engineering with a deep passion for programming.
                </p>
                <p className=' leading-[1.9] color-desc  mb-6'>
                    I started learning to code at an early age and love exploring new programming languages in my free time. When I’m not coding, I enjoy traveling and discovering new places, which keeps me inspired and refreshed.
                </p>
                <p className=' leading-[1.9] color-desc'>
                    With a mix of curiosity and determination, I’m always eager to grow and make an impact in the world of technology.
                </p>
                <div className='mt-16'>
                    <GlowButton href={'https://drive.google.com/file/d/10OHfCrpRPlkzlYazOIU3FGg4YVSreJb4/view?usp=sharing'}>
                        DOWNLOAD MY CV
                    </GlowButton>
                </div>
            </div>
        </div>
    );
};

export default About;