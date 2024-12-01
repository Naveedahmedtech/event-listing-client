'use client';
import React from 'react';
import Heading from '@/atoms/Text/Heading';
import Link from 'next/link';

const CallToAction: React.FC = () => {
    return (
        <section className="bg-background text-text py-16 px-8 rounded-lg shadow-lg mt-12 relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-accent rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent-hover rounded-full opacity-20 animate-pulse"></div>

            {/* Content */}
            <div className="relative z-10">
                <Heading size="large" className="text-text mb-6">
                    Personalize Your Event Experience
                </Heading>
                <p className="mb-8 text-textPrimary-light text-lg">
                    Sign up to discover events tailored just for you, save your favorites, and get exclusive updates.
                </p>
                <Link
                    href={'/signup'}
                    className="bg-primary rounded-xl px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl"
                >
                    Sign Up Now
                </Link>
            </div>
        </section>
    );
};

export default CallToAction;
