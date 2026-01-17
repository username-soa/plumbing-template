"use client";

import { useState } from "react";
import {
	Phone,
	CheckCircle2,
	Loader2,
	AlertTriangle,
	Clock,
	Calendar,
	MessageSquare,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const URGENCY_OPTIONS = [
	{
		id: "emergency",
		label: "Emergency",
		description: "Water flooding, burst pipe, no water",
		icon: AlertTriangle,
		color: "text-red-500",
		selectedBg: "bg-red-100 border-red-500 dark:bg-red-950",
	},
	{
		id: "urgent",
		label: "Urgent",
		description: "Same-day preferred",
		icon: Clock,
		color: "text-orange-500",
		selectedBg: "bg-orange-100 border-orange-500 dark:bg-orange-950",
	},
	{
		id: "scheduled",
		label: "Scheduled",
		description: "Within a few days",
		icon: Calendar,
		color: "text-blue-500",
		selectedBg: "bg-blue-100 border-blue-500 dark:bg-blue-950",
	},
	{
		id: "quote",
		label: "Just a Quote",
		description: "No rush, getting estimates",
		icon: MessageSquare,
		color: "text-green-500",
		selectedBg: "bg-green-100 border-green-500 dark:bg-green-950",
	},
];

const PROPERTY_TYPES = [
	{ id: "residential", label: "Residential" },
	{ id: "commercial", label: "Commercial" },
];

const CONTACT_TIMES = [
	{ id: "anytime", label: "Anytime" },
	{ id: "morning", label: "Morning (8am-12pm)" },
	{ id: "afternoon", label: "Afternoon (12pm-5pm)" },
	{ id: "evening", label: "Evening (5pm-7pm)" },
];

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [urgency, setUrgency] = useState("");
	const [propertyType, setPropertyType] = useState("residential");
	const [service, setService] = useState("");
	const [contactTime, setContactTime] = useState("anytime");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<Card className="text-center py-16">
				<CardContent className="pt-6">
					<div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-6">
						<CheckCircle2 className="w-10 h-10 text-green-600" />
					</div>
					<h3 className="text-2xl font-bold mb-2">Thank You!</h3>
					<p className="text-muted-foreground mb-6">
						We've received your request and will contact you shortly.
					</p>
					{urgency === "emergency" && (
						<Alert variant="destructive" className="max-w-md mx-auto">
							<Phone className="h-4 w-4" />
							<AlertDescription>
								For emergencies, please also call us directly:{" "}
								<a
									href={`tel:${SITE_CONFIG.contact.phone}`}
									className="font-bold hover:underline"
								>
									{SITE_CONFIG.contact.phone}
								</a>
							</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="md:py-6">
			<CardContent>
				<div className="mb-6">
					<h3 className="text-2xl font-bold">Send Us a Message</h3>
					<p className="text-muted-foreground mt-1">
						Fill out the form and we'll get back to you within 30 minutes during
						business hours.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Urgency Selection */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">
							How urgent is your request? *
						</Label>
						<RadioGroup
							value={urgency}
							onValueChange={setUrgency}
							className="grid grid-cols-2 gap-3"
						>
							{URGENCY_OPTIONS.map((option) => (
								<Label
									key={option.id}
									htmlFor={`urgency-${option.id}`}
									className={cn(
										"flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02]",
										urgency === option.id
											? option.selectedBg
											: "bg-muted/50 border-transparent hover:border-border",
									)}
								>
									<div className="flex items-center gap-2">
										<RadioGroupItem
											value={option.id}
											id={`urgency-${option.id}`}
											className="sr-only"
										/>
										<option.icon className={cn("w-4 h-4", option.color)} />
										<span className="font-semibold text-sm">
											{option.label}
										</span>
									</div>
									<p className="text-xs text-muted-foreground mt-1">
										{option.description}
									</p>
								</Label>
							))}
						</RadioGroup>
					</div>

					{/* Emergency Alert */}
					{urgency === "emergency" && (
						<Alert variant="destructive">
							<Phone className="h-4 w-4" />
							<AlertDescription>
								For fastest response, call us now:{" "}
								<a
									href={`tel:${SITE_CONFIG.contact.phone}`}
									className="font-bold hover:underline"
								>
									{SITE_CONFIG.contact.phone}
								</a>
							</AlertDescription>
						</Alert>
					)}

					{/* Contact Info */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">
								Full Name <span className="text-red-700">*</span>
							</Label>
							<Input
								id="name"
								name="name"
								placeholder="John Smith"
								required
								className="h-12"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone">
								Phone Number <span className="text-red-700">*</span>
							</Label>
							<Input
								id="phone"
								name="phone"
								type="tel"
								placeholder="(555) 123-4567"
								required
								className="h-12"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">
							Email Address <span className="text-red-700">*</span>
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="john@email.com"
							required
							className="h-12"
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{/* Service Type */}
						<div className="space-y-2">
							<Label htmlFor="service">
								Service Needed <span className="text-red-700">*</span>
							</Label>
							<Select value={service} onValueChange={setService} required>
								<SelectTrigger id="service" className="h-12 w-full">
									<SelectValue placeholder="Select a service..." />
								</SelectTrigger>
								<SelectContent>
									{SITE_CONFIG.services.map((svc) => (
										<SelectItem key={svc.slug} value={svc.slug}>
											{svc.title}
										</SelectItem>
									))}
									<SelectItem value="other">Other / Not Sure</SelectItem>
								</SelectContent>
							</Select>
						</div>
						{/* Preferred Contact Time */}
						<div className="space-y-2">
							<Label htmlFor="contactTime">Preferred Contact Time</Label>
							<Select value={contactTime} onValueChange={setContactTime}>
								<SelectTrigger id="contactTime" className="h-12 w-full">
									<SelectValue placeholder="Select time..." />
								</SelectTrigger>
								<SelectContent>
									{CONTACT_TIMES.map((time) => (
										<SelectItem key={time.id} value={time.id}>
											{time.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Property Type */}
					<div className="space-y-3">
						<Label className="text-base">Property Type</Label>
						<RadioGroup
							value={propertyType}
							onValueChange={setPropertyType}
							className="grid grid-cols-2 gap-4"
						>
							{PROPERTY_TYPES.map((type) => (
								<Label
									key={type.id}
									htmlFor={`property-${type.id}`}
									className={cn(
										"flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all w-full",
										propertyType === type.id
											? "bg-primary/10 border-primary"
											: "bg-muted/50 border-transparent hover:border-border",
									)}
								>
									<RadioGroupItem value={type.id} id={`property-${type.id}`} />
									<span className="font-medium">{type.label}</span>
								</Label>
							))}
						</RadioGroup>
					</div>

					{/* Message */}
					<div className="space-y-2">
						<Label htmlFor="message">Describe Your Issue</Label>
						<Textarea
							id="message"
							name="message"
							placeholder="Please describe the problem you're experiencing..."
							rows={4}
							className="resize-y"
						/>
					</div>

					{/* Submit */}
					<Button
						type="submit"
						size="lg"
						className="w-full h-14 text-lg font-bold rounded-xl"
						disabled={isSubmitting || !urgency}
					>
						{isSubmitting ? (
							<>
								<Loader2 className="w-5 h-5 mr-2 animate-spin" />
								Sending...
							</>
						) : (
							"Send Message"
						)}
					</Button>

					{/* Trust Badges */}
					<div className="flex flex-wrap justify-center gap-3 pt-2">
						{[
							"Licensed & Insured",
							"No Hidden Fees",
							"Satisfaction Guaranteed",
						].map((badge) => (
							<Badge key={badge} variant="outline" className="gap-1.5">
								<CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
								{badge}
							</Badge>
						))}
					</div>

					<p className="text-xs text-muted-foreground text-center">
						By submitting, you agree to our privacy policy. We'll never share
						your information.
					</p>
				</form>
			</CardContent>
		</Card>
	);
}
