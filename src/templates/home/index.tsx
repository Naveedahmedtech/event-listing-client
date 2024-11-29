'use client';
import React from 'react';
import HeroSection from '@/organisms/HeroSection';
import Heading from '@/atoms/Text/Heading';
import EventsGrid from '@/organisms/EventsGrid';
import CallToAction from '@/organisms/CallToAction';
import { events } from '@/mock';

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <HeroSection />
            <Heading size="large" className="text-center text-textPrimary my-8">
                Upcoming Events
            </Heading>
            <EventsGrid events={events} />
            <CallToAction />
        </div>
    );
};

export default HomePage;
