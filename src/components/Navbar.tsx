import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SalaryPilot
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('salary-prediction')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Salary Prediction
            </button>
            <button
              onClick={() => scrollToSection('resume-checker')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Resume Checker
            </button>
            <button
              onClick={() => scrollToSection('career-switch')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Career Switch
            </button>
            <Button variant="default" className="bg-gradient-primary hover:opacity-90">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <button
              onClick={() => scrollToSection('salary-prediction')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Salary Prediction
            </button>
            <button
              onClick={() => scrollToSection('resume-checker')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Resume Checker
            </button>
            <button
              onClick={() => scrollToSection('career-switch')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Career Switch
            </button>
            <Button variant="default" className="w-full bg-gradient-primary hover:opacity-90 mt-4">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};