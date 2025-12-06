
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Zap, Menu, X, ArrowRight, Command, 
  Globe, Lock, Activity, Cpu, 
  ChevronRight, Terminal, BarChart2, Shield,
  Layers, Box, Image as ImageIcon, Sliders,
  Sparkles, Aperture, Maximize, Download,
  CheckCircle2, HelpCircle, Plus, Loader2,
  Mail, Key
} from 'lucide-react';

// --- UTILS ---
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// --- DATA ---
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=800&auto=format&fit=crop"
];

const FEATURES = [
  { title: "Real-time Diffusion", desc: "Generate 4 images in <0.8s using our H100 clusters.", icon: Zap, size: "large" },
  { title: "Neural Upscale", desc: "Native 8K resolution support.", icon: Maximize, size: "small" },
  { title: "Style Control", desc: "Reference image adapters.", icon: Sliders, size: "small" },
  { title: "Prompt Instruction", desc: "Adheres to 99% of complex linguistic prompts.", icon: Terminal, size: "medium" },
];

const FAQS = [
  { q: "Who owns the commercial rights?", a: "You do. Every pixel generated on Aether Pro is 100% yours to use commercially, royalty-free." },
  { q: "How does the credit system work?", a: "Generations cost 'Flux'. 1 Flux = 1 Standard Image. You get 500/mo on the Starter plan." },
  { q: "Can I fine-tune my own models?", a: "Yes. The Studio plan allows for custom LoRA training on your own datasets." },
];

// --- INTERACTIVE PRIMITIVES ---

// 1. Magnetic Button (Enhanced Physics)
const MagneticButton = ({ children, className = "", onClick, variant = "primary" }: { children?: ReactNode; className?: string; onClick?: () => void; variant?: "primary" | "secondary" | "glass" }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (e.clientX - centerX) * 0.25; 
    const y = (e.clientY - centerY) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border border-transparent shadow-[0_0_30px_rgba(255,255,255,0.15)]",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white hover:text-black",
    glass: "bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 hover:border-white/30"
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className={cn(
        "relative transition-transform duration-200 ease-out flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium tracking-tight text-sm md:text-base group overflow-hidden",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-500 ease-out" />
      )}
    </button>
  );
};

// 2. Magnetic Text
const MagneticText = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
        <div className={cn("flex flex-wrap gap-x-[0.25em] gap-y-1 justify-center", className)}>
            {text.split(" ").map((word, i) => (
                 <span key={i} className="inline-block hover:text-white transition-colors duration-300 cursor-default group">
                    {word.split("").map((char, j) => (
                        <span key={j} className="inline-block group-hover:-translate-y-1 transition-transform duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]">{char}</span>
                    ))}
                 </span>
            ))}
        </div>
    )
}

// 3. Reveal on Scroll
const RevealOnScroll = ({ children, className = "" }: { children?: ReactNode; className?: string; key?: any }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("transition-all duration-1000 transform", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12", className)}>
      {children}
    </div>
  );
};

// --- AUTH MODAL (NEW) ---

