import { Metadata } from "next";
import SigninPage from "@/templates/(auth)/signin/SigninPage";

export const metadata: Metadata = {
    title: "Sign In - Eventify Yours",
    description: "Access your Eventify Yours account to explore and manage your events. Sign in to unlock personalized recommendations and event planning tools.",
};

export default function Signin() {
    return (
        <SigninPage />
    );
}
