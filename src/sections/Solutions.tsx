import { useEffect, useRef, useState } from 'react';
import { HardHat, Wrench, Monitor, Lock, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: HardHat,
    title: 'PROJECT MANAGEMENT',
    description: 'The art and science of making things happen',
  },
  {
    icon: Wrench,
    title: 'CARPENTRY',
    description: 'Shaping spaces with craftsmanship and attention to detail',
  },
  {
    icon: Monitor,
    title: 'AUDIOVISUAL',
    description: 'Technical expertise for basic to fully equipped spaces',
  },
  {
    icon: Lock,
    title: 'HARDWARE',
    description: 'High-security hardware knowledge and custom finishing details',
  },
];

const serviceCategories = [
  'Industrial',
  'New Construction',
  'Renovations',
  'Start-up',
  'Tenant Improvements',
];

const useReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

const Solutions = () => {
  const [heroRef, heroVisible] = useReveal();
  const [quoteRef, quoteVisible] = useReveal();
  const [emergencyRef, emergencyVisible] = useReveal();
  const [laborRef, laborVisible] = useReveal();
  const [expertsRef, expertsVisible] = useReveal();
  const [categoriesRef, categoriesVisible] = useReveal();
  const [brochureRef, brochureVisible] = useReveal();

  return (
    <section
      id="solutions"
      className="bg-white py-20 lg:py-32"
    >
      <div ref={heroRef as any} className="relative h-[60vh] lg:h-[80vh] mb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Modern Architecture"
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ${heroVisible ? 'scale-105' : 'scale-125'}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        
        <div className="relative h-full flex items-center px-8 lg:px-20">
          <div
            className={`max-w-xl reveal-initial reveal-left ${
              heroVisible ? 'reveal-visible' : ''
            }`}
          >
            <span className="label-text text-black mb-4 block">
              We provide
            </span>
            <h2 className="heading-xl text-[#1a1a1a] mb-6">
              Complete
              <br />
              Construction
              <br />
              Solutions
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] py-16 lg:py-24 px-8 lg:px-20 -mt-20 relative z-10 mx-4 lg:mx-20">
        <div
          ref={quoteRef as any}
          className={`max-w-3xl reveal-initial reveal-up ${
            quoteVisible ? 'reveal-visible' : ''
          }`}
        >
          <h3 className="heading-md text-white mb-6">
            We don't just build spaces. We create environments.
          </h3>
          <p className="body-md text-white/70">
            We offer customized construction services and capabilities for commercial and industrial 
            clients to help them refresh and reimagine their spaces. Whether yours is new construction, 
            an addition, or a renovation, we'll bring our expertise and innovation to the challenge.
          </p>
        </div>
      </div>

      <div ref={emergencyRef as any} className="py-20 lg:py-32 px-8 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              className={`reveal-initial reveal-left ${
                emergencyVisible ? 'reveal-visible' : ''
              }`}
            >
              <h3 className="heading-md text-[#1a1a1a] mb-6" style={{ transitionDelay: '200ms' }}>
                Norfolk Emergency Service Team
              </h3>
              <p className="body-md text-[#666666] mb-8" style={{ transitionDelay: '400ms' }}>
                We know emergencies don't happen when it's convenient, so we offer 24/7 service 
                staff to handle the unexpected at your site. With our team, you're covered for 
                fast response and recovery.
              </p>
            </div>
            <div
              className={`reveal-initial reveal-right ${
                emergencyVisible ? 'reveal-visible' : ''
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Construction Worker"
                className="w-full h-auto shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={laborRef as any} className="py-20 lg:py-32 px-8 lg:px-20 bg-[#f5f5f5] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              className={`order-2 lg:order-1 reveal-initial reveal-left ${
                laborVisible ? 'reveal-visible' : ''
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                alt="Construction Site"
                className="w-full h-auto shadow-xl"
              />
            </div>
            <div
              className={`order-1 lg:order-2 reveal-initial reveal-right ${
                laborVisible ? 'reveal-visible' : ''
              }`}
            >
              <h3 className="heading-md text-[#1a1a1a] mb-6" style={{ transitionDelay: '200ms' }}>
                Ours is a labor of love.
              </h3>
              <p className="body-md text-[#666666] mb-6" style={{ transitionDelay: '400ms' }}>
                Let's face it—the work we do with clients isn't just about the walls. It's about 
                everything that happens within them: productivity, innovation, breakthroughs, and progress.
              </p>
              <p className="body-md text-[#666666] mb-6" style={{ transitionDelay: '600ms' }}>
                That's why we work with each and every client to create spaces keyed to business needs.
              </p>
              <p className="body-md text-[#666666]" style={{ transitionDelay: '800ms' }}>
                We combine our knowledge of technology and trends with our construction expertise 
                to build what's next for you—and to ensure it performs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div ref={expertsRef as any} className="bg-black py-20 lg:py-32 px-8 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 reveal-initial reveal-up ${
              expertsVisible ? 'reveal-visible' : ''
            }`}
          >
            <h3 className="heading-md text-white mb-4">
              Our in-house experts
            </h3>
            <p className="body-md text-white/80 max-w-2xl mx-auto">
              With expertise on the team, we can offer creative and complete construction solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`text-center transition-all duration-1000 reveal-initial reveal-up ${
                  expertsVisible ? 'reveal-visible' : ''
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 flex justify-center">
                  <service.icon className="w-12 h-12 text-white/80" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wider mb-3">
                  {service.title}
                </h4>
                <p className="text-sm text-white/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={categoriesRef as any} className="py-20 lg:py-32 px-8 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              className={`reveal-initial reveal-left ${
                categoriesVisible ? 'reveal-visible' : ''
              }`}
            >
              <ul className="space-y-4">
                {serviceCategories.map((category, index) => (
                  <li
                    key={category}
                    className={`text-3xl lg:text-4xl font-light ${
                      index === 0 ? 'text-[#1a1a1a] font-semibold' : 'text-[#999999]'
                    } transition-all duration-700 hover:text-[#1a1a1a] cursor-pointer`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`reveal-initial reveal-right ${
                categoriesVisible ? 'reveal-visible' : ''
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                alt="Industrial Construction"
                className="w-full h-auto shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-8 lg:px-20 bg-[#f5f5f5]">
        <div
          ref={brochureRef as any}
          className={`max-w-4xl mx-auto text-center reveal-initial reveal-up ${
            brochureVisible ? 'reveal-visible' : ''
          }`}
        >
          <p className="body-lg text-[#666666] mb-8">
            Learn more about Norfolk Development and our capabilities—download one of our brochures.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-black/90 transition-colors">
            Download file
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
