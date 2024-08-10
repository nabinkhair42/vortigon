
import React from 'react';
import ChatComponent from '@/components/onUse/bot/ChatComponent';
import { ChevronRight, Github } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import AnimatedGradientText from "@/components/ui/AnimatedGradientText";
import RetroGrid from '@/components/ui/retro-grid'


const Landing = () => {
    return (
        <section className="h-screen">
            <ChatComponent />
            <div className="container h-full w-full relative text-center flex flex-col items-center justify-center gap-2">
                <AnimatedGradientText>
                    Discover Our Advanced AI Chatbot : v.1.0.0
                </AnimatedGradientText>

                <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-3xl md:text-5xl leading-[50px] ">
                    Elevate Your Website with  <span className="bg-primary text-white px-2 rounded-md">Vortigon</span>Chatbot

                </h1>

                <p className="max-w-lg mx-auto text-center text-base font-normal leading-7 text-muted-foreground">
                    We build tailored private ChatGPT solutions to seamlessly integrate into your website, providing your clients with personalized, 24/7 support and enhancing user interaction.
                </p>

                <Link href="https://github.com/nabinkhair42" target="_blank" rel="noopener noreferrer">
                    <Button className='flex gap-[2px] py-2 rounded-md px-4 items-center justify-center'>
                        <Github className="mr-2" />
                        GitHub
                    </Button>
                </Link>
                <RetroGrid />
            </div>
        </section>
    );
}

export default Landing;
