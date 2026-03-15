'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '@/lib/audioManager';
import { ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Text, Float, Environment } from '@react-three/drei';

function Success3DText({ name }: { name: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full">
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          fontSize={0.8}
          color="#a855f7" // purple-500
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          {`SUCCESS,\n${name.toUpperCase()}!`}
        </Text>
      </Float>
    </Canvas>
  );
}

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isIntaking, setIsIntaking] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [displayedText, setDisplayedText] = useState('Scale');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const texts = ['Scale', 'Elevate', 'Ascend', 'Transform', 'Build', 'Create', 'Impact', 'Evolve', 'Disrupt'];
    let isDeleting = false;
    let textIndex = 0;
    let currentText = 'Scale';
    let timer: NodeJS.Timeout;

    const type = () => {
      const fullText = texts[textIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }

      setDisplayedText(currentText);

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      timer = setTimeout(type, typeSpeed);
    };

    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setIsIntaking(true);
      audio.playSwoosh(0);
      
      // Dispatch event to move coin to navbar
      window.dispatchEvent(new CustomEvent('coin-store'));
      
      // Delay submission to allow animation
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }
  };

  return (
    <section id="contact-form" className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 py-32 z-10 bg-[#030303]">
      <div id="contact-coin-target" className="w-[60px] h-[60px] flex items-center justify-center mb-8"></div>
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        <div className="w-full md:w-1/2 flex flex-col space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-purple-400 font-bold flex items-center gap-4">
              <span className="w-8 h-[1px] bg-purple-400"></span>
              INITIATE CONTACT
            </h2>
          </div>
          <h3 className="text-4xl md:text-6xl font-serif leading-[1.1] tracking-tight text-white">
            Ready to <br />
            <span 
              className="italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pr-6 pb-4 pl-2"
            >
              {displayedText}
              <span className={`inline-block w-[2px] h-[1em] bg-purple-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>?
            </span>
          </h3>
          <p className="text-[#A0A0A0] font-sans">
            Fill out the form to secure your spot. We only work with projects that have the potential to shift the paradigm.
          </p>
        </div>

        <div className="w-full md:w-1/2 h-[400px] relative perspective-1000 z-50">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onSubmit={handleSubmit}
                className="absolute inset-0 flex flex-col gap-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md transform-style-3d shadow-2xl"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#A0A0A0]">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Satoshi Nakamoto"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#A0A0A0]">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="satoshi@bitcoin.org"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#A0A0A0]">Project Details</label>
                  <textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    className="bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-purple-400 transition-colors resize-none"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <motion.button 
                  type="submit"
                  animate={isIntaking ? { backgroundColor: "#a855f7", scale: 1.1 } : {}}
                  className="mt-auto group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-full bg-white blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                  {isIntaking ? "Intaking..." : "Submit Request"}
                  <span className="bg-black text-white rounded-full p-1 group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight size={14} />
                  </span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-purple-500/30 backdrop-blur-md p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-serif text-white mb-2">Message Received</h4>
                <p className="text-[#A0A0A0] text-sm">
                  Thanks, {name.split(' ')[0]}. We&apos;ll be in touch shortly to discuss your vision.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}
