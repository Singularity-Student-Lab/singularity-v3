"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Executive {
  name: string
  role: string
  image?: string
  github?: string
  linkedin?: string
}

interface Member {
  name: string
  year: string
  github?: string
  linkedin?: string
}

interface Props {
  executives: Executive[]
  members: Member[]
  logo: string
  color: string
}

export default function LabTeam({ executives, members, logo, color }: Props) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Header animation
    gsap.fromTo(".team-header",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-header-container",
          start: "top 85%",
        }
      }
    )

    // Executives animation
    if (executives.length > 0) {
      gsap.fromTo(".exec-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "expo.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".exec-container",
            start: "top 85%",
          }
        }
      )
    }

    // Members animation
    if (members.length > 0) {
      gsap.fromTo(".member-card",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".members-container",
            start: "top 85%",
          }
        }
      )
    }
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="max-w-6xl mx-auto px-6 pb-32 overflow-x-hidden">

      {/* HEADER */}
      <div className="team-header-container text-center mb-16 md:mb-20">
        <h2 className="team-header text-4xl md:text-5xl font-black uppercase tracking-tight">
          Our Team
        </h2>
        <p className="team-header text-white/50 mt-4 text-sm md:text-base">
          Meet the minds building intelligence
        </p>
      </div>

      {/* EXECUTIVES */}
      {executives.length > 0 && (
        <div className="exec-container mb-24">
          <h3 className="text-xs text-white/40 uppercase tracking-[0.4em] mb-10 text-center">
            Executives
          </h3>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
            {executives.map((e, i) => (
              <div
                key={i}
                className="exec-card group relative flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8 border border-white/20 p-8 bg-black/70 transition-all duration-500 hover:scale-[1.02] w-full md:max-w-xl"
              >

                {/* 🔥 Glow Layer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                  style={{
                    boxShadow: `0 0 8px ${color}66`
                  }}
                />

                {/* PHOTO */}
                <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20 shrink-0">
                  {e.image && (
                    <img
                      src={e.image}
                      alt={e.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* INFO */}
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">
                    {e.role}
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-3 mt-2 md:mt-1">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {e.name}
                    </h3>

                    <img
                      src={logo}
                      alt=""
                      className="w-4 h-4 md:w-5 md:h-5 opacity-70"
                    />
                  </div>

                  {(e.github || e.linkedin) && (
                    <div className="flex justify-center md:justify-start gap-4 mt-3">
                      {e.github && (
                        <a href={e.github} target="_blank" rel="noopener noreferrer" aria-label={`${e.name}'s GitHub profile`} className="text-white/40 hover:text-white transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {e.linkedin && (
                        <a href={e.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${e.name}'s LinkedIn profile`} className="text-white/40 hover:text-white transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* 🔥 Bottom Accent Line */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: color }}
                />

              </div>
            ))}
          </div>
        </div>
      )}

      {/* MEMBERS */}
      {members.length > 0 && (
        <div className="members-container">
          <h3 className="text-xs text-white/40 uppercase tracking-[0.4em] mb-10 text-center">
            Members
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {members.map((m, i) => (
              <div
                key={i}
                className="member-card border border-white/10 p-5 bg-black/60 transition-all hover:border-white/30 hover:bg-white/[0.03] hover:-translate-y-1 relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-base md:text-lg">
                      {m.name}
                    </h4>

                    <p className="text-white/40 text-[10px] md:text-xs mt-2 uppercase tracking-wider">
                      {m.year}
                    </p>
                  </div>
                  
                  {(m.github || m.linkedin) && (
                    <div className="flex gap-3">
                      {m.github && (
                        <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name}'s GitHub profile`} className="text-white/40 hover:text-white transition-colors">
                          <Github size={16} />
                        </a>
                      )}
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name}'s LinkedIn profile`} className="text-white/40 hover:text-white transition-colors">
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  )
}