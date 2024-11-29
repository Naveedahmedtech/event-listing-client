'use client';
import React from 'react';
import Button from '@/atoms/Button';
import Heading from '@/atoms/Text/Heading';
import Link from 'next/link';
import { FaSearch, FaUsers, FaRegSmile } from 'react-icons/fa';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-surface text-textPrimary py-12 sm:py-16 lg:py-24 px-6 lg:px-16">
            {/* Content */}
            <div className="relative z-10 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-12 items-center">
                {/* Left Column: Text Content */}
                <div className="text-center lg:text-left space-y-6">
                    <Heading size="large" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary">
                        Discover Events That Inspire
                    </Heading>
                    <p className="text-base sm:text-lg text-textSecondary">
                        Join the community of passionate event-goers. Explore, connect, and make unforgettable memories.
                    </p>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 justify-center lg:justify-start">
                        <Link href="/events" passHref>
                            <Button className="bg-accent hover:bg-accentHover text-white px-8 py-4 font-bold rounded-md shadow-lg transition-transform transform hover:scale-105">
                                Explore Events
                            </Button>
                        </Link>
                        <Link href="/signup" passHref>
                            <Button className="bg-accent hover:bg-accentHover text-white px-8 py-4 font-bold rounded-md shadow-lg transition-transform transform hover:scale-105">
                                Sign Up Now
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Features and Visuals */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                        <FaSearch className="text-accent w-10 h-10" />
                        <p className="text-base sm:text-lg text-textPrimary">
                            Discover events tailored to your interests.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaUsers className="text-accent w-10 h-10" />
                        <p className="text-base sm:text-lg text-textPrimary">
                            Connect with like-minded individuals.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaRegSmile className="text-accent w-10 h-10" />
                        <p className="text-base sm:text-lg text-textPrimary">
                            Experience events that create lasting memories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Testimonial/Quote */}
            <div className="relative z-10 container mx-auto text-center mt-16">
                <p className="text-lg sm:text-xl italic text-textSecondary">
                    &quot;The best platform for discovering and attending amazing events. A game-changer for event enthusiasts!&quot;
                </p>
                <p className="mt-4 font-semibold text-textPrimary">
                    — John Doe, Event Enthusiast
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
