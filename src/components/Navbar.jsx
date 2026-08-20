"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { labs } from '../data/labs';

const singularityLogo = "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png";

export default function Navbar() {
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const labsDropdownRef = useRef(null);

  const events = [
    {
      id: "schrodingers-cat",
      name: "Schrödinger's Cat",
      url: "https://schrodingerscat.singularitylabsrmap.space/"
    }
  ];

  // Scroll detection to adapt background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (labsDropdownRef.current && !labsDropdownRef.current.contains(e.target)) {
        setLabsDropdownOpen(false);
      }
    };
    if (labsDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [labsDropdownOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Seamless Floating Navbar - Completely Borderless */}
      <header className="fixed top-4 md:top-6 inset-x-0 z-[100] flex justify-center px-4 sm:px-6 pointer-events-none transition-all duration-300">
        <nav 
          className={`pointer-events-auto w-full max-w-4xl rounded-full px-5 md:px-7 py-2.5 md:py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled 
              ? 'bg-black/80 backdrop-blur-xl' 
              : 'bg-black/30 backdrop-blur-md'
          }`}
        >
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <img 
              src={singularityLogo} 
              alt="Singularity Logo" 
              className="w-6 h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
            />
            <span className="font-bold text-xs md:text-sm tracking-tight uppercase text-white">
              Singularity
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-[0.2em] uppercase text-white/60">
            <Link 
              href="/about" 
              className="hover:text-white transition-colors duration-200"
            >
              About
            </Link>

            {/* Labs Dropdown */}
            <div ref={labsDropdownRef} className="relative">
              <button
                onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
                className={`hover:text-white transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
                  labsDropdownOpen ? 'text-white' : ''
                }`}
              >
                <span>Labs</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${labsDropdownOpen ? 'rotate-180 text-white' : 'text-white/40'}`} />
              </button>

              {labsDropdownOpen && (
                <div className="absolute top-full mt-3 -left-4 w-56 bg-black/95 rounded-2xl p-2 backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[9px] font-mono tracking-widest text-white/30 mb-1">
                    LABS
                  </div>
                  {labs.map((lab) => (
                    <Link
                      key={lab.id}
                      href={`/labs/${lab.id}`}
                      onClick={() => setLabsDropdownOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white text-xs font-sans font-medium truncate"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      {lab.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Events Link */}
            {events.map((event) => (
              <a
                key={event.id}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                Events
              </a>
            ))}

            <Link 
              href="/#contact" 
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Action CTA */}
          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] tracking-wider uppercase transition-all duration-200"
            >
              Ping Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-white/70 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Seamless Mobile Drawer - Glassmorphism matched to nav */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop click dismiss */}
          <div 
            className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-4 top-20 max-w-sm mx-auto rounded-3xl bg-black/60 backdrop-blur-2xl z-[99] flex flex-col p-6 gap-5 text-white font-mono animate-in fade-in slide-in-from-top-3 duration-200"
          >
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm tracking-[0.2em] text-white/80 hover:text-white uppercase transition-colors"
            >
              About Us
            </Link>
            
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Labs</span>
              <div className="flex flex-col gap-2.5 pl-3">
                {labs.map((lab) => (
                  <Link
                    key={lab.id}
                    href={`/labs/${lab.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-white/80 hover:text-white transition-colors font-sans font-medium truncate"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    {lab.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Events</span>
              <div className="flex flex-col gap-2.5 pl-3">
                {events.map((event) => (
                  <a
                    key={event.id}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-white/70 hover:text-white transition-colors font-sans"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    {event.name} ↗
                  </a>
                ))}
              </div>
            </div>

            <Link 
              href="/#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-center text-xs tracking-[0.2em] uppercase text-white transition-all mt-2"
            >
              Ping Us
            </Link>
          </div>
        </>
      )}
    </>
  );
}