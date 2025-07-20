import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Features Overview Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Career Tools at Your Fingertips
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to accelerate your career growth and make informed decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Salary Prediction Card */}
            <Card className="shadow-card border-0 bg-gradient-card hover:shadow-floating transition-all duration-300 animate-fade-in group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Salary Prediction</CardTitle>
                <CardDescription>
                  Get accurate salary predictions based on your experience, skills, and market data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/salary-prediction">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 group">
                    Start Prediction
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Resume Checker Card */}
            <Card className="shadow-card border-0 bg-gradient-card hover:shadow-floating transition-all duration-300 animate-fade-in group" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Resume Checker</CardTitle>
                <CardDescription>
                  Upload your resume and get AI-powered feedback to improve your job prospects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/resume-checker">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 group">
                    Check Resume
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Career Switch Card */}
            <Card className="shadow-card border-0 bg-gradient-card hover:shadow-floating transition-all duration-300 animate-fade-in group" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Career Switch Planner</CardTitle>
                <CardDescription>
                  Discover new career paths tailored to your skills, interests, and goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/career-switch">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 group">
                    Plan Switch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
