'use client';

import { motion } from 'motion/react';

const testimonials = [
  { name: 'Animoca Brands', title: 'Ecosystem Lead', quote: 'They scaled our ecosystem beyond expectations. The results were immediate and the team was incredibly responsive to our needs.', avatar: 'https://picsum.photos/seed/animoca/100/100' },
  { name: 'Immutable', title: 'Product Manager', quote: 'A paradigm shift in digital experience. It has completely transformed the way we approach problems and develop solutions for our users.', avatar: 'https://picsum.photos/seed/immutable/100/100' },
  { name: 'Sandbox', title: 'Creative Director', quote: 'The most innovative team we have worked with. They bring a unique perspective that is truly unmatched in the industry.', avatar: 'https://picsum.photos/seed/sandbox/100/100' },
  { name: 'Monad', title: 'Tech Lead', quote: 'Unmatched technical expertise. They helped us cut costs and improve our end product significantly.', avatar: 'https://picsum.photos/seed/monad/100/100' },
  { name: 'Polygon', title: 'Operations', quote: 'They understand the future of web3. Highly recommended for anyone looking to enhance their efficiency and productivity.', avatar: 'https://picsum.photos/seed/polygon/100/100' },
  { name: 'Chainlink', title: 'Developer', quote: 'Incredible speed and reliability. It is a robust solution that fits perfectly into our workflow.', avatar: 'https://picsum.photos/seed/chainlink/100/100' },
  { name: 'Starknet', title: 'Architect', quote: 'A robust solution that fits perfectly into our workflow. It has enhanced our team capabilities and allowed us to tackle more complex projects.', avatar: 'https://picsum.photos/seed/starknet/100/100' },
  { name: 'Arbitrum', title: 'Analyst', quote: 'It has saved us countless hours. Highly recommended for anyone looking to enhance their efficiency and productivity. The tool is simply revolutionary.', avatar: 'https://picsum.photos/seed/arbitrum/100/100' },
  { name: 'Optimism', title: 'Founder', quote: 'It is like having a superpower! This AI tool has given us the ability to do things we never thought were possible in our field.', avatar: 'https://picsum.photos/seed/optimism/100/100' },
];

export default function TestimonialsSection() {
  const col1 = testimonials.slice(0, 3);
  const col2 = testimonials.slice(3, 6);
  const col3 = testimonials.slice(6, 9);

  return (
    <section className="pt-0 pb-24 bg-[#030303] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-5xl font-serif mb-2 text-center">Loved by thousands of people</h2>
        <p className="text-[#888] text-center mb-24">Here&apos;s what some of our users have to say about Ascend.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[col1, col2, col3].map((col, colIndex) => (
            <div 
              key={colIndex} 
              className={`space-y-6 ${colIndex === 1 ? 'md:mt-[-4rem]' : ''}`}
            >
              {col.map((t, i) => (
                <div 
                  key={i} 
                  className="relative p-[1px] rounded-3xl overflow-hidden bg-[#1a1a1a]"
                >
                  {/* Snake border animation - slower, longer segment */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_280deg,#6366f1_320deg,#ec4899_360deg)] animate-[spin_15s_linear_infinite]" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_280deg,#6366f1_320deg,#ec4899_360deg)] animate-[spin_15s_linear_infinite] blur-md opacity-40" />
                  
                  {/* Card background - higher contrast */}
                  <div className="relative h-full flex flex-col bg-[#121212] rounded-[22px] p-8">
                    <div className="text-purple-500 mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"/></svg>
                    </div>
                    <p className="text-lg text-[#D0D0D0] mb-8 flex-grow leading-relaxed">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10" />
                      <div>
                        <h4 className="text-white font-bold text-lg">{t.name}</h4>
                        <p className="text-sm text-[#888]">{t.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
