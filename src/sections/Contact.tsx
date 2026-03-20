import { useState, useEffect, useRef } from 'react';
import { Send, User, Building, Mail, Phone, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

type ContactType = 'project' | 'partner' | 'career';

const Contact = () => {
  const [activeTab, setActiveTab] = useState<ContactType>('project');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: formData.name,
        company: formData.company,
        reply_to: formData.email,
        phone: formData.phone,
        message: formData.message,
        category: activeTab,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
      );
      
      setIsSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Sorry, there was an error sending your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const tabs: { id: ContactType; label: string; title: string }[] = [
    { id: 'project', label: 'project', title: 'Request our service for a project' },
    { id: 'partner', label: 'partner', title: 'Working with us as a Vendor' },
    { id: 'career', label: 'Get in touch', title: 'Join the team Norfolk Development' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-white"
    >
      {/* Hero Image */}
      <div className="relative h-[40vh] lg:h-[50vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Construction Professional"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 lg:px-20 -mt-20 relative z-10 pb-20">
        <div
          className={`bg-white p-8 lg:p-16 shadow-xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="label-text text-black mb-4 block">Say Hello !</span>
            <h2 className="heading-md text-[#1a1a1a]">
              For a project, as a partner or as a team.
            </h2>
          </div>

          {/* Description */}
          <p
            className={`body-md text-[#666666] text-center mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            We are blending physical building structures from concepts and ideas to link people 
            and space to the solution they need to be more efficient and productive. If you're 
            a potential employee or want become a vendor or have a project we can discuss our 
            journey together begins here.
          </p>

          {/* Tabs */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm tracking-widest uppercase transition-all ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'bg-[#f5f5f5] text-[#666666] hover:bg-[#e5e5e5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Title */}
          <h3
            className={`text-xl font-semibold text-[#1a1a1a] text-center mb-8 transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {tabs.find(t => t.id === activeTab)?.title}
          </h3>

          {/* Form */}
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#e31e24] rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                Thank you for reaching out!
              </h4>
              <p className="text-[#666666]">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#999999]" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-[#e5e5e5] focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#999999]" size={18} />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full pl-12 pr-4 py-4 border border-[#e5e5e5] focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#999999]" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-[#e5e5e5] focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#999999]" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full pl-12 pr-4 py-4 border border-[#e5e5e5] focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-[#999999]" size={18} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={5}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-[#e5e5e5] focus:border-[#e31e24] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1a1a1a] text-white py-4 text-sm tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-12">
        <div className="max-w-7xl mx-auto px-8 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Norfolk Development" 
                className="h-10 w-auto object-contain brightness-0 invert" 
              />
            </div>

            {/* Copyright & Phone */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              <p className="text-sm text-white/50">
                © {new Date().getFullYear()} Norfolk Development. All rights reserved.
              </p>
              <a href="tel:7812232490" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                <Phone size={14} />
                781-223-2490
              </a>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
