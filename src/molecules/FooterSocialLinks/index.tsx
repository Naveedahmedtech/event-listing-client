'use client';

import React from 'react';
import FooterSocialIcon from '@/atoms/FooterSocialIcon';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterSocialLinks: React.FC = () => {
    return (
        <div className="flex space-x-4">
            <FooterSocialIcon
                href="https://facebook.com"
                icon={<FaFacebook size={20} />}
                ariaLabel="Facebook"
            />
            <FooterSocialIcon
                href="https://twitter.com"
                icon={<FaTwitter size={20} />}
                ariaLabel="Twitter"
            />
            <FooterSocialIcon
                href="https://instagram.com"
                icon={<FaInstagram size={20} />}
                ariaLabel="Instagram"
            />
        </div>
    );
};

export default FooterSocialLinks;
