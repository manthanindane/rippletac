"use client"
import Link from "next/link";
import React, { JSX, useEffect, useState } from "react";

const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => { },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'lg';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
function Button({ children, className = "", variant = "default", size = "default", onClick, ...props }: ButtonProps) {
  const { theme } = React.useContext(ThemeContext);
  const baseStyles = "inline-flex items-center justify-center transition-colors focus-visible:outline-none font-medium"

  const variants = {
    default: theme === 'dark'
      ? "bg-white text-black hover:bg-gray-100"
      : "bg-black text-white hover:bg-gray-900",
    outline: theme === 'dark'
      ? "border border-white hover:bg-white/10 text-white"
      : "border border-black hover:bg-black/10 text-black"
  }

  const sizes = {
    default: "h-10 px-6 py-2",
    lg: "h-12 px-8 py-3 text-[15px] tracking-wide"
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}


function Card({ children, className = "" }: CardProps) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className={`border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} p-8 bg-transparent backdrop-blur-sm ${className}`}>
      {children}
    </div>
  )
}

function RippleBackground(): JSX.Element {
  const { theme } = React.useContext(ThemeContext);
  const borderColor = theme === 'dark' ? 'white' : 'black';
  const opacity = theme === 'dark' ? '30' : '10';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* Large background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'} rounded-full blur-[100px] animate-ripple-opacity`} />
          </div>

          {/* Primary ripple circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-4">
              <div className={`w-[600px] h-[600px] rounded-full border-2 border-${borderColor}/${opacity} animate-ripple`} />
            </div>

            <div className="absolute -inset-4">
              <div className={`w-[500px] h-[500px] rounded-full border-2 border-${borderColor}/${opacity} animate-ripple-reverse`} />
            </div>

            <div className="absolute -inset-4">
              <div className={`w-[400px] h-[400px] rounded-full border-2 border-${borderColor}/${opacity} animate-ripple`} />
            </div>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute inset-0">
            <div className={`absolute top-1/4 left-1/4 w-4 h-4 bg-${borderColor}/${opacity} rounded-full animate-pulse`} />
            <div className={`absolute top-3/4 right-1/4 w-6 h-6 bg-${borderColor}/${opacity} rounded-full animate-pulse`} />
            <div className={`absolute bottom-1/4 left-1/2 w-3 h-3 bg-${borderColor}/${opacity} rounded-full animate-pulse`} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
    >
      {theme === 'dark' ? '🌞' : '🌚'}
    </button>
  );
}
export default function App(): JSX.Element {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');



  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  interface Feature {
    title: string;
    description: string;
  }

  interface Stat {
    number: string;
    label: string;
  }

  const features: Feature[] = [
    {
      title: "Email Intelligence",
      description: "Transform chaos into clarity with AI-powered email analysis"
    },
    {
      title: "Smart Automation",
      description: "Custom workflows that adapt to your communication patterns"
    },
    {
      title: "Team Synergy",
      description: "Collaborative inbox management with real-time insights"
    }
  ];

  const stats: Stat[] = [
    { number: "60%", label: "Time Saved" },
    { number: "24/7", label: "Email Intelligence" },
    { number: "100K+", label: "Users will Trust Us.(*Probably)" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen font-['DM_Sans'] transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        {/* Background Ripple Effect */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0" style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 80%)'
              : 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.1) 0%, transparent 80%)',
          }} />
          <RippleBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b ${theme === 'dark' ? 'border-zinc-900' : 'border-zinc-200'}`}>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={theme === "dark" ? "/rippletac.png" : "/darkrippletac.png"}
                  alt="logo" className="w-8 h-8"
                />
                <h3>RippleTac</h3>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link href="/GoogleSignIn">
                <Button
                  variant="outline"
                  size="default"
                >
                  Sign In
                </Button>
                </Link>
              </div>
            </div>
          </nav>


          {/* Hero Section */}
          <div className="min-h-screen flex items-center relative">
            <div className="container mx-auto px-6 pt-20">
              <div className="max-w-4xl">
                <h1 className={`text-7xl md:text-[90px] font-bold mb-8 leading-none tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Inbox,<br />Reimagined.
                </h1>
                <p className={`text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  I know you&aposre not a fan of reading emails <br /> let <span className={theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}>rippletac </span>
                  do it for you.
                </p>
                <div className="flex flex-row gap-4">
                  <Button size="lg" className="w-auto">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="w-auto">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="py-32 relative">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index}>
                    <h3 className={`text-xl font-medium mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {feature.title}
                    </h3>
                    <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`py-32 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {stat.number}
                    </div>
                    <div className={`uppercase tracking-wider text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-32">
            <div className="container mx-auto px-6">
              <Card className="text-center max-w-3xl mx-auto">
                <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Ready to transform your inbox?
                </h2>
                <p className={`text-xl mb-8 max-w-xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  Join thousands of professionals who have already simplified their email workflow.
                </p>
                <Button size="lg">
                  Get Started Now
                </Button>
              </Card>
            </div>
          </div>



          {/* Footer */}
          <footer className={`border-t py-16 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={theme === "dark" ? "rippletac.png" : "darkrippletac.png"}
                      alt="logo"
                      className="w-10 h-10"
                    />
                    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>RippleTac</span>
                  </div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    A product by Matereal Labs Pvt. Ltd.
                  </p>
                  <p className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>
                    Transforming email management through intelligent automation.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Quick Links
                  </h4>
                  <ul className="space-y-2">
                    {['Features', 'Pricing', 'About Us', 'Contact'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className={`transition-colors ${theme === 'dark'
                            ? 'text-white/60 hover:text-white'
                            : 'text-black/60 hover:text-black'
                            }`}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Legal
                  </h4>
                  <ul className="space-y-2">
                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className={`transition-colors ${theme === 'dark'
                            ? 'text-white/60 hover:text-white'
                            : 'text-black/60 hover:text-black'
                            }`}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>


              {/* Copyright */}
              <div className={`mt-16 pt-8 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <div className={`text-sm text-center ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  © {currentYear} Matereal Labs Pvt. Ltd. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
