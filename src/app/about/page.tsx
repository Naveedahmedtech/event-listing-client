import { Metadata } from "next";
import AboutPage from "@/templates/aboutPage";

export const metadata: Metadata = {
    title: "Explore All Events - Eventify Yours",
    description: "Discover a wide variety of events tailored to your interests. From expos to concerts, find and plan your next experience with Eventify Yours.",
};

export default function About() {
    return (
        <AboutPage  />
    );
}
