'use client';
import React from 'react';
import Heading from '@/atoms/Text/Heading';
import Badge from '@/atoms/Badge';
import Button from '@/atoms/Button';
import { format } from 'date-fns';
import Link from 'next/link';

interface EventCardProps {
    id: string;
    title: string;
    date: string;
    location: string;
    category: string;
    labels: string[];
    predictedAttendance?: number;
    venueName: string;
    onAddToCalendar: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    id,
    title,
    date,
    location,
    category,
    labels,
    predictedAttendance,
    venueName,
    onAddToCalendar,
}) => {
    const formattedDate = format(new Date(date), 'MMMM dd, yyyy');

    // Generate the Google Calendar link (you can modify the calendar service as needed)
    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${encodeURIComponent(date)}&details=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}`;

    return (
        <div className="bg-surface p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex flex-col">

            {/* Event Title */}
            <Heading size="medium" className="text-textPrimary mb-4">
                {title}
            </Heading>

            {/* Badges for Important Details */}
            <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="info" className="bg-blue-100 text-blue-800">
                    <strong>Date:</strong> {formattedDate}
                </Badge>
                <Badge variant="info" className="bg-green-100 text-green-800">
                    <strong>Location:</strong> {location}
                </Badge>
                <Badge variant="info" className="bg-purple-100 text-purple-800">
                    <strong>Category:</strong> {category}
                </Badge>
                {venueName && (
                    <Badge variant="info" className="bg-indigo-100 text-indigo-800">
                        <strong>Venue:</strong> {venueName}
                    </Badge>
                )}
                {predictedAttendance && (
                    <Badge variant="info" className="bg-yellow-100 text-yellow-800">
                        <strong>Attendance:</strong> {predictedAttendance.toLocaleString()}
                    </Badge>
                )}
            </div>

            {/* Labels */}
            {labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {labels.map((label, index) => (
                        <Badge key={index} variant="neutral" className="bg-gray-100 text-gray-700">
                            {label}
                        </Badge>
                    ))}
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
                <Button
                    onClick={onAddToCalendar}
                    variant="primary"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    href={googleCalendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Add to Calendar
                </Button>

                <Link
                    href={`events/${id}`}
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg text-center hover:bg-gray-300 transition"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
