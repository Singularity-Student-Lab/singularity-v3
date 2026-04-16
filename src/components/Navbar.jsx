"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { labs } from "../data/labs";

const singularityLogo =
  "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png";

export default function Navbar() {
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLabsOpen, setMobileLabsOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const labsDropdownRef = useRef(null);
  const eventsDropdownRef = useRef(null);

  const events = [
    {
      id: "schrodingers-cat",
      name: "Schrödinger's Cat",
      url: "https://schrodingerscat.singularitylabsrmap.space/",
    },
  ];

  // Close dropdowns on outside click (desktop)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        labsDropdownRef.current &&
        !labsDropdownRef.current.contains(e.target)
      ) {
        setLabsDropdownOpen(false);
      }
      if (
        eventsDropdownRef.current &&
        !eventsDropdownRef.current.contains(e.target)
      ) {
        setEventsDropdownOpen(false);
      }
    };

    if (labsDropdownOpen || eventsDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [labsDropdownOpen, eventsDropdownOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileLabsOpen(false);
    setMobileEventsOpen(false);
  };

  return (
    <>
      {/* ===== Main Navbar ===== */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-5 md:px-10 py-4 md:py-6 flex justify-between items-center mix-blend-difference text-white">
        {/* Logo + Brand */}
        <Link href="/" onClick={closeMobileMenu}>
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer hover:opacity-80 transition-opacity">
            <img
              src={singularityLogo}
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <div className="font-black text-sm md:text-xl tracking-tighter uppercase leading-none">
              Singularity Student Lab
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links — hidden on mobile */}
        <div className="hidden md:flex gap-10 font-mono text-[11px] tracking-[0.3em] opacity-60 uppercase">
          <Link
            href="/about"
            className="hover:opacity-100 transition-opacity cursor-pointer"
          >
            About Us
          </Link>

          <div ref={labsDropdownRef} className="relative">
            <button
              onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
              className="hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-2"
            >
              LABS
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${labsDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {labsDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 bg-black/95 border border-white/20 rounded-lg shadow-lg py-2 min-w-50 backdrop-blur-sm z-50">
                {labs.map((lab) => (
                  <Link
                    key={lab.id}
                    href={`/labs/${lab.id}`}
                    onClick={() => setLabsDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-white/80 hover:text-white text-xs whitespace-nowrap"
                  >
                    {lab.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div ref={eventsDropdownRef} className="relative">
            <button
              onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
              className="hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-2"
            >
              EVENTS
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${eventsDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {eventsDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 bg-black/95 border border-white/20 rounded-lg shadow-lg py-2 min-w-55 backdrop-blur-sm z-50">
                {events.map((event) => (
                  <a
                    key={event.id}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setEventsDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-white/10 transition-colors text-white/80 hover:text-white text-xs whitespace-nowrap"
                  >
                    {event.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/#contact"
            className="hover:opacity-100 transition-opacity cursor-pointer"
          >
            Contact
          </Link>
        </div>

        {/* Hamburger Button — visible on mobile only */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ===== Mobile Fullscreen Menu Overlay ===== */}
      <div
        className={`fixed inset-0 z-[99] bg-black/98 backdrop-blur-xl flex flex-col md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Mobile menu content — pushed below the navbar */}
        <div className="flex flex-col justify-center flex-1 px-8 pt-24 pb-12 gap-2">
          {/* About Us */}
          <Link
            href="/about"
            onClick={closeMobileMenu}
            className={`block text-white text-2xl font-black uppercase tracking-tight py-4 border-b border-white/10 transition-all duration-500 ${
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileMenuOpen ? "100ms" : "0ms" }}
          >
            About Us
          </Link>

          {/* Labs Accordion */}
          <div
            className={`border-b border-white/10 transition-all duration-500 ${
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileMenuOpen ? "150ms" : "0ms" }}
          >
            <button
              onClick={() => setMobileLabsOpen(!mobileLabsOpen)}
              className="flex items-center justify-between w-full py-4 text-white text-2xl font-black uppercase tracking-tight cursor-pointer"
            >
              Labs
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${mobileLabsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                mobileLabsOpen
                  ? "max-h-96 opacity-100 pb-3"
                  : "max-h-0 opacity-0"
              }`}
            >
              {labs.map((lab) => (
                <Link
                  key={lab.id}
                  href={`/labs/${lab.id}`}
                  onClick={closeMobileMenu}
                  className="block py-2.5 pl-4 text-white/60 hover:text-white text-base font-mono tracking-wider transition-colors"
                >
                  {lab.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Events Accordion */}
          <div
            className={`border-b border-white/10 transition-all duration-500 ${
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileMenuOpen ? "200ms" : "0ms" }}
          >
            <button
              onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
              className="flex items-center justify-between w-full py-4 text-white text-2xl font-black uppercase tracking-tight cursor-pointer"
            >
              Events
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${mobileEventsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                mobileEventsOpen
                  ? "max-h-96 opacity-100 pb-3"
                  : "max-h-0 opacity-0"
              }`}
            >
              {events.map((event) => (
                <a
                  key={event.id}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block py-2.5 pl-4 text-white/60 hover:text-white text-base font-mono tracking-wider transition-colors"
                >
                  {event.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Link
            href="/#contact"
            onClick={closeMobileMenu}
            className={`block text-white text-2xl font-black uppercase tracking-tight py-4 border-b border-white/10 transition-all duration-500 ${
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileMenuOpen ? "250ms" : "0ms" }}
          >
            Contact
          </Link>
        </div>

        {/* Bottom branding in mobile menu */}
        <div className="px-8 pb-8 text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase">
          Singularity Student Lab — SRMAP
        </div>
      </div>
    </>
  );
}
