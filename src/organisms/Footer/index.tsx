'use client';

import React from 'react';
import FooterLogo from '@/atoms/Logo';
import FooterNavigation from '@/molecules/FooterNavigation';
import FooterSocialLinks from '@/molecules/FooterSocialLinks';

const Footer: React.FC = () => {
    return (
        <footer className="bg-surface py-8 px-4 border-t border-border">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and Description */}
                <div>
                    <FooterLogo />
                    <p className="mt-4 text-sm text-textSecondary">
                        Discover and attend amazing events tailored to your interests.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold text-textPrimary mb-4">Quick Links</h3>
                    <FooterNavigation />
                </div>

                {/* Social Media Links */}
                <div>
                    <h3 className="text-lg font-semibold text-textPrimary mb-4">Follow Us</h3>
                    <FooterSocialLinks />
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-textSecondary">
                &copy; {new Date().getFullYear()} Eventify. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
