import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PhilosophySection from '@/components/PhilosophySection';
import AboutSection from '@/components/AboutSection';
import RadioDialSection from '@/components/RadioDialSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Scene from '@/components/Scene';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <Scene />
      <Header />
      <HeroSection />
      <PhilosophySection />
      <AboutSection />
      <RadioDialSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
