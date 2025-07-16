import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {  Calculator, Loader2, ArrowLeft } from "lucide-react";
// Remove duplicate useState import since it's already imported with React
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import  { useState } from "react";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

const JOB_TITLES = [
	"Software Engineer", "Data Analyst", "Senior Manager", "Sales Associate",
	"Marketing Analyst", "Product Manager", "Sales Manager", "Marketing Coordinator",
	"Senior Scientist", "Software Developer", "HR Manager", "Financial Analyst",
	"Project Manager", "Customer Service Rep", "Operations Manager", "Marketing Manager",
	"Senior Engineer", "Data Entry Clerk", "Business Analyst", "VP of Operations",
	"IT Support", "Recruiter", "Financial Manager", "Social Media Specialist",
	"Software Manager", "Junior Developer", "Senior Consultant", "Product Designer",
	"CEO", "Accountant", "Data Scientist", "Marketing Specialist", "Technical Writer",
	"HR Generalist", "Project Engineer", "Customer Success Rep", "Sales Executive",
	"UX Designer", "Operations Director", "Network Engineer", "Administrative Assistant",
	"Strategy Consultant", "Copywriter", "Account Manager", "Director of Marketing",
	"Help Desk Analyst", "Business Intelligence Analyst", "Event Coordinator",
	"VP of Finance", "Graphic Designer", "UX Researcher", "Social Media Manager",
	"Senior Data Scientist", "Junior Accountant", "Digital Marketing Manager",
	"IT Manager", "Customer Service Representative", "Business Development Manager",
	"Senior Financial Analyst", "Web Developer", "Research Director",
	"Technical Support Specialist", "Creative Director", "Senior Software Engineer",
	"Human Resources Director", "Content Marketing Manager", "Technical Recruiter",
	"Sales Representative", "Junior Designer", "Financial Advisor", "Junior Account Manager",
	"Senior Project Manager", "Principal Scientist", "Supply Chain Manager",
	"Training Specialist", "Research Scientist", "Junior Software Developer",
	"Public Relations Manager", "Operations Analyst", "Product Marketing Manager",
	"Senior HR Manager", "Junior Web Developer", "Senior Project Coordinator",
	"Chief Data Officer", "Digital Content Producer", "IT Support Specialist",
	"Senior Marketing Analyst", "Customer Success Manager", "Senior Graphic Designer",
	"Software Project Manager", "Supply Chain Analyst", "Senior Business Analyst",
	"Junior Marketing Analyst", "Office Manager", "Principal Engineer", "Junior HR Generalist",
	"Senior Product Manager", "Junior Operations Analyst", "Customer Service Manager",
	"Senior HR Generalist", "Sales Operations Manager", "Senior Software Developer",
	"Director of Operations", "Junior Web Designer", "Senior Training Specialist",
	"Senior Research Scientist", "Junior Sales Representative", "Junior Marketing Manager",
	"Junior Data Analyst", "Senior Product Marketing Manager", "Junior Business Analyst",
	"Senior Marketing Manager", "Senior Sales Manager", "Junior Marketing Specialist",
	"Junior Project Manager", "Senior Accountant", "Director of Sales", "Junior Recruiter",
	"Senior Business Development Manager", "Senior Product Designer", "Junior Customer Support Specialist",
	"Senior IT Support Specialist", "Junior Financial Analyst", "Senior Operations Manager",
	"Junior Software Engineer", "Senior Sales Representative", "Director of Product Management",
	"Junior Copywriter", "Senior Marketing Coordinator", "Senior Human Resources Manager",
	"Junior Business Development Associate", "Senior Account Manager", "Senior Researcher",
	"Junior HR Coordinator", "Director of Finance", "Junior Marketing Coordinator",
	"Junior Data Scientist", "Senior Operations Analyst", "Senior Human Resources Coordinator",
	"Senior UX Designer", "Junior Product Manager", "Senior Marketing Specialist",
	"Senior IT Project Manager", "Senior Quality Assurance Analyst", "Director of Sales and Marketing",
	"Senior Account Executive", "Director of Business Development", "Junior Social Media Manager",
	"Senior Human Resources Specialist", "Senior Data Analyst", "Director of Human Capital",
	"Junior Advertising Coordinator", "Junior UX Designer", "Senior Marketing Director",
	"Senior IT Consultant", "Senior Financial Advisor", "Junior Business Operations Analyst",
	"Junior Social Media Specialist", "Senior Product Development Manager", "Junior Operations Manager",
	"Senior Software Architect", "Junior Research Scientist", "Senior Financial Manager",
	"Senior HR Specialist", "Senior Data Engineer", "Junior Operations Coordinator",
	"Director of HR", "Senior Operations Coordinator", "Junior Financial Advisor",
	"Director of Engineering", "Software Engineer Manager", "Back end Developer",
	"Senior Project Engineer", "Full Stack Engineer", "Front end Developer",
	"Front End Developer", "Director of Data Science", "Human Resources Coordinator",
	"Junior Sales Associate", "Human Resources Manager", "Juniour HR Generalist",
	"Juniour HR Coordinator", "Sales Director", "Digital Marketing Specialist",
	"Receptionist", "Marketing Director", "Social Media Man", "Delivery Driver"
];

