// Import necessary dependencies
import { ENV } from "@/constants";
import EventDetailPage from "@/templates/eventDetails";
import { Metadata } from "next";

// Metadata for the page
export const metadata: Metadata = {
    title: "Explore Event Details - Eventify Yours",
    description: "Explore detailed information about various events, including venue, schedule, and more.",
};

// Server action to fetch event data based on the event ID
async function fetchEventData(eventId: string) {
    const res = await fetch(`https://api.predicthq.com/v1/events?id=${eventId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${ENV.PREDICTHQ_API_ACCESS_TOKEN}`, // Replace with your actual API key
        },
    });

    if (!res.ok) {
        throw new Error('Event not found');
    }

    const data = await res.json();
    return data?.results?.[0];
}

// The main component that renders the event details
const EventPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params; // Extract the event ID from the URL params
    
    try {
        const event = await fetchEventData(id); // Fetch the event data
        return (
            <div className="container mx-auto px-4 py-8">
                <EventDetailPage event={event} />
            </div>
        );
    } catch (error:any) {
        console.log("API ERROR: ",error);
        return (
            <div className="container mx-auto px-4 py-8">
                <h1>Event not found or there was an error fetching data</h1>
            </div>
        );
    }
};

export default EventPage;
