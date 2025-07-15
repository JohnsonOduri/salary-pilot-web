import { TrendingUp, Mail, MessageSquare, Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
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
              <li><a href="#" className="hover:text-background transition-colors">Salary Insights</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-background/60">
              © 2024 SalaryPilot. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center text-sm text-background/60">
                <Shield className="h-4 w-4 mr-1" />
                Secure & Private
              </div>
              <div className="flex items-center text-sm text-background/60">
                <Mail className="h-4 w-4 mr-1" />
                hello@salarypilot.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};