'use client';

import { motion } from 'motion/react';

const testimonials = [
  { name: 'Animoca Brands', quote: 'They scaled our ecosystem beyond expectations.' },
  { name: 'Immutable', quote: 'A paradigm shift in digital experience.' },
  { name: 'Sandbox', quote: 'The most innovative team we have worked with.' },
  { name: 'Monad', quote: 'Unmatched technical expertise.' },
];

export default function Testimonials() {
  return (
    <div className="w-full overflow-hidden py-16 bg-[#030303]">
      <motion.div 
        className="flex gap-8"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="min-w-[300px] p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <p className="text-sm text-[#A0A0A0] mb-4">&quot;{t.quote}&quot;</p>
            <h4 className="text-white font-bold">{t.name}</h4>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
