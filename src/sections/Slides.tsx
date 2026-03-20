import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface Slide {
  id: number;
  label: string;
  title: string;
  description?: string;
  link?: string;
  linkText?: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    label: 'Our story',
    title: 'Quality is not only our standard.\nIt\'s also an attitude instilled in our company.',
    bgImage: '/videos/framing.mp4',
  },
  {
    id: 2,
    label: 'Our approach',
    title: 'We listen. We plan. We deliver.\nEvery project is a partnership.',
    bgImage: '/videos/footing.mp4',
  },
  {
    id: 3,
    label: 'Our expertise',
    title: 'Decades of experience\nbuilding extraordinary spaces.',
    bgImage: '/videos/kitchen.mp4',
  },
  {
    id: 4,
    label: 'Our process',
    title: 'From concept to completion,\nwe manage every detail.',
    bgImage: '/videos/hero-video.mp4',
  },
  {
    id: 5,
    label: 'Our projects',
    title: 'Creating environments\nwhere teams thrive.',
    bgImage: '/videos/framing.mp4',
  },
  {
    id: 6,
    label: 'Our safety services',
    title: 'Building a safer workplace.',
    description: 'At Norfolk Development, our team members share a commitment to high safety standards, enabling us to provide the safest and healthiest work environment possible. It begins with employee orientation and continues through ongoing training and important initiatives such as weekly on-site inspections and training sessions, employing only OSHA trained and certified carpenters and incorporating safety as an integral part of our work plans.',
    link: '#solutions',
    linkText: 'Discover more about our safety services',
    bgImage: '/videos/footing.mp4',
  },
  {
    id: 7,
    label: 'Our personal commitment',
    title: 'At its heart, construction isn\'t about structures. It\'s about people.',
    bgImage: '/videos/kitchen.mp4',
  },
];

const Slides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isScrolling = useRef(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setShowContent(false);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => {
        setShowContent(true);
        setIsAnimating(false);
      }, 100);
    }, 300);
  }, [currentSlide, isAnimating]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isAnimating) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      
      if (rect.top > 0 || rect.bottom < 0) return;

      const progress = scrolled / (sectionHeight - window.innerHeight);
      const index = Math.min(slides.length - 1, Math.max(0, Math.floor(progress * slides.length + 0.5)));
      
      if (index !== currentSlide) {
        setIsAnimating(true);
        setShowContent(false);
        
        setTimeout(() => {
          setCurrentSlide(index);
          setTimeout(() => {
            setShowContent(true);
            setIsAnimating(false);
          }, 100);
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSlide, isAnimating]);

  const slide = slides[currentSlide];

  return (
    <section
      id="slides"
      ref={sectionRef}
      className="relative bg-[#1a1a1a]"
      style={{ height: `${slides.length * 100}vh` }}
    >
      {/* Snap Points */}
      <div className="absolute inset-0 z-0">
        {slides.map((_, i) => (
          <div key={i} className="h-screen w-full" style={{ scrollSnapAlign: 'start' }} />
        ))}
      </div>

      {/* Fixed Slide Content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <video
            key={slide.bgImage}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={slide.bgImage} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Slide Navigation - Left Side */}
        <div className="absolute left-8 lg:left-16 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col items-center space-y-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const target = sectionRef.current?.offsetTop || 0;
                  window.scrollTo({
                    top: target + index * window.innerHeight,
                    behavior: 'smooth'
                  });
                }}
                className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute left-8 lg:left-16 bottom-20 z-20">
          <div className="text-white/60 text-sm font-medium">
            <span className="text-white text-lg">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-8 lg:px-32">
          <div
            className={`max-w-4xl text-center transition-all duration-500 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Label */}
            <div className="mb-6">
              <span className="label-text text-white/60">
                {slide.label}
              </span>
            </div>

            {/* Title */}
            <h2 className="heading-xl text-white whitespace-pre-line leading-tight mb-8">
              {slide.title}
            </h2>

            {/* Description (if exists) */}
            {slide.description && (
              <p className="body-lg text-white/80 max-w-2xl mx-auto mb-8">
                {slide.description}
              </p>
            )}

            {/* Link (if exists) */}
            {slide.link && (
              <a
                href={slide.link}
                className="inline-flex items-center text-white text-sm tracking-widest uppercase border-b border-white/30 pb-2 hover:border-white transition-colors"
              >
                {slide.linkText}
              </a>
            )}
          </div>
        </div>

        {/* Scroll to Explore - Right Side */}
        {currentSlide < slides.length - 1 && (
          <div className="absolute right-8 lg:right-16 bottom-20 z-20 text-white flex flex-col items-center group pointer-events-none">
            <span className="text-xs tracking-widest uppercase mb-2 opacity-70 transition-opacity writing-mode-vertical">
              Scroll to explore
            </span>
            <ChevronDown className="scroll-bounce" size={24} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Slides;