const normalizeEducation = (value: string): string => {
	const map: Record<string, string> = {
		bachelors: "Bachelor's",
		masters: "Master's",
		phd: "PhD",
		diploma: "Diploma",
		highschool: "High School"
	};
	return map[value] || value;
};


async function getBestJobTitleMatch(userJobTitle: string,userSkills: string): Promise<string> {
	const prompt = `The user entered job title is: '${userJobTitle}' and skills '${userSkills}'. Suggest the closest matching title (even if nt close just give most suitable one) from the following list: [${JOB_TITLES.join(", ")}]. Return only the best match 1 match.`;
	try {
		const response = await axios.post(
			GEMINI_API_URL,
			{
				contents: [{ parts: [{ text: prompt }] }]
			}
		);
		const match = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

		return match ;
	} catch (err) {
		console.error("Gemini API error:", err);
		return userJobTitle;
	}
}

const SalaryPrediction = () => {
	const [matchedJobTitle, setMatchedJobTitle] = useState("");
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
		age: '',
		gender: ''
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));
	};

	const predictSalary = async () => {
		if (!formData.experience || !formData.education || !formData.jobTitle) {
		toast({
			title: "Missing Information",
			description: "Please fill in all required fields.",
			variant: "destructive"
		});
		return;
	}

	try {
		console.log("📦 Sending to API:", {
		Age: formData.age,
		Gender: formData.gender,
		"Education Level": normalizeEducation(formData.education),
		"Job Title": matchedJobTitle,
		"Years of Experience": formData.experience
		});

		const response = await axios.post("http://127.0.0.1:5000/predict", {
			"Age": formData.age,
			"Gender": formData.gender,
			"Education Level": normalizeEducation(formData.education),
			"Job Title": matchedJobTitle,
			"Years of Experience": formData.experience
		});

		const salary = response.data.prediction;
		console.log("Predicted Salary:", salary);
		// Optional: update state/UI here
	} catch (error) {
		console.error("Prediction error:", error);
		toast({
			title: "Prediction Failed",
			description: "Please check your input values.",
			variant: "destructive"
		});
	}
		setIsLoading(true);

		// 1. Get best match for job title
		
const matched = await getBestJobTitleMatch(formData.jobTitle,formData.skills);
setMatchedJobTitle(matched);
		// 2. Use matchedJobTitle in your prediction logic or API call
		setTimeout(() => {
			const baseInr = Math.floor(Math.random() * 500000) + 400000;
			const baseUsd = Math.floor(baseInr / 80);

			setPrediction({
				inr: baseInr,
				usd: baseUsd
			});

			setIsLoading(false);

			toast({
				title: "Prediction Complete!",
				description: `Your salary prediction for "${matched}" has been generated.`,
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
							<Label htmlFor="age">Age</Label>
							<Input
								id="age"
								type="number"
								placeholder="e.g., 28"
								value={formData.age}
								onChange={(e) => handleInputChange('age', e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="gender">Gender</Label>
							<Select onValueChange={(value) => handleInputChange('gender', value)}>
								<SelectTrigger>
									<SelectValue placeholder="Select your Gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Male">Male</SelectItem>
									<SelectItem value="Female">Female</SelectItem>
									<SelectItem value="Other">Other</SelectItem>

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

									Your Predicted Salary
								</CardTitle>
								<CardDescription>
									Based on current market trends and your profile
									<br />
									<span className="font-semibold">
  										Matched Job Title from Dataset: {matchedJobTitle}
								</span>

								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="bg-success/10 rounded-lg p-6 text-center">
										<div className="flex items-center justify-center mb-2">

											<span className="text-3xl font-bold text-success">
												₹{prediction.inr.toLocaleString()}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">Annual Salary (INR)</p>
									</div>

									<div className="bg-primary/10 rounded-lg p-6 text-center">

										<div className="flex items-center justify-center mb-2">

											<span className="text-3xl font-bold text-primary">
												${prediction.usd.toLocaleString()}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">Annual Salary (USD)</p>
									</div>
								</div>

								<div className="mt-6 p-4 bg-muted rounded-lg">
									<h4 className="font-semibold mb-2">AI Analysis</h4>
									<p className="text-sm text-muted-foreground">
										{/* text by gemeiniAI */}
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