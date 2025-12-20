
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-10">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          About <span className="text-orange-500">Travel Planner</span>
        </h1>

        <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto">
          Plan smarter, travel better, and connect with people who share your journey.
        </p>

        {/* Divider */}
        <div className="my-8 h-px bg-gray-200" />

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            🌍 Project Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Travel Planner is a modern travel planning and meetup platform designed to
            help travelers organize trips, explore destinations, and connect with
            like-minded travel buddies. The platform transforms solo journeys into
            shared experiences by enabling users to discover people traveling to
            similar destinations.
          </p>
        </section>

        {/* Mission */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            🎯 Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make travel more social, safe, and enjoyable by helping
            travelers build meaningful connections and plan unforgettable adventures
            together.
          </p>
        </section>

        {/* Features */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            ✨ What You Can Do
          </h2>

          <ul className="grid sm:grid-cols-2 gap-4 text-gray-600">
            {[
              "Create and manage travel plans",
              "Explore trips shared by other travelers",
              "Find compatible travel buddies",
              "Plan meetups and shared adventures",
            ].map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Closing */}
        <section className="mt-10 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you’re planning your next trip or looking for someone to travel
            with, Travel Planner is here to help you explore the world together.
          </p>

          <p className="mt-4 text-orange-500 font-semibold">
            Let’s plan your next adventure 🚀
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
