import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Slides from './sections/Slides';
import Solutions from './sections/Solutions';
import About from './sections/About';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="relative">
      {/* Navigation */}
      <Navigation />

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
