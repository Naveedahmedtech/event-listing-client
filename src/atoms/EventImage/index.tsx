import React from 'react';
import Image from 'next/image';

interface EventImageProps {
    src: string;
    alt: string;
}

const EventImage: React.FC<EventImageProps> = ({ src, alt }) => {
    return (
        <div className="w-full h-64 relative rounded-lg overflow-hidden">
            <Image src={src} alt={alt} layout="fill" objectFit="cover" priority />
        </div>
    );
};

export default EventImage;
