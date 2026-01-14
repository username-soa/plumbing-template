import Link from "next/link";
import { MessageCircleQuestion, ArrowRight } from "lucide-react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	TypographyH2,
	TypographyH4,
	TypographyMuted,
	TypographySmall,
} from "@/components/ui/typography";

const FAQS = [
	{
		id: "services",
		question: "What plumbing services do you offer?",
		answer:
			"We offer a comprehensive range of plumbing services including drain cleaning, leak detection, water heater installation, pipe repair, bathroom remodeling, and 24/7 emergency services for both residential and commercial properties.",
	},
	{
		id: "tools",
		question: "Do I need to provide any tools or supplies?",
		answer:
			"No, our professional plumbers arrive fully equipped with all the necessary tools, state-of-the-art diagnostic equipment, and common parts to handle most plumbing issues on the spot.",
	},
	{
		id: "licensed",
		question: "Are your plumbers licensed and insured?",
		answer:
			"Yes, absolutely. All our plumbers are fully licensed, bonded, and insured. We conduct thorough background checks and regular training to ensure the highest standards of safety and professionalism.",
	},
	{
		id: "booking",
		question: "How do I book a plumbing service?",
		answer:
			"Booking is easy! You can call us directly at our hotline, send us an email, or use the 'Book Service Now' button below to schedule an appointment online at your convenience.",
	},
	{
		id: "emergency",
		question: "Do you offer emergency services?",
		answer:
			"Yes, we provide 24/7 emergency plumbing services. Whether it's a burst pipe in the middle of the night or a weekend clogged drain, our team is ready to respond quickly.",
	},
	{
		id: "estimates",
		question: "Do you provide free estimates?",
		answer:
			"Yes, we offer free, no-obligation estimates for most major projects. For smaller diagnostic calls, we have a transparent flat-fee structure that is waived if you proceed with the repair.",
	},
	{
		id: "warranty",
		question: "Is there a warranty on your repairs?",
		answer:
			"We stand by our work with a 100% satisfaction guarantee. All parts come with manufacturer warranties, and we provide a 1-year labor warranty on all repairs and installations for your peace of mind.",
	},
];

export function FAQSection() {
	return (
		<section className="w-full py-24 bg-muted/20">
			<div className="container mx-auto px-6 md:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					{/* Left Column: Header & Info Card */}
					<div className="flex flex-col gap-6 lg:sticky top-8">
						<div className="flex items-center gap-2 text-primary font-medium">
							<MessageCircleQuestion className="w-5 h-5" />
							<span className="uppercase tracking-wider text-sm">FAQ</span>
						</div>

						<TypographyH2 className="text-4xl md:text-5xl font-bold border-none tracking-tight">
							Your Questions, Our Answers{" "}
							<span className="text-primary">Clear, Honest And Helpful</span>
						</TypographyH2>

						<TypographyMuted className="text-lg  max-w-md">
							Have questions about our plumbing services? We&apos;re here to
							make everything clear. From booking to pricing, find your answers
							here.
						</TypographyMuted>

						<Card className="bg-card/50 border-none shadow-sm max-w-md">
							<CardContent className="p-4 flex flex-col gap-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
										<MessageCircleQuestion className="w-8 h-8" />
									</div>
									<div>
										<TypographyH4 className="text-lg font-bold mb-2">
											Still Have Questions?
										</TypographyH4>
										<TypographyMuted>
											Can&apos;t find the answer you&apos;re looking for? Our
											team is here to help!
										</TypographyMuted>
									</div>
								</div>
								<Button
									className="w-full h-12 text-base font-semibold shadow-md"
									asChild
								>
									<Link href="/contact">
										Contact Support <ArrowRight className="ml-2 w-4 h-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Right Column: Accordion */}
					<div className="w-full">
						<Accordion
							type="single"
							collapsible
							className="w-full flex flex-col gap-4"
							defaultValue="tools"
						>
							{FAQS.map((faq) => (
								<AccordionItem
									key={faq.id}
									value={faq.id}
									className="border-none rounded-xl px-6 bg-card data-[state=open]:bg-primary data-[state=open]:text-primary-foreground transition-all duration-200 shadow-sm"
								>
									<AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-semibold [&[data-state=open]>svg]:text-primary-foreground">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="text-base pb-6 text-primary-foreground/70 data-[state=open]:text-primary-foreground/90">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		</section>
	);
}
