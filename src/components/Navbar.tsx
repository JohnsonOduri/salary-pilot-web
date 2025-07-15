import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SalaryPilot
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/salary-prediction"
              className={`transition-colors ${
                location.pathname === '/salary-prediction' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Salary Prediction
            </Link>
            <Link
              to="/resume-checker"
              className={`transition-colors ${
                location.pathname === '/resume-checker' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Resume Checker
            </Link>
            <Link
              to="/career-switch"
              className={`transition-colors ${
                location.pathname === '/career-switch' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Career Switch
            </Link>
            
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
            <Link
              to="/salary-prediction"
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-left py-2 transition-colors ${
                location.pathname === '/salary-prediction' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Salary Prediction
            </Link>
            <Link
              to="/resume-checker"
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-left py-2 transition-colors ${
                location.pathname === '/resume-checker' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Resume Checker
            </Link>
            <Link
              to="/career-switch"
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-left py-2 transition-colors ${
                location.pathname === '/career-switch' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Career Switch
            </Link>
            <Link to="/salary-prediction" onClick={() => setIsMenuOpen(false)}>
              <Button variant="default" className="w-full bg-gradient-primary hover:opacity-90 mt-4">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};