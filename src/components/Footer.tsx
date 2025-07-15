import { TrendingUp, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 lg:gap-24">
          {/* Brand */}
          <div className="md:col-span-3">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-primary mr-2" />
              <h3 className="text-2xl font-bold">SalaryPilot</h3>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Navigate your career journey with AI-powered insights for salary prediction, 
              resume optimization, and career planning.
            </p>
          </div>

          {/* Features */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#salary-prediction" className="hover:text-background transition-colors">Salary Prediction</a></li>
              <li><a href="#resume-checker" className="hover:text-background transition-colors">Resume Checker</a></li>
              <li><a href="#career-switch" className="hover:text-background transition-colors">Career Switch Planner</a></li>

            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8">
          <div className="flex justify-center items-center">
            <span className="font-semibold mr-2">Support</span>
            <div className="flex items-center text-sm text-background/60">
              <Mail className="h-4 w-4 mr-1" />
              oduri.johnson@gmail.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};