'use client';

import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Travel is better <span className="text-orange-500">together</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 max-w-xl">
              Find travel buddies, create plans, and explore destinations with like-minded travelers around the world.
            </p>

            <div className="mt-8 flex gap-4">
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

          <div className="hidden md:block">
            <div className="rounded-3xl bg-orange-100 h-96 w-full shadow-inner"></div>
          </div>
        </div>
      </section>

      {/* ================= LOGGED-IN RECOMMENDATIONS ================= */}
      {user && (
        <section className="py-16 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recommended Travel Buddies for You
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-5 rounded-xl border bg-gray-50 hover:shadow-md transition">
                  <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                    T
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-800">Traveler {i}</h3>
                  <p className="text-sm text-gray-500">Interested in mountains & culture</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-3 text-gray-600">Start your journey in just 3 simple steps</p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your profile and share your travel interests.' },
              { step: '02', title: 'Create Plan', desc: 'Add destination, budget, and travel date.' },
              { step: '03', title: 'Find Buddy', desc: 'Match with travelers going the same way.' },
            ].map(item => (
              <div key={item.step} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-orange-500 font-extrabold text-4xl">{item.step}</div>
                <h3 className="mt-3 font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR DESTINATIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Popular Destinations</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Paris', 'Thailand', 'Nepal', 'Turkey'].map(place => (
              <div key={place} className="h-48 rounded-xl bg-gray-100 flex items-end p-4 font-semibold text-gray-800">
                {place}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Choose Us</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Verified Travelers',
              'Secure Messaging',
              'Smart Matching Algorithm',
            ].map(text => (
              <div key={text} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg">{text}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Safe, reliable and designed for real travelers.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {['Anna', 'Rahim', 'Sofia'].map(name => (
              <div key={name} className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-600 italic">
                  “I found my perfect travel buddy here — unforgettable experience!”
                </p>
                <div className="mt-4 font-semibold">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
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
