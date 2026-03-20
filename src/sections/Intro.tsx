import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSlides = () => {
    const slidesSection = document.querySelector('#slides');
    if (slidesSection) {
      slidesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="section-fullscreen bg-black relative overflow-hidden"
    >
      <div className="h-full flex flex-col justify-center px-8 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Label */}
          <div
            className={`mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="label-text text-white/60">
              Experts since 1997
            </span>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Main Heading */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="heading-lg text-white leading-tight">
                Norfolk Development is a comprehensive construction management team and general contractor.
              </h2>
            </div>

            {/* Right Column - Description */}
            <div
              className={`flex flex-col justify-end transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <p className="body-lg text-white/90 leading-relaxed">
                We create environments for your team to do its best work. We do it through expertise, 
                creativity, and attention to every detail—our ingredients for over 20 years of success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Discover */}
      <button
        onClick={scrollToSlides}
        className="absolute bottom-10 right-10 z-10 text-white flex flex-col items-center group cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
          Scroll to discover
        </span>
        <ChevronDown className="scroll-bounce" size={24} />
      </button>
    </section>
  );
};

export default Intro;
