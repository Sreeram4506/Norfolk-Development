import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Water University',
    description: 'This 9,380-square-foot Water University facility includes operation equipment that clients will use to learn how to minimize water use. It also has spaces to hold seminars and workshops and in one year more than 2,200 global visitors will be hosted here. Some of the highlights include interactive, touch-screen displays and a large immersion portal/video room and leading-technology before it is ready for market.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
  },
  {
    id: 2,
    title: 'Corporate Headquarters',
    description: 'A state-of-the-art 50,000 square foot corporate headquarters featuring open collaborative spaces, executive suites, and cutting-edge technology infrastructure. The project included sustainable design elements and achieved LEED Gold certification.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  },
  {
    id: 3,
    title: 'Manufacturing Facility',
    description: 'A 200,000 square foot manufacturing facility designed for optimal workflow and efficiency. The project included specialized equipment foundations, clean room environments, and advanced HVAC systems for precision manufacturing.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80',
  },
  {
    id: 4,
    title: 'Healthcare Renovation',
    description: 'A complete renovation of a 35,000 square foot medical facility, transforming outdated spaces into modern patient-centered environments. The project was completed in phases to maintain continuous operations.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
  },
  {
    id: 5,
    title: 'Educational Campus',
    description: 'A multi-building educational campus featuring classrooms, laboratories, and collaborative learning spaces. The project incorporated sustainable materials and energy-efficient systems throughout.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
  },
];

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
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

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentProject];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen bg-white py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-20">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="label-text text-black/60 mb-4 block">Our Work</span>
          <h2 className="heading-lg text-[#1a1a1a]">Featured Projects</h2>
        </div>

        {/* Project Display */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Project Navigation & Info */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Project Numbers */}
            <div className="flex items-center gap-4 mb-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`text-sm font-medium transition-colors ${
                    index === currentProject
                      ? 'text-black font-bold'
                      : 'text-[#999999] hover:text-[#1a1a1a]'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
              <div className="flex-1 h-px bg-[#e5e5e5]" />
              <button
                onClick={() => setCurrentProject(-1)}
                className="text-sm font-medium text-[#999999] hover:text-[#1a1a1a] transition-colors"
              >
                ALL WORKS
              </button>
            </div>

            {/* Project Title */}
            <h3 className="heading-md text-black mb-6">{project.title}</h3>

            {/* Project Description */}
            <p className="body-md text-[#666666] leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevProject}
                className="w-12 h-12 border border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={nextProject}
                className="w-12 h-12 border border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                <ArrowRight size={20} />
              </button>
              <span className="ml-4 text-sm text-[#999999]">
                {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right - Project Image */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                key={project.id}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Black Accent Block */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black" />
          </div>
        </div>

        {/* All Projects Grid (shown when ALL WORKS is selected) */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
              onClick={() => setCurrentProject(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <h4 className="text-lg font-semibold text-[#1a1a1a] group-hover:text-black transition-colors">
                {proj.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