const AuthModal = ({ isOpen, onClose, initialMode = 'signup' }: { isOpen: boolean; onClose: () => void; initialMode?: 'login' | 'signup' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 animate-pulse-slow">
             <Aperture className="w-6 h-6 text-white" />
          </div>
          
          <h2 className="text-2xl font-medium tracking-tight mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join the Beta'}
          </h2>
          <p className="text-white/40 text-sm mb-8 text-center max-w-[260px]">
            {mode === 'login' 
              ? 'Enter your credentials to access the Neural Engine.' 
              : 'Start creating with 500 free Flux credits.'}
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
             {mode === 'signup' && (
                <div className="group relative">
                  <input type="text" placeholder="Username" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors peer" />
                </div>
             )}
             <div className="group relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 peer-focus:text-white/50 transition-colors" />
               <input type="email" placeholder="Email address" className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors peer" />
             </div>
             <div className="group relative">
               <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 peer-focus:text-white/50 transition-colors" />
               <input type="password" placeholder="Password" className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors peer" />
             </div>

             <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
             >
               {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
             </button>
          </form>

          <div className="mt-6 text-xs text-white/30">
            {mode === 'login' ? "Don't have an account? " : "Already have access? "}
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-white hover:underline underline-offset-4 font-medium"
            >
              {mode === 'login' ? 'Request Access' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- THE MONOLITH (HERO INTERFACE) ---

const Hero3DInterface = ({ onDownload }: { onDownload: () => void }) => {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [activeTab, setActiveTab] = useState<'dream' | 'tune' | 'vault'>('dream');
    const [isGenerating, setIsGenerating] = useState(false);
    
    // Smooth mouse lerp
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            setMousePos({ x: e.clientX / innerWidth, y: e.clientY / innerHeight });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const rotateX = (mousePos.y - 0.5) * 6; 
    const rotateY = (mousePos.x - 0.5) * -6;

    // Simulate generation loop
    useEffect(() => {
      if(activeTab === 'dream') {
        const timer = setInterval(() => {
          setIsGenerating(true);
          setTimeout(() => setIsGenerating(false), 2000);
        }, 5000);
        return () => clearInterval(timer);
      }
    }, [activeTab]);

    const renderDream = () => (
        <div className="h-full flex flex-col animate-fade-in-up">
            {/* Image Preview Area */}
            <div className="flex-1 relative rounded-lg border border-white/10 bg-black overflow-hidden group">
                <div 
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-all duration-700",
                    isGenerating ? "opacity-50 blur-xl scale-110" : "opacity-100 blur-0 scale-100"
                  )}
                  style={{backgroundImage: 'url("https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=800&auto=format&fit=crop")'}}
                ></div>
                
                {/* Overlay UI */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    {isGenerating && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                        <div className="text-xs font-mono text-white/50 tracking-widest">DIFFUSING...</div>
                      </div>
                    )}
                    <div className="flex justify-between items-end">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur text-[10px] rounded border border-white/5">v4.0 Model</span>
                        <span className="px-2 py-1 bg-white/10 backdrop-blur text-[10px] rounded border border-white/5">1024x1024</span>
                      </div>
                      <button 
                        onClick={onDownload}
                        className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform hover:bg-emerald-400"
                        title="Download Asset"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                </div>
            </div>

            {/* Prompt Input */}
            <div className="mt-4 h-14 bg-white/5 border border-white/10 rounded-lg flex items-center px-4 gap-3">
                <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                <div className="flex-1 font-mono text-xs text-white/50 truncate">
                    a futuristic city floating in void, obsidian monoliths, volumetric lighting, 8k --ar 16:9
                </div>
                <div className="w-px h-4 bg-white/10 mx-2"></div>
                <button 
                  onClick={() => setIsGenerating(true)}
                  className="text-[10px] font-bold bg-white text-black px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
                >
                    {isGenerating ? 'PROCESSING' : 'GENERATE'}
                </button>
            </div>
        </div>
    );

    const renderTune = () => (
        <div className="h-full flex flex-col gap-4 animate-fade-in-up p-2">
            {[
              { label: 'Guidance Scale', val: 7.5, max: 20 },
              { label: 'Inference Steps', val: 50, max: 100 },
              { label: 'Seed', val: 849201, max: 999999 },
            ].map((control, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 p-4 rounded-lg">
                <div className="flex justify-between text-xs text-white/60 mb-2">
                  <span>{control.label}</span>
                  <span className="font-mono">{control.val}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/40 rounded-full" style={{width: `${(control.val / control.max) * 100}%`}}></div>
                </div>
              </div>
            ))}
            <div className="mt-auto p-4 border border-dashed border-white/10 rounded-lg flex items-center justify-center gap-3 text-xs text-white/30 hover:bg-white/5 cursor-pointer transition-colors">
              <Plus className="w-4 h-4" />
              Add ControlNet Adapter
            </div>
        </div>
    );

    const renderVault = () => (
        <div className="h-full grid grid-cols-3 gap-3 animate-fade-in-up overflow-hidden content-start">
             {GALLERY_IMAGES.slice(0, 9).map((img, i) => (
                 <div key={i} className="aspect-square rounded border border-white/5 overflow-hidden group relative cursor-pointer" onClick={onDownload}>
                    <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
             ))}
        </div>
    );

    return (
        <div 
            className="w-full max-w-5xl mx-auto h-[550px] md:h-[650px] perspective-2000 relative z-20 mt-8 md:mt-0"
        >
            <div 
                className="relative w-full h-full transition-all duration-100 ease-out"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* THE SLAB (Main Interface) */}
                <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-[0_0_120px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col">
                    
                    {/* Header / Tabs */}
                    <div className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                           <span className="font-mono text-[10px] text-white/40 tracking-[0.2em]">AETHER_CORE::READY</span>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-black/50 p-1.5 rounded-xl border border-white/5">
                            {[
                                { id: 'dream', icon: Sparkles, label: 'Dream' },
                                { id: 'tune', icon: Sliders, label: 'Tune' },
                                { id: 'vault', icon: Layers, label: 'Vault' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all",
                                        activeTab === tab.id 
                                            ? "bg-white text-black shadow-lg shadow-white/10" 
                                            : "text-white/40 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Content Area */}
                    <div className="flex-1 p-6 md:p-8 bg-gradient-to-b from-white/[0.02] to-transparent relative">
                        {/* Scanline */}
                        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                        
                        {activeTab === 'dream' && renderDream()}
                        {activeTab === 'tune' && renderTune()}
                        {activeTab === 'vault' && renderVault()}
                    </div>

                    {/* Footer Stats */}
                    <div className="h-10 border-t border-white/5 bg-black/60 flex items-center px-8 gap-6 text-[10px] font-mono text-white/30">
                        <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> GPU: H100 CLUSTER</span>
                        <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> LATENCY: 42ms</span>
                        <span className="ml-auto text-emerald-500">SYSTEM STABLE</span>
                    </div>
                </div>

                {/* Glare & Depth */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none rounded-3xl"
                    style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
                ></div>
                <div 
                    className="absolute -inset-4 border border-white/5 rounded-[2rem] -z-10 opacity-30"
                    style={{ transform: 'translateZ(-20px)' }}
                ></div>
            </div>
        </div>
    );
};

// --- SECTIONS ---

const Navbar = ({ onOpenAuth, onScrollTo }: { onOpenAuth: (mode?: 'login'|'signup') => void; onScrollTo: (id: string) => void }) => (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Aperture className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-700" />
            <span className="font-bold text-xl tracking-tighter">Aether</span>
        </div>
        <div className="pointer-events-auto hidden md:flex items-center gap-8 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
            {['Showcase', 'Engine', 'Pricing'].map(item => (
                <button 
                  key={item} 
                  onClick={() => onScrollTo(item.toLowerCase())}
                  className="text-xs font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {item}
                </button>
            ))}
             <button className="text-xs font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider">API</button>
        </div>
        <div className="pointer-events-auto flex gap-4">
            <button 
              onClick={() => onOpenAuth('login')}
              className="text-sm font-medium hover:text-white/70 transition-colors"
            >
              Log in
            </button>
            <MagneticButton variant="primary" className="px-5 py-2 text-xs h-9" onClick={() => onOpenAuth('signup')}>
                Get Access
            </MagneticButton>
        </div>
    </nav>
);

const GallerySection = () => (
  <section id="showcase" className="py-32 px-4 relative z-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
      <RevealOnScroll>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4">Unreal Fidelity</h2>
        <p className="text-white/50 max-w-md">Generated entirely by Aether v4. No post-processing.</p>
      </RevealOnScroll>
      <RevealOnScroll>
        <MagneticButton variant="secondary" className="text-sm">View Full Gallery <ArrowRight className="w-4 h-4 ml-2" /></MagneticButton>
      </RevealOnScroll>
    </div>
    
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 px-2 md:px-8">
      {GALLERY_IMAGES.map((src, i) => (
        <RevealOnScroll key={i} className="break-inside-avoid">
          <div className="relative group overflow-hidden rounded-lg bg-white/5">
             <img src={src} alt="AI Art" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="font-mono text-xs text-white/70 line-clamp-2">"A cinematic shot of a cyberpunk street, neon rain, reflection, 8k..."</p>
                <div className="mt-4 flex gap-2">
                   <span className="text-[10px] uppercase tracking-wider border border-white/20 px-2 py-1 rounded text-white/50">v4.0</span>
                   <span className="text-[10px] uppercase tracking-wider border border-white/20 px-2 py-1 rounded text-white/50">Upscaled</span>
                </div>
             </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  </section>
);

const FeatureSection = () => (
  <section id="engine" className="py-32 border-t border-white/5 bg-[#030303] relative">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    <div className="max-w-7xl mx-auto px-6">
      <RevealOnScroll>
        <div className="mb-20">
          <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase mb-4 block">Engine Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter">Built for Speed & Control.</h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feat, i) => (
           <RevealOnScroll key={i} className={cn("p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group", feat.size === 'large' ? 'md:col-span-2' : '')}>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white text-black transition-colors duration-500">
                 <feat.icon className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feat.title}</h3>
              <p className="text-white/50 leading-relaxed">{feat.desc}</p>
           </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
      <h2 className="text-3xl font-medium tracking-tighter">Used by 10,000+ Studios</h2>
    </div>
    <div className="flex overflow-hidden relative">
       <div className="flex animate-scan gap-8 px-8 w-max">
          {[...Array(2)].map((_, i) => (
             <React.Fragment key={i}>
                {[
                  { q: "The fidelity is unmatched. Aether replaced our entire concept art workflow.", a: "Alex R., Art Director" },
                  { q: "Finally, an AI that understands composition, not just keywords.", a: "Sarah L., Illustrator" },
                  { q: "Speed is insane. We iterate 10x faster now.", a: "DesignCo Agency" },
                  { q: "ControlNet implementation is flawless.", a: "IndieGame Dev" }
                ].map((t, j) => (
                  <div key={j} className="w-[300px] md:w-[400px] p-8 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                     <p className="text-lg text-white/80 mb-6 font-light">"{t.q}"</p>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <span className="text-sm font-mono text-white/40">{t.a}</span>
                     </div>
                  </div>
                ))}
             </React.Fragment>
          ))}
       </div>
       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent"></div>
       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent"></div>
    </div>
  </section>
);

const Pricing = ({ onOpenAuth }: { onOpenAuth: () => void }) => (
    <section id="pricing" className="py-32 border-t border-white/5 relative z-20 bg-[#020202]">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">Simple, Scalable Logic.</h2>
            <p className="text-white/40 mb-16 max-w-xl mx-auto">Stop paying for failed generations. Our credit system refunds bad seeds automatically.</p>
            
            <div className="grid md:grid-cols-3 gap-6 items-end">
                 {/* Starter */}
                 <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left group h-min">
                     <div className="text-lg font-medium mb-2 text-white/70">Hobbyist</div>
                     <div className="text-4xl font-light mb-6">$0</div>
                     <ul className="space-y-4 text-sm text-white/60 mb-8">
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-white/30" /> 50 Daily Fast Credits</li>
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-white/30" /> Standard Resolution</li>
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-white/30" /> Public Gallery</li>
                     </ul>
                     <MagneticButton variant="secondary" className="w-full text-xs" onClick={onOpenAuth}>Start Creating</MagneticButton>
                 </div>

                 {/* Pro */}
                 <div className="p-8 border border-white/20 rounded-2xl bg-white text-black text-left relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                     <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-3 py-1 rounded-bl-lg font-mono">BEST VALUE</div>
                     <div className="text-lg font-medium mb-2">Pro Artist</div>
                     <div className="text-5xl font-light mb-6">$29<span className="text-base text-black/40">/mo</span></div>
                     <ul className="space-y-4 text-sm text-black/70 mb-8 font-medium">
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Unlimited Relaxed Gen</li>
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> 4K Upscaling</li>
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Commercial License</li>
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Private Mode</li>
                     </ul>
                     <MagneticButton variant="primary" className="w-full bg-black text-white hover:bg-black/80 border-transparent" onClick={onOpenAuth}>Get Pro</MagneticButton>
                 </div>

                 {/* Studio */}
                 <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left group h-min">
                     <div className="text-lg font-medium mb-2 text-white/70">Studio</div>
                     <div className="text-4xl font-light mb-6">$99</div>
                     <ul className="space-y-4 text-sm text-white/60 mb-8">
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-white/30" /> API Access</li>
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-white/30" /> Custom Model Training</li>
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-white/30" /> Dedicated GPU Node</li>
                     </ul>
                     <MagneticButton variant="secondary" className="w-full text-xs" onClick={onOpenAuth}>Contact Sales</MagneticButton>
                 </div>
            </div>
        </div>
    </section>
);

const FAQ = () => (
  <section className="py-24 border-t border-white/5 max-w-3xl mx-auto px-6">
    <h2 className="text-2xl font-medium mb-12">Common Queries</h2>
    <div className="space-y-4">
      {FAQS.map((item, i) => (
        <details key={i} className="group border border-white/5 rounded-lg bg-white/[0.02] open:bg-white/[0.05] transition-colors">
          <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-medium">
            {item.q}
            <span className="transition group-open:rotate-180">
              <ChevronRight className="w-4 h-4 text-white/50" />
            </span>
          </summary>
          <div className="px-6 pb-6 text-sm text-white/50 leading-relaxed">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-white/5 text-center md:text-left">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <span className="font-bold tracking-tight">Aether Inc.</span>
      </div>
      <div className="flex gap-8 text-xs text-white/40 font-mono">
        <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
        <a href="#" className="hover:text-white transition-colors">TERMS</a>
        <a href="#" className="hover:text-white transition-colors">TWITTER</a>
      </div>
      <div className="text-xs text-white/20">
        © 2024 DESIGNED IN VOID
      </div>
    </div>
  </footer>
);

const Hero = ({ onOpenAuth, onScrollTo }: { onOpenAuth: () => void; onScrollTo: (id: string) => void }) => {
    return (
        <section className="relative min-h-screen flex flex-col pt-32 pb-12 px-4 md:px-8 overflow-hidden">
            
            {/* Main Content Container - Condensed Layout */}
            <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col items-center md:gap-8">
                
                {/* 1. Header Text */}
                <div className="text-center relative z-30 mb-8 md:mb-0 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono text-white/50 mb-8 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        MODEL v4.0 LIVE
                    </div>
                    
                    <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter text-white mb-8 select-none mix-blend-overlay opacity-90 leading-[0.85]">
                        <MagneticText text="DREAM IN PHOTONS" />
                    </h1>
                    
                    <p className="text-white/40 max-w-lg mx-auto text-sm md:text-lg leading-relaxed mb-10">
                        The world's most advanced AI image synthesis engine.
                        <span className="text-white/80"> From prompt to masterpiece in 800ms.</span>
                    </p>

                    <div className="flex justify-center gap-4">
                        <MagneticButton variant="primary" onClick={onOpenAuth}>Start Creating</MagneticButton>
                        <MagneticButton variant="secondary" onClick={() => onScrollTo('showcase')}>View Gallery</MagneticButton>
                    </div>
                </div>

                {/* 2. The Monolith (Interactive Core) */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <Hero3DInterface onDownload={onOpenAuth} />
                </div>

            </div>

            {/* Infinite Marquee */}
            <div className="w-full mt-24 border-t border-white/5 pt-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-30 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs font-mono text-white/50 whitespace-nowrap">POWERING NEXT-GEN STUDIOS</span>
                    <div className="w-full overflow-hidden relative">
                         <div className="flex gap-16 items-center animate-scan w-max grayscale invert">
                            {['Pixar', 'Ubisoft', 'Weta', 'Netflix', 'Adobe', 'Epic', 'Unity', 'Blender'].map(logo => (
                                <span key={logo} className="text-lg font-bold tracking-widest">{logo.toUpperCase()}</span>
                            ))}
                            {['Pixar', 'Ubisoft', 'Weta', 'Netflix', 'Adobe', 'Epic', 'Unity', 'Blender'].map(logo => (
                                <span key={logo} className="text-lg font-bold tracking-widest">{logo.toUpperCase()}</span>
                            ))}
                        </div>
                         <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#020202] to-transparent"></div>
                         <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#020202] to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const App = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar onOpenAuth={handleOpenAuth} onScrollTo={scrollToSection} />
      <Hero onOpenAuth={() => handleOpenAuth('signup')} onScrollTo={scrollToSection} />
      <GallerySection />
      <FeatureSection />
      <Testimonials />
      <Pricing onOpenAuth={() => handleOpenAuth('signup')} />
      <FAQ />
      <Footer />
      
      {/* Auth Overlay */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
