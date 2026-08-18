"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { labs } from '../data/labs'; 

const singularityLogo = "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png";

export default function Navbar() {
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const labsDropdownRef = useRef(null);
  const eventsDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);

  const events = [
    {
      id: "schrodingers-cat",
      name: "Schrödinger's Cat",
      url: "https://schrodingerscat.singularitylabsrmap.space/"
    }
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (labsDropdownRef.current && !labsDropdownRef.current.contains(e.target)) {
        setLabsDropdownOpen(false);
      }
      if (eventsDropdownRef.current && !eventsDropdownRef.current.contains(e.target)) {
        setEventsDropdownOpen(false);
      }
    };

    if (labsDropdownOpen || eventsDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [labsDropdownOpen, eventsDropdownOpen]);

  // Prevent background scrolling when mobile menu is open
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

  // Close mobile menu on Escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
      mobileToggleRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Move focus into the drawer
      const timer = setTimeout(() => {
        const firstLink = mobileMenuRef.current?.querySelector('a, button');
        firstLink?.focus();
      }, 100);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        clearTimeout(timer);
      };
    }
  }, [mobileMenuOpen, handleEscape]);

  // Trap focus inside mobile menu drawer
  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;
    const drawer = mobileMenuRef.current;
    const handleTabTrap = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    drawer.addEventListener('keydown', handleTabTrap);
    return () => drawer.removeEventListener('keydown', handleTabTrap);
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-4 md:py-6 flex justify-between items-center mix-blend-difference text-white">
        
        <Link href="/">
          <div className="flex items-center gap-2 md:gap-4 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={singularityLogo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            <div className="font-black text-xs sm:text-sm md:text-xl tracking-tighter uppercase leading-none">
              Singularity Student Lab
            </div>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 font-mono text-[11px] tracking-[0.3em] opacity-60 uppercase">
          <Link href="/about" className="hover:opacity-100 transition-opacity cursor-pointer">
            About Us
          </Link>
          
          <div ref={labsDropdownRef} className="relative">
            <button 
              onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
              className="hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-2"
            >
              LABS
              <ChevronDown size={12} className={`transition-transform duration-200 ${labsDropdownOpen ? 'rotate-180' : ''}`} />
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
              <ChevronDown size={12} className={`transition-transform duration-200 ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
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

          <Link href="/#contact" className="hover:opacity-100 transition-opacity cursor-pointer">
            Contact
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          ref={mobileToggleRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:opacity-80 transition-opacity z-[110]"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-drawer"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-md z-[99] flex flex-col justify-start overflow-y-auto px-6 pt-24 pb-10 gap-6 text-white font-mono"
        >
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base tracking-[0.2em] text-white/80 hover:text-white uppercase transition-colors"
          >
            About Us
          </Link>
          
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.3em] text-white/30 uppercase">Labs</span>
            <div className="flex flex-col gap-3 pl-4 border-l border-white/10 mt-1">
              {labs.map((lab) => (
                <Link
                  key={lab.id}
                  href={`/labs/${lab.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs tracking-wider text-white/60 hover:text-white transition-colors"
                >
                  {lab.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.3em] text-white/30 uppercase">Events</span>
            <div className="flex flex-col gap-3 pl-4 border-l border-white/10 mt-1">
              {events.map((event) => (
                <a
                  key={event.id}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs tracking-wider text-white/60 hover:text-white transition-colors"
                >
                  {event.name}
                </a>
              ))}
            </div>
          </div>

          <Link 
            href="/#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-base tracking-[0.2em] text-white/80 hover:text-white uppercase transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </>
  );
}