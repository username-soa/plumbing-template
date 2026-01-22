import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/sections/faq";
import { ContactHero } from "./_components/contact-hero";
import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";
import {
	TypographyH2,
	TypographyH3,
	TypographyP,
} from "@/components/ui/typography";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/json-ld";

const { brand, seo } = SITE_CONFIG;
const foundingYear = seo.foundingDate.split("-")[0];
const yearsInBusiness = new Date().getFullYear() - parseInt(foundingYear, 10);

export const metadata: Metadata = {
	title: `Contact Us | ${brand.name} Plumbing - ${seo.location.city}`,
	description: `Get in touch with ${brand.name} for all your plumbing needs in ${seo.location.city}. 24/7 emergency service available. Call us or fill out our contact form for a free quote.`,
};

export default function ContactPage() {
	const { siteUrl } = seo;

	// JSON-LD Schema using centralized generators
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// ContactPage schema
			generateWebPageSchema({
				name: `Contact ${brand.name}`,
				description: metadata.description as string,
				url: `${siteUrl}/contact`,
				type: "ContactPage",
			}),
			// Organization schema with contact points
			{
				...generateOrganizationSchema(),
				contactPoint: [
					{
						"@type": "ContactPoint",
						telephone: seo.location.phone,
						contactType: "customer service",
						areaServed: seo.location.countryCode,
						availableLanguage: ["English"],
					},
					{
						"@type": "ContactPoint",
						telephone: seo.location.phone,
						contactType: "emergency",
						areaServed: seo.location.countryCode,
						availableLanguage: ["English"],
						hoursAvailable: {
							"@type": "OpeningHoursSpecification",
							dayOfWeek: [
								"Monday",
								"Tuesday",
								"Wednesday",
								"Thursday",
								"Friday",
								"Saturday",
								"Sunday",
							],
							opens: "00:00",
							closes: "23:59",
						},
					},
				],
			},
		],
	};

	// Generate service areas string from config
	const serviceAreasString = seo.serviceAreas
		.map((area) => area.name)
		.join(" • ");

	return (
		<>
			<JsonLd data={jsonLd} />

			<ContactHero />
			<ContactInfo />

			{/* Contact Form Section with Local SEO Content */}
			<section className="py-16 md:py-24 bg-muted/30">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
						{/* Left Side - SEO Content */}
						<div className="space-y-8">
							<div className="space-y-4">
								<span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
									Your Trusted Local Plumbers
								</span>
								<TypographyH2 className="text-3xl md:text-4xl font-bold leading-tight border-none">
									Professional Plumbing Services in {seo.location.city} &
									Surrounding Areas
								</TypographyH2>
								<TypographyP className="text-lg text-muted-foreground leading-relaxed mt-4">
									Looking for a reliable plumber near you? {brand.name} has been
									proudly serving {seo.location.city} and the greater{" "}
									{seo.location.state} area for over {yearsInBusiness} years.
									Our licensed and insured plumbers are available 24/7 for all
									your residential and commercial plumbing needs.
								</TypographyP>
							</div>

							{/* Service Areas */}
							<div className="space-y-3">
								<TypographyH3 className="text-lg font-semibold">
									Service Areas We Cover
								</TypographyH3>
								<TypographyP className="text-muted-foreground mt-0">
									{serviceAreasString}
								</TypographyP>
							</div>

							{/* Trust Signals */}
							<div className="grid grid-cols-2 gap-4">
								{[
									{
										value: `${yearsInBusiness}+`,
										label: "Years of Experience",
									},
									{
										value: `${seo.reviews.aggregate.reviewCount.toLocaleString()}+`,
										label: "Happy Customers",
									},
									{ value: "24/7", label: "Emergency Service" },
									{ value: "100%", label: "Satisfaction Guaranteed" },
								].map((stat) => (
									<div
										key={stat.label}
										className="bg-background rounded-xl p-4 text-center border"
									>
										<div className="text-2xl font-bold text-primary">
											{stat.value}
										</div>
										<div className="text-sm text-muted-foreground">
											{stat.label}
										</div>
									</div>
								))}
							</div>

							{/* Why Choose Us */}
							<div className="space-y-4">
								<TypographyH3 className="text-lg font-semibold">
									Why {seo.location.city} Residents Choose {brand.name}
								</TypographyH3>
								<ul className="space-y-3">
									{[
										"Licensed, bonded & insured plumbing professionals",
										"Upfront pricing with no hidden fees or surprises",
										"Same-day service for urgent plumbing issues",
										"Fully stocked trucks for faster repairs",
										"Background-checked, uniformed technicians",
										"Workmanship warranty on all repairs",
									].map((item) => (
										<li key={item} className="flex items-start gap-3">
											<svg
												className="w-5 h-5 text-primary mt-0.5 shrink-0"
												fill="currentColor"
												viewBox="0 0 20 20"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
											<span className="text-muted-foreground">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Right Side - Contact Form */}
						<div>
							<ContactForm />
						</div>
					</div>
				</div>
			</section>

			<FAQSection />
		</>
	);
}
