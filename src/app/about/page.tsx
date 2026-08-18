"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Linkedin, Github,Globe } from "lucide-react"
import Footer from "@/src/components/Footer"

const singularityLogo = "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // 1. Page Load Hero Reveal
    const tl = gsap.timeline()
    
    tl.fromTo(".hero-tag", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    )
    .fromTo(".hero-title-word",
      { opacity: 0, y: 60, rotateX: -45 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: "expo.out" },
      "-=0.6"
    )

    // 2. Scroll Animations for Text Blocks
    const textBlocks = gsap.utils.toArray<HTMLElement>(".reveal-block")
    textBlocks.forEach((block) => {
      gsap.fromTo(block,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
          }
        }
      )
    })

    // 3. Staggered Grid for "Why Singularity"
    gsap.fromTo(".why-card",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".why-grid",
          start: "top 85%",
        }
      }
    )

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen overflow-hidden selection:bg-white selection:text-black">
      
      <main className="pt-40 pb-32">
        {/* HERO SECTION */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <p className="hero-tag text-[11px] font-mono tracking-[0.5em] text-white/40 uppercase mb-8">
            Decode // Innovate // Transform
          </p>
          <h1 className="text-[9vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 perspective-[1000px] max-w-6xl">
            <span className="hero-title-word inline-block origin-bottom">About</span>
            <span className="hero-title-word inline-block origin-bottom">Singularity</span>
            <span className="hero-title-word inline-block origin-bottom">Student</span>
            <span className="hero-title-word inline-block origin-bottom">Lab</span>
          </h1>
          <div className="hero-tag mt-12 w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </section>

        {/* VISION & MISSION */}
        <section className="max-w-5xl mx-auto px-6 py-24 space-y-32">
          
          <div className="reveal-block flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-mono tracking-[0.4em] text-white/40 uppercase w-48 shrink-0 pt-2">
              Our Vision
            </h2>
            <p className="text-2xl md:text-4xl font-normal tracking-tight leading-relaxed text-white/80 max-w-4xl">
              We aim to revolutionize the future of technology by driving groundbreaking research and fostering an environment where innovation knows no bounds. Through inclusive collaboration, we strive to create transformative solutions that bridge the gap between ideas and real-world impact.
            </p>
          </div>

          <div className="reveal-block flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-mono tracking-[0.4em] text-white/40 uppercase w-48 shrink-0 pt-2">
              Our Mission
            </h2>
            <div className="space-y-8">
              <p className="text-2xl md:text-4xl font-bold tracking-tight leading-snug text-white/80">
                To push the limits of technological advancement with cutting-edge tools and research-driven innovation.
              </p>
              <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-3xl">
                We are dedicated to knowledge sharing and empowering the next generation of tech leaders, ensuring a future where technology serves all.
              </p>
            </div>
          </div>

        </section>

        {/* LEADERSHIP SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-24 space-y-24 border-t border-white/10 mt-16">
          
          <div className="reveal-block flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-mono tracking-[0.4em] text-white/40 uppercase w-48 shrink-0 pt-6">
              Founding Student
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group p-4 -ml-4 md:p-6 md:-ml-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-500 w-full max-w-2xl cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-white/20 shrink-0">
                <img 
                  src="https://res.cloudinary.com/djtemmctt/image/upload/v1773943803/jayanth_dtqvzg.jpg" 
                  alt="Jayanth Ramakrishnan" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white/90">
                  Jayanth Ramakrishnan
                </h3>
                <p className="text-white/50 text-sm md:text-base mt-2">
                  Founder & Lead
                </p>
                <div className="flex justify-center sm:justify-start gap-5 mt-4">
                  <a href="https://jayanthramakrishnan.online" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white hover:scale-110 transition-all" aria-label="Personal Website">
                    <Globe size={20} />
                  </a>
                  <a href="https://instagram.com/thejayanthramakrishnan" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white hover:scale-110 transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="https://linkedin.com/in/jayanth-ramakrishnan/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white hover:scale-110 transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://github.com/jayanthoffl" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white hover:scale-110 transition-all">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-block flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-mono tracking-[0.4em] text-white/40 uppercase w-48 shrink-0 pt-6">
              Founding Faculty
            </h2>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group p-4 -ml-4 md:p-6 md:-ml-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-500 cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <img 
                    src="https://res.cloudinary.com/djtemmctt/image/upload/v1774293381/tomy_rbpm0i.jpg" 
                    alt="Prof. CV Tomy" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/90">
                    Prof. CV Tomy
                  </h3>
                  <p className="text-white/50 text-sm md:text-base mt-1">
                    Dean - School of Applied Science and Engineering
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group p-4 -ml-4 md:p-6 md:-ml-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-500 cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <img 
                    src="https://res.cloudinary.com/djtemmctt/image/upload/v1774293381/HOD_ztx99a.jpg" 
                    alt="Dr. Murali Krishna Enduri" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/90">
                    Dr. Murali Krishna Enduri
                  </h3>
                  <p className="text-white/50 text-sm md:text-base mt-1">
                    Head of Department - Computer Science and Engineering
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-block flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-mono tracking-[0.4em] text-white/40 uppercase w-48 shrink-0 pt-6">
              Faculty Advisor
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group p-4 -ml-4 md:p-6 md:-ml-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-500 w-full max-w-2xl cursor-pointer">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20 shrink-0">
                <img 
                  src="https://res.cloudinary.com/djtemmctt/image/upload/v1774293381/Priyanka_qcbe5c.jpg" 
                  alt="Dr. Priyanka" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/90">
                  Dr. Priyanka
                </h3>
                <p className="text-white/50 text-sm md:text-base mt-1">
                  Associate Head of Department - CSE
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* WHY SINGULARITY GRID */}
        <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/10 mt-16">
          <div className="reveal-block text-center mb-24">
            <img src={singularityLogo} alt="Singularity Student Lab Logo" className="w-16 h-16 object-contain mx-auto mb-8 opacity-50" />
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
              Why Singularity?
            </h2>
          </div>

          <div className="why-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Learn by Doing",
                desc: "We build, prototype, and explore real-world problems through research-driven projects, hackathons, and innovation sprints."
              },
              {
                title: "Multi-Domain Labs",
                desc: "Whether you're into AI, Quantum, Robotics, Cybersecurity, or AR/VR — there's a place for you. Cross-domain projects are encouraged and supported."
              },
              {
                title: "Collaborate with the Best",
                desc: "Work with passionate students, dedicated mentors, and industry leaders. We're supported by the Microsoft Student Community and growing partnerships every semester."
              },
              {
                title: "Research with Impact",
                desc: "From publishing papers to building MVPs — we incubate ideas that can evolve into startups, research publications, or community-focused solutions."
              }
            ].map((feature, i) => (
              <div key={i} className="why-card group relative p-6 md:p-10 bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors duration-500">
                <div className="text-[10px] font-mono tracking-widest text-white/30 mb-6">0{i + 1} // CAPABILITY</div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{feature.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </section>

        {/* AN OPTIMISTIC APPROACH */}
        <section className="max-w-5xl mx-auto px-6 py-32 border-t border-white/10">
          <div className="reveal-block border-l-2 border-white/20 pl-6 md:pl-16 py-4">
            <h2 className="text-sm font-mono tracking-[0.4em] text-white/40 uppercase mb-12">
              An Optimistic Approach
            </h2>
            
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 md:mb-6">Quantum Horizons</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                  Quantum computing is reshaping cybersecurity, AI, and complex problem-solving. We provide tools for students to explore quantum algorithms and real-world applications.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 md:mb-6">Decentralized Trust</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                  Web3 and blockchain technologies are redefining data ownership, transparency, and digital trust. We build decentralized applications that empower users and secure the internet of tomorrow.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 md:mb-6">Immersive Realities</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                  By bridging the physical and digital worlds through Mixed Reality (XR), we are creating intuitive, spatial experiences that transform how we learn, interact, and solve problems.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 md:mb-6">Inclusive Progress</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                  With low-code and no-code platforms, we enable students from all backgrounds to develop solutions without deep programming expertise. Empowering non-tech innovators is key to our mission.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}