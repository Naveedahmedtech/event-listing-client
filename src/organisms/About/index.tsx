// src/organisms/AboutPage.tsx
import React from 'react';
import AboutSection from '@/molecules/AboutSection';
import ContactCTA from '@/molecules/ContactCTA';

const AboutPage: React.FC = () => {
  const handleContactClick = () => {
    alert('Contact Us page will be implemented.');
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-textPrimary">About Eventify Yours</h1>
        <p className="mt-4 text-lg text-textSecondary max-w-4xl mx-auto">
          Discover, organize, and plan amazing events tailored to your preferences. We help you experience events that matter to you.
        </p>
      </div>

      {/* About Sections */}
      <section className="space-y-20">
        {/* About Eventify Yours */}
        <AboutSection
          title="About Eventify Yours"
          content="Eventify Yours helps you discover, organize, and plan amazing events tailored to your preferences. From expos to concerts, we bring the best events to you. Our platform provides personalized recommendations based on your location, interests, and event trends, ensuring that you never miss out on exciting events."
        />

        {/* Our Mission */}
        <AboutSection
          title="Our Mission"
          content="Our mission is to revolutionize how people discover and experience events. We believe experiences shape lives, and we strive to connect you with events that will inspire, entertain, and bring communities together."
        />

        {/* Our Team */}
        <AboutSection
          title="Our Team"
          content="Eventify Yours is built by a passionate team of event enthusiasts, tech innovators, and problem solvers. We work hard to ensure our platform delivers the best event recommendations suited for all types of interests and budgets."
        />

        {/* Why Choose Us */}
        <AboutSection
          title="Why Choose Us?"
          content="We offer personalized event recommendations based on your preferences, location, and interests. Whether you're looking for a music festival, a conference, or a local gathering, our easy-to-use platform helps you discover events near you and around the world."
        />
      </section>

      {/* Contact CTA */}
      <div className="mt-16">
        <ContactCTA onContactClick={handleContactClick} />
      </div>
    </div>
  );
};

export default AboutPage;
