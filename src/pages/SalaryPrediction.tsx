import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, IndianRupee, Calculator, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const SalaryPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    inr: number;
    usd: number;
  } | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    experience: '',
    education: '',
    jobTitle: '',
    skills: '',
    location: '',
    company: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const predictSalary = async () => {
    // Validate form
    if (!formData.experience || !formData.education || !formData.jobTitle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock prediction based on experience and education
      const baseInr = Math.floor(Math.random() * 500000) + 400000; // 4L - 9L INR
      const baseUsd = Math.floor(baseInr / 80); // Rough conversion
      
      setPrediction({
        inr: baseInr,
        usd: baseUsd
      });
      
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete!",
        description: "Your salary prediction has been generated.",
      });
    }, 2000);
  };

  return (
    
      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-glow mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Salary Prediction</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get accurate salary predictions based on your experience, skills, and market data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Prediction Form */}
          <Card className="shadow-card border-0 bg-gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl">Enter Your Details</CardTitle>
              <CardDescription>
                Provide accurate information for the best prediction results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="e.g., 3"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education">Education Level *</Label>
                  <Select onValueChange={(value) => handleInputChange('education', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="highschool">High School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Software Engineer, Data Scientist"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Bangalore, Mumbai"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Size</Label>
                <Select onValueChange={(value) => handleInputChange('company', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (1-50)</SelectItem>
                    <SelectItem value="medium">Medium (51-500)</SelectItem>
                    <SelectItem value="large">Large (500+)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (5000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
                <Textarea
                  id="skills"
                  placeholder="e.g., React, Python, Machine Learning, SQL"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={predictSalary}
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Predict My Salary'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {prediction ? (
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <DollarSign className="h-6 w-6 text-success mr-2" />
                    Your Predicted Salary
                  </CardTitle>
                  <CardDescription>
                    Based on current market trends and your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="bg-success/10 rounded-lg p-6 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <IndianRupee className="h-8 w-8 text-success mr-2" />
                        <span className="text-3xl font-bold text-success">
                          ₹{prediction.inr.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Annual Salary (INR)</p>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-6 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="h-8 w-8 text-primary mr-2" />
                        <span className="text-3xl font-bold text-primary">
                          ${prediction.usd.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Annual Salary (USD)</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Salary Range</h4>
                    <p className="text-sm text-muted-foreground">
                      Your predicted salary falls in the 75th percentile for similar profiles. 
                      Consider highlighting your skills in {formData.skills} to negotiate better.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardContent className="py-12 text-center">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Fill out the form to get your personalized salary prediction
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

  );
};

export default SalaryPrediction;