import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CareerPath {
  title: string;
  currentSalary: number;
  targetSalary: number;
  timeToTransition: string;
  requiredSkills: string[];
  steps: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

export const CareerSwitch = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    currentRole: '',
    currentSkills: '',
    interests: '',
    targetIndustry: '',
    timeframe: '',
    budget: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateCareerPaths = async () => {
    if (!formData.currentRole || !formData.interests) {
      toast({
        title: "Missing Information",
        description: "Please fill in your current role and interests.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockCareerPaths: CareerPath[] = [
        {
          title: "Data Scientist",
          currentSalary: 600000,
          targetSalary: 1200000,
          timeToTransition: "8-12 months",
          requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL"],
          steps: [
            "Complete a data science certification",
            "Build 3-5 portfolio projects",
            "Learn advanced ML algorithms",
            "Practice with real datasets",
            "Apply to entry-level positions"
          ],
          difficulty: "Moderate"
        },
        {
          title: "Product Manager",
          currentSalary: 600000,
          targetSalary: 1500000,
          timeToTransition: "6-10 months",
          requiredSkills: ["Product Strategy", "Analytics", "User Research", "Agile"],
          steps: [
            "Take a product management course",
            "Lead a cross-functional project",
            "Build a product portfolio",
            "Network with product managers",
            "Practice case studies"
          ],
          difficulty: "Challenging"
        },
        {
          title: "UX Designer",
          currentSalary: 600000,
          targetSalary: 900000,
          timeToTransition: "4-8 months",
          requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
          steps: [
            "Learn design fundamentals",
            "Master design tools",
            "Create a design portfolio",
            "Complete UX design projects",
            "Get feedback from designers"
          ],
          difficulty: "Easy"
        }
      ];

      setCareerPaths(mockCareerPaths);
      setIsAnalyzing(false);

      toast({
        title: "Career Paths Generated!",
        description: "Based on your profile, here are your best options.",
      });
    }, 2500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Moderate': return 'bg-warning text-warning-foreground';
      case 'Challenging': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="career-switch" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-10 w-10 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Career Switch Planner</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover new career paths tailored to your skills, interests, and goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-0 bg-gradient-card animate-fade-in sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Tell Us About Yourself</CardTitle>
                <CardDescription>
                  We'll analyze your profile to suggest the best career transitions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRole">Current Role *</Label>
                  <Input
                    id="currentRole"
                    placeholder="e.g., Software Engineer"
                    value={formData.currentRole}
                    onChange={(e) => handleInputChange('currentRole', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSkills">Current Skills</Label>
                  <Input
                    id="currentSkills"
                    placeholder="e.g., React, Python, Leadership"
                    value={formData.currentSkills}
                    onChange={(e) => handleInputChange('currentSkills', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests & Passions *</Label>
                  <Input
                    id="interests"
                    placeholder="e.g., Data Analysis, Design, Strategy"
                    value={formData.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetIndustry">Target Industry</Label>
                  <Select onValueChange={(value) => handleInputChange('targetIndustry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="startup">Startup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">Transition Timeframe</Label>
                  <Select onValueChange={(value) => handleInputChange('timeframe', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-6">3-6 months</SelectItem>
                      <SelectItem value="6-12">6-12 months</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Learning Budget</Label>
                  <Select onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-25k">₹0 - ₹25,000</SelectItem>
                      <SelectItem value="25-50k">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50-100k">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="100k+">₹1,00,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generateCareerPaths}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Find Career Paths'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Career Path Results */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {careerPaths.length > 0 ? (
              careerPaths.map((path, index) => (
                <Card key={index} className="shadow-card border-0 bg-gradient-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {path.timeToTransition}
                          </div>
                          <Badge className={getDifficultyColor(path.difficulty)}>
                            {path.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Salary Growth</div>
                        <div className="flex items-center text-success font-semibold">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          +{Math.round(((path.targetSalary - path.currentSalary) / path.currentSalary) * 100)}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Salary Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-lg font-semibold">₹{(path.currentSalary / 100000).toFixed(1)}L</div>
                        <div className="text-sm text-muted-foreground">Current Salary</div>
                      </div>
                      <div className="text-center p-4 bg-success/10 rounded-lg">
                        <div className="text-lg font-semibold text-success">₹{(path.targetSalary / 100000).toFixed(1)}L</div>
                        <div className="text-sm text-muted-foreground">Target Salary</div>
                      </div>
                    </div>

                    {/* Required Skills */}
                    <div>
                      <h4 className="font-semibold mb-3">Skills to Develop</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.requiredSkills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="border-primary text-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Transition Steps */}
                    <div>
                      <h4 className="font-semibold mb-3">Step-by-Step Plan</h4>
                      <div className="space-y-3">
                        {path.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-semibold text-primary">{stepIndex + 1}</span>
                            </div>
                            <p className="text-sm">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Start This Path
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardContent className="py-16 text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Fill out your details to discover personalized career transition paths
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};