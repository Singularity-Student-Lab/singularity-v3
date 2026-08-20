"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const singularityLogo = "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 pt-16 pb-12 px-6 md:px-12 z-[50]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Brand & Mail Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-10 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={singularityLogo} 
              alt="Singularity Logo" 
              className="w-7 h-7 object-contain opacity-90 group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm uppercase tracking-tight text-white">
                Singularity Student Lab
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                SRM University AP
              </span>
            </div>
          </Link>

          <a 
            href="mailto:singularitylab@srmap.edu.in"
            className="inline-flex items-center gap-2 text-sm md:text-base font-mono text-white/80 hover:text-white border-b border-white/30 hover:border-white transition-colors pb-0.5"
          >
            <span>singularitylab@srmap.edu.in</span>
            <ArrowUpRight size={15} className="text-white/60" />
          </a>
        </div>

        {/* Links Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono uppercase tracking-widest text-white/60">
          <div className="space-y-3">
            <span className="text-white/30 block text-[10px]">Navigation</span>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
              <Link href="/#contact" className="block hover:text-white transition-colors">Ping Us</Link>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-white/30 block text-[10px]">Initiatives</span>
            <div className="space-y-2">
              <a 
                href="https://schrodingerscat.singularitylabsrmap.space/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                Schrödinger&apos;s Cat ↗
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-white/30 block text-[10px]">Social</span>
            <div className="space-y-2">
              <a 
                href="https://www.linkedin.com/company/singularity-student-lab-srmap/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                LinkedIn ↗
              </a>
              <a 
                href="https://www.instagram.com/thesingularity.srmap" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>

        {/* Minimalist Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono tracking-widest uppercase text-white/30">
          <p>© {new Date().getFullYear()} Singularity Student Lab</p>
          <p>SRM University AP // Amaravati</p>
        </div>

      </div>
    </footer>
  );
}