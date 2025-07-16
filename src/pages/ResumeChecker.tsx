import mammoth from "mammoth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, CheckCircle, AlertCircle, Loader2, Download, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import axios from "axios";
interface ResumeAnalysis {
  overallScore: number;
  skillGaps: string[];
  suggestedRoles: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  improvements: string[];
}
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;
const ResumeChecker = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    toast
  } = useToast();
  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await fetch( `${import.meta.env.VITE_BACKEND_API_URL}/extract` , {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || "Failed to extract resume text");
      }
      const data = await response.json();
      return data.text;
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({
        arrayBuffer
      });
      return result.value;
    }
    return "";
  };
  async function analyzeWithGemini(resumeText: string): Promise<ResumeAnalysis> {
    const prompt = `
You are an expert career coach. Given the resume text below, return only JSON with the following keys:

{
  "overallScore": number,
  "skillGaps": string[],
  "suggestedRoles": string[],
  "salaryRange": { "min": number, "max": number },
  "improvements": string[]
}

Resume:
${resumeText}
see that min and max are annual salaries in INR
decrease resume score if the resume doesnt look like a resume and increase score for well written resumes for encouragement
Return only JSON. No markdown or explanation.
`;
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    });
    let rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("No response from Gemini");
    }

    // 🔥 Remove ```json and ``` from Gemini response
    rawText = rawText.replace(/```json|```/g, '').trim();
    try {
      const parsed = JSON.parse(rawText);
      return parsed;
    } catch (error) {
      console.error("❌ Failed to parse:", rawText);
      throw new Error("Failed to parse Gemini response.");
    }
  }
  const handleFileSelect = async () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file only.",
          variant: "destructive"
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: "File Uploaded Successfully",
        description: `${file.name} is ready for analysis.`
      });
    }
  };
  const analyzeResume = async () => {
    if (!uploadedFile) {
      toast({
        title: "No File Selected",
        description: "Please upload a resume first.",
        variant: "destructive"
      });
      return;
    }
    setIsAnalyzing(true);
    try {
      const resumeText = await extractTextFromFile(uploadedFile);
      const aiAnalysis = await analyzeWithGemini(resumeText);
      setAnalysis(aiAnalysis);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully."
      });
    } catch (err) {
      console.error("❌ Analysis error:", err);
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing your resume.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-destructive";
  };
  return <div className="max-w-7xl mx-auto p-6 bg-violet-100">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-glow mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Resume Checker</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get AI-powered feedback to improve your job prospects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Upload Section */}
          <Card className="shadow-card border-0 bg-gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl">Upload Your Resume</CardTitle>
              <CardDescription>
                Upload a PDF file for comprehensive analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />

              <div onClick={handleFileSelect} className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors group">
                <Upload className="h-12 w-12 text-muted-foreground group-hover:text-primary mx-auto mb-4 transition-colors" />
                <p className="text-lg font-medium mb-2">Click to upload your resume</p>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF files up to 5MB are supported
                </p>
                <Button variant="outline" className="group-hover:border-primary group-hover:text-primary">
                  Choose File
                </Button>
              </div>

              {uploadedFile && <div className="flex items-center p-4 bg-success/10 rounded-lg border border-success/20">
                  <FileText className="h-8 w-8 text-success mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-success">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>}

              <Button onClick={analyzeResume} disabled={!uploadedFile || isAnalyzing} className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                {isAnalyzing ? <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Resume...
                  </> : 'Analyze My Resume'}
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Your resume data is processed securely and not stored</p>
                <p>• Analysis typically takes 2-5 seconds</p>
                <p>• Supported format: PDF or Docx only</p>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-6 animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
            {analysis ? <>


                {/* Overall Score */}
                <Card className="shadow-card border-0 bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Overall Resume Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)} mb-2`}>
                        {analysis.overallScore}
                      </div>
                      <Progress value={analysis.overallScore} className="h-3" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Out of 100 points
                      </p>
                    </div>
                  </CardContent>
                </Card>

              {/* Salary Estimate */}
                <Card className="shadow-card border-0 bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Estimated Salary Range</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success mb-1">
                        ₹{(analysis.salaryRange.min / 100000).toFixed(1)}L - ₹{(analysis.salaryRange.max / 100000).toFixed(1)}L
                      </div>
                      <p className="text-sm text-muted-foreground">Annual package range</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Skill Gaps */}
                <Card className="shadow-card border-0 bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="h-5 w-5 text-warning mr-2" />
                      Skill Gaps to Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.skillGaps.map((skill, index) => <Badge key={index} variant="outline" className="border-foreground text-foreground">
                          {skill}
                        </Badge>)}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggested Roles */}
                <Card className="shadow-card border-0 bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Suggested Job Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.suggestedRoles.map((role, index) => <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                          <span className="font-medium">{role}</span>
                          <Badge variant="secondary">Match</Badge>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
                  
                  {/* Improvements */}
                <Card className="shadow-card border-0 bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Suggested Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.improvements.map((improvement, index) => <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                          <span className="font-medium">{improvement}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                
              </> : <Card className="shadow-card border-0 bg-gradient-card">
                <CardContent className="py-12 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Upload your resume to see detailed analysis and recommendations
                  </p>
                </CardContent>
              </Card>}
          </div>
        </div>
      </div>;
};
export default ResumeChecker;