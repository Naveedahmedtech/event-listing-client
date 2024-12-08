import ProfileSetupPage from "@/templates/(auth)/profileSetupPage/ProfileSetupPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign up",
    description: "Discover a wide variety of events tailored to your interests. From expos to concerts, find and plan your next experience with Eventify Yours.",
};

export default function ProfileSetup() {
    return (
        <ProfileSetupPage />
    );
}
