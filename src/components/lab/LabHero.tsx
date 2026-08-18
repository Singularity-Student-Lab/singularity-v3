"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface Props {
  name: string
  focus: string
  description: string
  video: string
  color: string
}

// Optimized Cloudinary delivery
const CLOUDINARY_BASE =
  "https://res.cloudinary.com/djtemmctt/video/upload/w_1280,q_auto:low,f_auto,vc_auto,fl_progressive/"

export default function LabHero({ name, focus, description, video, color }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Responsive heading size
  const getHeadingSize = (text: string) => {
    const length = text.length
    if (length <= 15) return "text-[12vw] md:text-[6vw]"
    if (length <= 25) return "text-[10vw] md:text-[5vw]"
    if (length <= 35) return "text-[8vw] md:text-[4.2vw]"
    return "text-[7vw] md:text-[3.5vw]"
  }

  useEffect(() => {
  const vid = videoRef.current
  if (!vid) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        vid.play().catch(() => {})
      } else {
        vid.pause()
      }
    },
    { threshold: 0.3 }
  )

  observer.observe(vid)

  return () => observer.disconnect()
}, [])

  // Safe autoplay (prevents freeze)
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const play = () => {
      const promise = vid.play()
      if (promise !== undefined) {
        promise.catch(() => {})
      }
    }

    if (vid.readyState >= 2) {
      play()
    } else {
      vid.addEventListener("loadeddata", play)
      return () => vid.removeEventListener("loadeddata", play)
    }
  }, [])

  // GSAP animation (clean + no duplication)
  useEffect(() => {
    const tl = gsap.timeline()

    // Initial states
    gsap.set(videoRef.current, { opacity: 0 })
    gsap.set(contentRef.current, { opacity: 0, y: 40 })
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" })

    requestAnimationFrame(() => {
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(videoRef.current, {
          opacity: 0.6,
          duration: 0.8,
          ease: "power2.out",
        }, "<")
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
        }, "-=0.4")
        .to(lineRef.current, {
          scaleX: 1,
          duration: 0.7,
          ease: "expo.out",
        }, "-=0.5")
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center overflow-hidden bg-black"
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        style={{
          willChange: "opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={`${CLOUDINARY_BASE}${video}`}
      />

      {/* ENTRY OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-20 pointer-events-none"
      />

      {/* GRADIENT (GPU-safe replacement for blur) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 pointer-events-none" />

      {/* ACCENT LINE */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-[3px] z-30"
        style={{ backgroundColor: color }}
      />

      {/* CONTENT */}
      <div ref={contentRef} className="relative z-30 max-w-4xl px-4 md:px-6">
        <p className="text-[11px] font-mono tracking-[0.4em] text-white/40 uppercase mb-6 text-center">
          {focus}
        </p>

        <h1
          className={`${getHeadingSize(name)} font-black uppercase tracking-tighter leading-none text-center mx-auto`}
        >
          {name}
        </h1>

        <p className="text-white/55 mt-8 leading-relaxed text-sm md:text-base max-w-2xl mx-auto text-center">
          {description}
        </p>
      </div>
    </section>
  )
}