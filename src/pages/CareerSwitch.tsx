import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Clock, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useState } from "react";


interface UserCareerForm {
  currentRole: string;
  currentSkills: string;
  interests: string;
  targetIndustry: string;
  timeframe: string;
  budget: string;
}




interface CareerPath {
  title: string;
  currentSalary: number;
  targetSalary: number;
  timeToTransition: string;
  requiredSkills: string[];
  steps: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

const analyzeWithGemini = async (formData: UserCareerForm): Promise<CareerPath[]> => {
  const prompt = `
You're an expert career coach. Based on the user's details below, suggest 3 ideal career transition paths. 
For each path, provide: 
- title (string),
- currentSalary (number, INR),
- targetSalary (number, INR),
- timeToTransition (string),
- requiredSkills (string[]),
- steps (string[]),
- difficulty ("Easy", "Moderate", or "Challenging").

Return only JSON in the format: CareerPath[]

User Profile:
Current Role: ${formData.currentRole}
Skills: ${formData.currentSkills}
Interests: ${formData.interests}
Target Industry: ${formData.targetIndustry}
Transition Timeframe: ${formData.timeframe}
Learning Budget: ${formData.budget}

Respond with **only raw JSON**. No explanation.
`;

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const result = await response.json();
  let raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!raw) throw new Error("No response from Gemini");

  raw = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse Gemini response:", raw);
    throw new Error("AI response was not valid JSON.");
  }
};

const CareerSwitch = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const {
    toast
  } = useToast();
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
try {
  const paths = await analyzeWithGemini(formData);
  setCareerPaths(paths);
  toast({
    title: "Career Paths Generated!",
    description: "Based on your profile, here are your best options."
  });
} catch (err) {
  console.error("❌ AI Error:", err);
  toast({
    title: "Failed to Generate",
    description: "AI couldn't generate suggestions. Try again or adjust your inputs.",
    variant: "destructive"
  });
} finally {
  setIsAnalyzing(false);
}

  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success text-success-foreground';
      case 'Moderate':
        return 'bg-warning text-warning-foreground';
      case 'Challenging':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  return <div className="max-w-7xl mx-auto p-6 bg-violet-100">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-glow mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Career Switch Planner</h1>
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
                  <Input id="currentRole" placeholder="e.g., Software Engineer" value={formData.currentRole} onChange={e => handleInputChange('currentRole', e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSkills">Current Skills</Label>
                  <Input id="currentSkills" placeholder="e.g., React, Python, Leadership" value={formData.currentSkills} onChange={e => handleInputChange('currentSkills', e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests & Passions *</Label>
                  <Input id="interests" placeholder="e.g., Data Analysis, Design, Strategy" value={formData.interests} onChange={e => handleInputChange('interests', e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetIndustry">Target Industry</Label>
                  <Select onValueChange={value => handleInputChange('targetIndustry', value)}>
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
                  <Select onValueChange={value => handleInputChange('timeframe', value)}>
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
                  <Select onValueChange={value => handleInputChange('budget', value)}>
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

                <Button onClick={generateCareerPaths} disabled={isAnalyzing} className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                  {isAnalyzing ? <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </> : 'Find Career Paths'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Career Path Results */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
            {careerPaths.length > 0 ? careerPaths.map((path, index) => <Card key={index} className="shadow-card border-0 bg-gradient-card">
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
                          +{Math.round((path.targetSalary - path.currentSalary) / path.currentSalary * 100)}%
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
                        {path.requiredSkills.map((skill, skillIndex) => <Badge key={skillIndex} variant="outline" className="border-primary text-primary">
                            {skill}
                          </Badge>)}
                      </div>
                    </div>

                    {/* Transition Steps */}
                    <div>
                      <h4 className="font-semibold mb-3">Step-by-Step Plan</h4>
                      <div className="space-y-3">
                        {path.steps.map((step, stepIndex) => <div key={stepIndex} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-semibold text-primary">{stepIndex + 1}</span>
                            </div>
                            <p className="text-sm">{step}</p>
                          </div>)}
                      </div>
                    </div>
                  </CardContent>
                </Card>) : <Card className="shadow-card border-0 bg-gradient-card">
                <CardContent className="py-16 text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Fill out your details to discover personalized career transition paths
                  </p>
                </CardContent>
              </Card>}
          </div>
        </div>
      </div>;
};
export default CareerSwitch;