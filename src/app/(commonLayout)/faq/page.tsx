"use client";
import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is Travel Planner?",
    answer:
      "Travel Planner is a travel planning and meetup platform that helps users organize trips, explore destinations, and connect with compatible travel buddies.",
  },
  {
    question: "Is Travel Planner free to use?",
    answer:
      "You can explore public travel plans for free. Some advanced features such as premium matching and private meetups may require a subscription.",
  },
  {
    question: "How do I find a travel buddy?",
    answer:
      "Create a travel plan with your destination, dates, and preferences. The platform will suggest travelers with similar plans so you can connect and plan together.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes. We take user privacy seriously and use secure authentication and data protection measures to keep your information safe.",
  },
  {
    question: "Can I create and manage multiple travel plans?",
    answer:
      "Absolutely. You can create, edit, and manage multiple travel plans from your dashboard at any time.",
  },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-10">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Frequently Asked <span className="text-orange-500">Questions</span>
        </h1>

        <p className="text-gray-500 text-center mt-3 max-w-2xl mx-auto">
          Find answers to common questions about using Travel Planner.
        </p>

        {/* FAQ List */}
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium hover:bg-gray-50 transition"
              >
                <span>{faq.question}</span>
                <span className="text-orange-500 text-xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQPage;
