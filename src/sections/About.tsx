import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const About = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-white py-20 lg:py-32"
    >
      {/* Hero Image */}
      <div className="relative h-[50vh] lg:h-[70vh] mb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
            alt="Norfolk Development Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 lg:px-20 -mt-32 relative z-10">
        <div
          className={`bg-white p-8 lg:p-16 shadow-xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-lg text-[#1a1a1a] mb-8">
            We build possibilities.
          </h2>

          <div className="space-y-6 body-md text-[#666666] leading-relaxed">
            <p
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              In 1997, Norfolk Development opened its doors in a rented storefront in suburban Chicago. 
              We had four staff, a handful of carpenters, two folding card tables, and a computer. 
              We also had drive, commitment, energy, and a vision.
            </p>

            <p
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Two decades later, we've grown to become a comprehensive construction management team 
              and general contractor working in 15 states and counting. We do more than build spaces—
              we create environments where your team can grow, thrive, and innovate. Our superpower 
              as a company is the ability to hear your need, envision it, and deliver against it.
            </p>

            <p
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              To do that, we create customized solutions for new construction, additions, and renovations. 
              We've built a team of in-house experts as well as a broad network of specialists so that 
              we can deliver exactly what you need in creative solutions, technology, and materials. 
              With every project, we strive to create—and realize—a vision that fulfills the client's 
              needs and results in an extraordinary environment.
            </p>

            <p
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              While we've grown, a few fundamentals have remained constant. We're still a family-owned 
              business with client commitment and superior partnership foremost in mind on every job. 
              We're still driven to bring creative solutions and expertise to every challenge. We also 
              love what we do—and it shows, in both the quality of our work and in the enduring 
              relationships that have fueled our company growth.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-8 lg:px-20 mt-20">
        <div
          className={`text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="heading-md text-[#1a1a1a] mb-6">
            We're always looking to build the next great thing.
            <br />
            <span className="text-black/60">Is it yours?</span>
          </h3>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-black/90 transition-colors"
          >
            Let's talk
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#1a1a1a] py-20 lg:py-32 mt-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: '25+', label: 'Years of Experience' },
              { number: '15', label: 'States Served' },
              { number: '500+', label: 'Projects Completed' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                <div className="text-5xl lg:text-6xl font-bold text-white mb-4">
                  {stat.number}
                </div>
                <div className="text-sm text-white/70 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
