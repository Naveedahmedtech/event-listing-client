'use client';
import React from 'react';
import Button from '@/atoms/Button';
import Heading from '@/atoms/Text/Heading';
import Link from 'next/link';
import { FaSearch, FaUsers, FaRegSmile } from 'react-icons/fa'; // React Icons

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-surface text-textPrimary py-24 px-6 lg:px-16">

            {/* Content */}
            <div className="relative z-10 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text Content */}
                <div className="text-center lg:text-left space-y-6">
                    <Heading size="large" className="text-text">
                        Discover Events That Inspire
                    </Heading>
                    <p className="text-lg text-text">
                        Join the community of passionate event-goers. Explore, connect, and make unforgettable memories.
                    </p>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 justify-center lg:justify-start">
                        <Link href="/events" passHref>
                            <Button
                                className="bg-accent hover:bg-accentHover text-text px-8 py-4 font-bold rounded-md shadow-lg transition-transform transform hover:scale-105"
                            >
                                Explore Events
                            </Button>
                        </Link>
                        <Link href="/signup" passHref>
                            <Button
                                className="bg-accent hover:bg-accentHover text-text px-8 py-4 font-bold rounded-md shadow-lg transition-transform transform hover:scale-105"
                            >
                                Sign Up Now
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Features and Visuals */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                        <FaSearch className="text-accent w-10 h-10" />
                        <p className="text-text">
                            Discover events tailored to your interests.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaUsers className="text-accent w-10 h-10" />
                        <p className="text-text">
                            Connect with like-minded individuals.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaRegSmile className="text-accent w-10 h-10" />
                        <p className="text-text">
                            Experience events that create lasting memories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Testimonial/Quote */}
            <div className="relative z-10 container mx-auto text-center mt-16">
                <p className="text-xl italic text-text">
                    &quot;The best platform for discovering and attending amazing events. A game-changer for event enthusiasts!&quot;
                </p>
                <p className="mt-4 font-semibold text-text">
                    — John Doe, Event Enthusiast
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
