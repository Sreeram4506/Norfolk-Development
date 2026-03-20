import { useState, useEffect } from 'react';

interface NavigationProps {
  isTransparent?: boolean;
}

const Navigation = ({ isTransparent = true }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center"
            >
              <img 
                src="/logo.png" 
                alt="Norfolk Development" 
                className={`h-12 w-auto object-contain transition-all duration-300 ${
                  isScrolled ? 'brightness-0' : 'brightness-0 invert'
                }`} 
              />
            </a>

            {/* Contact Button */}
            <div className="ml-auto">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className={`text-xs font-bold tracking-[0.2em] transition-all duration-300 px-6 py-2 rounded-full border ${
                  isScrolled
                    ? 'text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
                    : 'text-white border-white hover:bg-white hover:text-[#1a1a1a]'
                }`}
              >
                CONTACT
              </a>
            </div>

            {/* Mobile Menu Button - Keeping it just in case, but user said remove everything. 
                However, a contact button on mobile might need it. 
                Actually, the user said "remove everything from the navbar just keep the contact button".
                So I'll probably remove the mobile menu button too and just keep the contact button there.
            */}
          </div>
        </div>
      </nav>


    </>
  );
};

export default Navigation;
