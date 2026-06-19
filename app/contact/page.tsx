"use client";

import React, { useEffect, useState } from "react";

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/ramashrays@proton.me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          message
        })
      });

      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-white flex flex-col font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <main
        className={`flex-1 w-full max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 pt-36 pb-36 transition-all duration-1000 ease-out transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-24">

          {/* Left Column: Form */}
          <div className="w-full md:w-3/5 space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Say Hi!
              </h1>
            </div>

            {success ? (
              <div className="bg-[#151515] border border-green-500/20 p-6 rounded-2xl space-y-3 transition-all duration-500">
                <div className="flex items-center space-x-2 text-green-400 font-medium">
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Message Sent</span>
                </div>
                <p className="text-neutral-400 text-sm">
                  Thanks for reaching out! Your message was delivered successfully.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs text-white hover:underline font-medium font-mono pt-1"
                >
                  [ Send another message ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="thou@gmail.com"
                    className="w-full bg-[#121212] border border-white/10 rounded-xl p-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all duration-300 w-full text-sm font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type thy message..."
                    className="w-full bg-[#121212] border border-white/10 rounded-xl p-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all duration-300 w-full text-sm font-sans resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs font-mono text-red-400">{error}</p>
                )}

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-white text-black font-semibold rounded-xl py-3.5 text-sm hover:bg-neutral-200 disabled:bg-neutral-500 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>

                  {/* Download CV Button below the main button */}
                  <div className="text-center">
                    <a
                      href="/assets/cv.pdf"
                      download="Ramashray_Sahu_CV.pdf"
                      className="inline-flex items-center space-x-1.5 text-xs text-neutral-500 hover:text-neutral-300 font-mono transition-colors duration-300"
                    >
                      <span>[ download cv ]</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: excited.webp mascot */}
          <div className="w-full md:w-2/5 flex justify-center items-center md:pt-8">
            <div className="w-[240px] sm:w-[280px] md:w-full max-w-[360px] select-none transition-all duration-300 hover:scale-105 transform">
              <img
                src="/assets/excited.webp"
                alt="Excited mascot"
                className="w-full h-auto object-contain"
                draggable="false"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
