import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SalaryPrediction } from "@/components/SalaryPrediction";
import { ResumeChecker } from "@/components/ResumeChecker";
import { CareerSwitch } from "@/components/CareerSwitch";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SalaryPrediction />
      <ResumeChecker />
      <CareerSwitch />
      <Footer />
    </div>
  );
};

export default Index;
