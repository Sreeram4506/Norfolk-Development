import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Slides from './sections/Slides';
import Solutions from './sections/Solutions';
import About from './sections/About';
import Contact from './sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center z-50">
        <div className="text-center">
          {/* Logo Animation */}
          <img 
            src="/logo.png" 
            alt="Norfolk Development" 
            className="h-16 w-auto object-contain brightness-0 invert mx-auto mb-6 animate-pulse" 
          />
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-white animate-[loading_1.5s_ease-in-out_infinite]" 
              style={{
                animation: 'loading 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation */}
      <Navigation isTransparent={true} />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with Video */}
        <Hero />

        {/* Red Intro Section */}
        <Intro />

        {/* Full-screen Slides Section */}
        <Slides />

        {/* Solutions Section */}
        <Solutions />

        {/* About Section */}
        <About />

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
