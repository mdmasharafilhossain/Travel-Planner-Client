/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { API_BASE } from '@/lib/baseApi';
import { useEffect, useState } from 'react';
import HomeMatchedTravelers from '@/components/modules/homePage/SuggestedBuddy/HomeMatchedTravelers';
import { TravelPlan } from '@/types/homePage.interface';

export default function HomePage() {
  const { user } = useAuth();
  
   const [upcomingPlans, setUpcomingPlans] = useState<TravelPlan[]>([]);
    const [matchesByPlan, setMatchesByPlan] = useState<Record<string, TravelPlan[]>>({});
    const [loading, setLoading] = useState(true);
useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchMatches();
    
  }, [user]);

  async function fetchMatches() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/user`, {
         credentials: "include",});
      const json = await res.json();
      if (!res.ok || !json.success) {
        console.error(json.message);
      } else {
        setUpcomingPlans(json.upcomingPlans || []);
        setMatchesByPlan(json.matchesByPlan || {});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Travel is better <span className="text-orange-500">together</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 max-w-xl">
              Find travel buddies, create plans, and explore destinations with like-minded
              travelers around the world.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/travel-plans"
                className="px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Find Travel Buddies
              </Link>
              <Link
                href="/explore"
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Explore Plans
              </Link>
            </div>
          </div>

          {/* Right: Travel cards illustration (replaces empty box) */}
          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="relative rounded-3xl bg-white shadow-xl border border-orange-100 p-5">
                <div className="h-40 rounded-2xl bg-linear-to-tr from-orange-400 via-orange-300 to-yellow-200 mb-4" />
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">Bali, Indonesia</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                    3 buddies
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Surf, sunsets and new friends on a 7-day island trip.
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>June · Budget: ৳600</span>
                  <span>Solo · Looking for 2</span>
                </div>
              </div>

              {/* Small floating card top-left */}
              <div className="absolute -top-6 -left-4 w-36 rounded-2xl bg-white shadow-lg border border-gray-100 p-3">
                <p className="text-xs font-semibold text-gray-800">Paris weekend</p>
                <p className="text-[11px] text-gray-500 mt-1">2 buddies matched</p>
              </div>

              {/* Small floating card bottom-right */}
              <div className="absolute -bottom-8 -right-4 w-40 rounded-2xl bg-orange-500 text-white shadow-xl p-3">
                <p className="text-xs font-semibold">2,300+ trips created</p>
                <p className="text-[11px] text-orange-100 mt-1">
                  Join a community of real travelers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {user && (
        
        <HomeMatchedTravelers/>
      )}
{/* How It Works */}
      
      <section className="py-24 bg-linear-to-b from-gray-50 to-white">
  <div className="container mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      How It Works
    </h2>
    <p className="mt-4 text-gray-600">
      Start your journey in just 3 simple steps
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-10 relative">

      {[
        { step: '01', title: 'Sign Up', desc: 'Create your profile and share your travel interests.' },
        { step: '02', title: 'Create Plan', desc: 'Add destination, budget, and travel date.' },
        { step: '03', title: 'Find Buddy', desc: 'Match with travelers going the same way.' },
      ].map((item) => (
        <div
          key={item.step}
          className="group bg-white p-10 rounded-2xl shadow-md 
                     hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
        >
          <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-orange-100 
                          text-orange-600 flex items-center justify-center 
                          text-xl font-extrabold">
            {item.step}
          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            {item.title}
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            {item.desc}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>


      {/* Popular Destination */}
     <section className="py-20 bg-white">
  <div className="container mx-auto px-6">

    {/* Title */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Popular Destinations
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        Discover trips loved by travelers from around the world
      </p>
    </div>

    {/* Destination Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { name: 'Paris', tag: 'City of Love' },
        { name: 'Thailand', tag: 'Beaches & Culture' },
        { name: 'Nepal', tag: 'Mountains & Adventure' },
        { name: 'Turkey', tag: 'History & Food' },
      ].map((place) => (
        <div
          key={place.name}
          className="group relative h-52 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gray-100" />

          {/* Content */}
          <div className="relative z-10 h-full p-5 flex flex-col justify-end">
            <h3 className="text-orange-500 font-extrabold text-2xl">
              {place.name}
            </h3>
            <p className="text-sm text-orange-500 mt-1">
              {place.tag}
            </p>

            <span className="mt-3 inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white text-gray-800 w-fit">
              Explore Trips
            </span>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>




    {/* Why Choose us */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white">
  <div className="container mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-14">
      Why Choose Us
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        'Verified Travelers',
        'Secure Messaging',
        'Smart Matching Algorithm',
      ].map((text) => (
        <div
          key={text}
          className="group bg-white p-10 rounded-2xl shadow-md 
                     hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
        >
          <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-orange-100 
                          text-orange-600 flex items-center justify-center text-xl">
            ✓
          </div>
          <h3 className="font-semibold text-lg text-gray-900">
            {text}
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            Safe, reliable and designed for real travelers.
          </p>
        </div>
      ))}
    </div>

  </div>
</section>


      {/*Success Story  */}
      <section className="py-24 bg-linear-to-b from-white to-gray-50">
  <div className="container mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Success Stories
      </h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Real travelers. Real connections. Real unforgettable journeys.
      </p>
    </div>

    {/* Stories */}
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: "Aisha",
          story:
            "Met an amazing group of travelers — our Cox’s Bazar trip became unforgettable!",
        },
        {
          name: "David",
          story:
            "Planned a Europe backpacking trip with buddies I met here. Best decision ever!",
        },
        {
          name: "Mehnaz",
          story:
            "Found a safe and friendly travel partner for my first solo trip. Highly recommended!",
        },
        {
          name: "Liam",
          story:
            "Joined a group tour through this platform — made friends for life!",
        },
        {
          name: "Sara",
          story:
            "The matching feature helped me find someone with the same travel style. Perfect trip!",
        },
      ].map((item, i) => (
        <div
          key={item.name}
          className="group relative bg-white p-8 rounded-2xl shadow-md 
                     hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          {/* Quote Icon */}
          <div className="absolute -top-6 left-6 w-12 h-12 rounded-full 
                          bg-orange-500 text-white flex items-center 
                          justify-center text-2xl shadow-lg">
            “
          </div>

          {/* Story */}
          <p className="mt-8 text-gray-600 italic leading-relaxed">
            {item.story}
          </p>

          {/* User Info */}
          <div className="mt-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 
                            text-orange-600 flex items-center 
                            justify-center font-bold">
              {item.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">Verified Traveler</p>
            </div>
          </div>
        </div>
      ))}
    </div>

   

  </div>
</section>


      {/*Safety Section  */}
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      Travel With Confidence
    </h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Your safety and trust are our top priorities.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-10">
      {[
        'Profile Verification',
        'Report & Block System',
        'Community Guidelines',
      ].map((item) => (
        <div
          key={item}
          className="group bg-white p-10 rounded-2xl shadow-md 
                     hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
        >
          <div className="mx-auto mb-6 w-14 h-14 rounded-full 
                          bg-green-100 text-green-600 
                          flex items-center justify-center text-xl">
            🛡️
          </div>
          <h3 className="font-semibold text-lg text-gray-900">
            {item}
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            Built to ensure a safe and respectful travel experience.
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
{/* Coummunity Stats */}
<section className="py-24 bg-linear-to-b from-gray-50 to-white">
  <div className="container mx-auto px-6 text-center">

    {/* Section Title */}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      Our Growing Community
    </h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Trusted by thousands of travelers exploring the world together.
    </p>

    {/* Stats */}
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
      {[
        { value: '2K+', label: 'Active Travelers' },
        { value: '150+', label: 'Destinations' },
        { value: '5K+', label: 'Matches Made' },
        { value: '4.9★', label: 'Average Rating' },
      ].map((stat) => (
        <div
          key={stat.label}
          className="group bg-white p-8 rounded-2xl shadow-md 
                     hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-4xl font-extrabold text-orange-500">
            {stat.value}
          </h3>
          <p className="mt-3 text-sm text-gray-600 group-hover:text-gray-800 transition">
            {stat.label}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>



{/*Find Travelers  */}

<section className="py-24 bg-white">
  <div className="container mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      Find Travelers Like You
    </h2>
    <p className="mt-4 text-gray-600">
      No matter your travel style, there’s a buddy waiting.
    </p>

    <div className="mt-16 grid md:grid-cols-5 gap-8">
      {[
        'Backpackers',
        'Luxury Travelers',
        'Adventure Seekers',
        'Food Explorers',
        'Digital Nomads',
      ].map((style) => (
        <div
          key={style}
          className="group bg-gray-50 p-8 rounded-2xl shadow-sm 
                     hover:bg-orange-50 hover:-translate-y-1 
                     hover:shadow-lg transition-all duration-300"
        >
          <div className="mx-auto mb-4 w-12 h-12 rounded-full 
                          bg-orange-100 text-orange-600 
                          flex items-center justify-center text-xl">
            ✈️
          </div>
          <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition">
            {style}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

{/* Community */}
<section className="py-28 bg-linear-to-b from-gray-50 to-white text-center">
  <div className="container mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      Be Part of a Growing Travel Community
    </h2>
    <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
      Create trips, meet new people, and turn solo journeys into shared memories.
    </p>

    <div className="mt-14 flex justify-center gap-6 flex-wrap">
      {[
        '🌍 Global Travelers',
        '🤝 Trusted Community',
        '✈️ Real Trips',
      ].map((item) => (
        <span
          key={item}
          className="px-6 py-3 bg-white rounded-full shadow-md 
                     text-sm font-medium text-gray-700 
                     hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          {item}
        </span>
      ))}
    </div>

  </div>
</section>

<section className="py-24 bg-linear-to-b from-white to-gray-50">
  <div className="container mx-auto px-6">

    {/* Centered Title */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Smart Matching, Real Connections
      </h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        We connect travelers who truly belong together — based on plans, preferences,
        and purpose.
      </p>
    </div>

    {/* Content */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* Left: Features */}
      <div className="space-y-6">
        <p className="text-gray-600 text-lg">
          Our intelligent matching system helps you find travel buddies who share
          the same destination, budget, and travel mindset.
        </p>

        <ul className="space-y-4">
          {[
            'Match by destination & travel date',
            'Budget compatibility',
            'Travel style preferences',
            'Verified traveler profiles',
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold">
                ✓
              </span>
              <span className="text-gray-700 font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Testimonial Card */}
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-1 bg-linear-to-r from-orange-400 to-yellow-300 rounded-2xl blur opacity-20" />

        <div className="relative bg-white p-10 rounded-2xl shadow-xl">
          <p className="text-gray-600 italic text-lg leading-relaxed">
            “I instantly matched with travelers planning the same route.
            The experience felt natural, safe, and exciting.”
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              👤
            </div>
            <div>
              <p className="font-semibold text-gray-900">Community Member</p>
              <p className="text-sm text-gray-500">Verified Traveler</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    

  </div>
</section>



      {/*FINAL CTA  */}
      <section className="py-24 bg-orange-500 text-white text-center">
        <h2 className="text-3xl font-extrabold">Ready to start your journey?</h2>
        <p className="mt-3 text-orange-100">
          Join thousands of travelers already exploring together.
        </p>
        <Link
          href="/register"
          className="inline-block mt-8 px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-100 transition"
        >
          Get Started Now
        </Link>
      </section>

    </div>
  );
}
