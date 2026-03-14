"use client";

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import { Star } from 'lucide-react';

import { labs } from '../data/labs';
import { ClipPathLinks } from '../components/ui/clip-path-links'; // Updated to use @/ alias
import { FallingPattern } from '../components/ui/falling-pattern'; // Updated to use @/ alias
import { Particles } from '../components/ui/particles'; // Updated to use @/ alias

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

const CLOUDINARY_BASE = "https://res.cloudinary.com/djtemmctt/image/upload/q_auto:eco,f_auto/";
const CLOUDINARY_BASEVID = "https://res.cloudinary.com/djtemmctt/video/upload/q_auto:eco,f_auto/";

const singularityLogo = "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png";

export default function Hub() {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // FIXED: Explicitly tell TypeScript this array holds video elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // FIXED: Tell TypeScript that 'index' is a number
  const playVideo = (index: number) => {
    const vid = videoRefs.current[index];
    if (vid && vid.paused) vid.play().catch(() => {});
  };

  // FIXED: Tell TypeScript that 'index' is a number
  const pauseVideo = (index: number) => {
    const vid = videoRefs.current[index];
    if (vid && !vid.paused) vid.pause();
  };

useGSAP(() => {

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.35,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true
  });

  const gTl = gsap.timeline();

  gTl.to(".hero-section", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  });

  gsap.from(".hero-heading", {
    scale: 0.92,
    duration: 1.0,
    ease: "expo.out"
  });

  // Hero reveal
  gTl.from(".hero-heading > span:first-child", {
    y: 120,
    opacity: 0,
    duration: 1.6,
    ease: "expo.out"
  }, "-=0.2");

  gTl.fromTo(".hero-heading > span:last-child",
    {
      opacity: 0,
      filter: "blur(10px)",
      letterSpacing: "1em"
    },
    {
      opacity: 0.5,
      filter: "blur(0px)",
      letterSpacing: "0.5em",
      duration: 1.2,
      ease: "power3.out"
    },
    "-=1"
  );

  gTl.fromTo(".parallax-grid img",
    {
      opacity: 0,
      y: 80,
      scale: 0.96
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.08,
      duration: 1.6,
      ease: "power3.out"
    },
  "-=1.2");

  gTl.from(".header__marq", {
    yPercent: 100,
    opacity: 0,
    duration: 0.8,
    ease: "expo.out"
  }, "-=0.8");

  gTl.from(".draw-path", {
    drawSVG: "0%",
    duration: 1.0,
    ease: "power3.out"
  }, "-=0.6");

  gsap.to(".marquee-track", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "#smooth-content",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  gsap.to(".marquee-logo", {
    rotation: 3600,
    transformOrigin: "center center",
    ease: "none",
    scrollTrigger: {
      trigger: "#smooth-content",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  const cards = gsap.utils.toArray<HTMLElement>(".card-wrapper");

  cards.forEach((card, i) => {

    ScrollTrigger.create({
      trigger: card,
      start: "top 20%",
      scrub: 0.5,
      endTrigger: ".cards-container",
      end: "bottom 90%",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,

      onEnter: () => {
        playVideo(i);
        if (i >= 2) pauseVideo(i - 2);
      },

      onLeaveBack: () => {
        if (i >= 2) playVideo(i - 2);
      }
    });

    if (i < cards.length - 1) {
      gsap.to(card, {
        scale: 0.94,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top 80%",
          end: "top 12%",
          scrub: true
        }
      });
    }

  });

  return () => smoother.kill();

}, { scope: container });

  const handleMediaLoad = () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div ref={container} className="bg-black text-white overflow-hidden">
      
      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ willChange: 'transform',transform: "translateZ(0)" }}>
          
          {/* BACKGROUND LAYER */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Particles
              className="absolute inset-0"
              quantity={150}
              ease={80}
              color="#ffffff"
              size={1.5}
              refresh
            />
            <div className="opacity-40">
              <FallingPattern color="rgba(255, 255, 255, 0.15)" />
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-6 flex justify-between items-center mix-blend-difference">
            <div className="flex items-center gap-4">
              <img src={singularityLogo} alt="Logo" className="w-10 h-10 object-contain" />
              <div className="font-black text-xl tracking-tighter uppercase leading-none">Singularity Student Lab</div>
            </div>
            <div className="flex gap-10 font-mono text-[11px] tracking-[0.3em] opacity-60 uppercase">
              <span>About Us</span>
              <span>Labs</span>
              <span>Events</span>
              <span>Contact</span>
            </div>
          </nav>

          {/* HERO SECTION */}
          <section className="relative min-h-[140vh] pt-60 flex flex-col items-center overflow-hidden">
            <div className="hero-heading-container relative z-10 mix-blend-difference pointer-events-none">
              <h1 className="text-[6.5vw] font-black tracking-tighter uppercase leading-none text-center hero-heading">
                <span className="relative inline-block">
                  Singularity
                  <svg className="absolute top-[58%] left-[-6%] w-[112%] translate-y-[-50%] rotate-[2deg]" viewBox="0 0 842.14 500">
                    <path className="draw-path" d="M336.2,130.05C261.69,118,16.52,122,20.65,244.29c4.17,123,484.3,299.8,734.57,108.37,244-186.65-337.91-311-546.54-268.47" 
                          fill="none" stroke="white" strokeWidth="8" />
                  </svg>
                </span>
                <br />
                <span className="text-[1vw] tracking-[0.5em] opacity-50 block mt-4 uppercase">{"<Student_Research_Lab/>"}</span>
              </h1>
            </div>

            <div className="parallax-grid grid grid-cols-4 gap-8 w-full px-12 absolute top-1/2 -translate-y-1/2 z-0">
               {[
                 "WhatsApp_Image_2026-02-15_at_2.46.24_AM_aj1qy8.jpg",
                 "WhatsApp_Image_2026-02-15_at_2.46.25_AM_ttclec.jpg",
                 "WhatsApp_Image_2026-02-15_at_2.46.25_AM_1_b5r7lz.jpg",
                 "WhatsApp_Image_2026-02-15_at_2.46.25_AM_2_f2qg5v.jpg"
               ].map((img, idx) => (
                 <img 
                   key={idx}
                   onLoad={handleMediaLoad} 
                   data-speed={`clamp(${2.4 - (idx * 0.3)})`}
                   className="h-[70vh] object-cover mt-80 transform-gpu" 
                   src={`${CLOUDINARY_BASE}v1771104005/${img}`} 
                   alt="" 
                 />
               ))}
            </div>

            <div className="header__marq marquee-section absolute bottom-0 left-0 w-full bg-[#111111] border-y border-white/10 z-20">
              <div className="marquee-track flex w-fit whitespace-nowrap py-3">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="flex items-center text-[#9e9e9e] text-xl md:text-[25px] font-black uppercase pr-[55px] mr-[15px]">
                    singularity student lab
                    <img
                      src={singularityLogo}
                      className="marquee-logo ml-8 w-10 h-10 object-contain opacity-80"
                      alt=""
                    />
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CARDS SECTION */}
          <div className="cards-container relative w-full max-w-4xl mx-auto px-6 pt-[10vh] pb-[20vh] z-20">
            {labs.map((lab, i) => (
              <div key={lab.id} className="card-wrapper w-full mb-[80vh] last:mb-0">
                <div
                  className="card-interactive relative w-full h-[550px] overflow-hidden border border-white/10 bg-black/80 group transition-all duration-700 hover:border-white/30 shadow-2xl transform-gpu"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()

                    const x = (e.clientX - rect.left) / rect.width
                    const y = (e.clientY - rect.top) / rect.height

                    const rotateX = (y - 0.5) * 22
                    const rotateY = (x - 0.5) * -22

                    const xPos = e.clientX - rect.left
                    const yPos = e.clientY - rect.top

                    e.currentTarget.style.setProperty("--x", `${xPos}px`)
                    e.currentTarget.style.setProperty("--y", `${yPos}px`)

                    gsap.to(e.currentTarget, {
                      rotateX,
                      rotateY,
                      scale: 1.02,
                      transformPerspective: 1200,
                      duration: 0.2,
                      ease: "power2.out"
                    })
                  }}

                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotateX: 0,
                      rotateY: 0,
                      scale: 1,
                      duration: 0.5,
                      ease: "power3.out"
                    })
                  }}
                >
                  
                  <div className="absolute inset-0 z-0 card-parallax">
                    {lab.video_id ? (
                      <video
                        ref={(el) => (videoRefs.current[i] = el)}
                        onLoadedData={handleMediaLoad}
                        src={`${CLOUDINARY_BASEVID}/${lab.video_id}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ willChange: 'transform' }} 
                        className="card-bg w-full h-full object-cover opacity-35 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000 scale-110 group-hover:scale-100"
                      />
                    ) : (
                      <img 
                        onLoad={handleMediaLoad}
                        src={`${CLOUDINARY_BASE}/${lab.image_id || 'placeholder_lab'}.png`} 
                        alt={lab.name}
                        className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000"
                      />
                    )}

                    {/* GLOW */}
                    <div className="card-glow absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="relative z-10 h-full p-16 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-white/40 uppercase tracking-[0.4em] block">Archive // 0{i+1}</span>
                      <img
                        src={singularityLogo}
                        alt=""
                        className="lab-logo w-8 h-8 opacity-20 transition-all duration-500 group-hover:opacity-80 group-hover:translate-z-10"
                      />
                    </div>

                    <div>
                      <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-6">{lab.name}</h2>
                      <p className="text-sm font-mono text-white/60 uppercase leading-relaxed max-w-md">{lab.focus}</p>
                    </div>

                    <div 
                      onClick={() => router.push(`/labs/${lab.id}`)}
                      className="text-[10px] font-bold border-t border-white/10 pt-8 text-white/20 tracking-[0.3em] flex justify-between items-center group-hover:text-white transition-colors cursor-pointer"
                    >
                      <span>VIEW_LIVE_FEED</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PING US SECTION */}
          <section className="relative min-h-[70vh] flex flex-col items-center justify-center z-30 px-6 py-10 bg-black">
            <h2 className="text-[5vw] font-black uppercase tracking-tighter mb-16 leading-none">Ping Us</h2>
            <div className="w-full max-w-5xl">
              <ClipPathLinks />
            </div>
          </section>

          <div className="fixed bottom-4 left-4 z-[110] pointer-events-none">
             <img src={`${CLOUDINARY_BASE}v1771106322/Screenshot_from_2026-02-15_03-27-52_abg98x.png`}  alt="" className="w-20 md:w-50 h-auto object-contain opacity-50 grayscale hover:opacity-100 transition-all duration-500 rounded-sm" />
          </div>

          <div className="h-[2vh]" />
        </div> 
      </div> 
    </div>
  );
}