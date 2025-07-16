import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Brain, Target } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
      <div className="absolute top-20 left-10 animate-float">
        <TrendingUp className="h-8 w-8 text-primary-light opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Brain className="h-10 w-10 text-accent opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Target className="h-6 w-6 text-primary-glow opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Navigate Your
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Career Journey
              </span>
              with Confidence
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover your earning potential, optimize your resume, and plan your next career move 
              with Machine Learning and AI-powered insights tailored just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary-light/20"
              >
              Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/50">
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">91.82%</div>
                <div className="text-sm text-muted-foreground">
                  R
                  <sup>2</sup>
                  {" "}Score
                </div>
              </div>
              <div className="text-center">
                <div className="text-1xl font-bold text-primary">Gradient Boosting Regressor</div>
                <div className="text-sm text-muted-foreground">ML Model</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Gemini AI</div>
                <div className="text-sm text-muted-foreground">Analysis</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-floating">
              <img 
                src={heroImage} 
                alt="SalaryPilot Dashboard Preview"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/10"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-card rounded-full p-4 shadow-card animate-pulse-glow">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card rounded-full p-4 shadow-card animate-pulse-glow" style={{ animationDelay: '1s' }}>
              <Brain className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};