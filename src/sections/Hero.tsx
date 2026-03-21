import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 6;
      videoRef.current.play().catch(() => {
        // Autoplay was prevented
      });
    }
    setIsLoaded(true);
  }, []);

  const scrollToIntro = () => {
    const introSection = document.querySelector('#intro');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="video-background h-screen w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="video-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center items-center px-6">
        <div
          className={`text-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Large Number */}
          <div className="mb-4">
            <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-white leading-none opacity-20">
              100
            </span>
          </div>

          {/* Tagline */}
          <p className="text-white text-lg md:text-xl tracking-[0.3em] uppercase font-light">
            quality is our standard
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToIntro}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-white flex flex-col items-center group cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
          Scroll to discover
        </span>
        <ChevronDown className="scroll-bounce" size={24} />
      </button>
    </section>
  );
};

export default Hero;
