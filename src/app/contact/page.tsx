import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/sections/faq";
import { ContactHero } from "./_components/contact-hero";
import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";

export const metadata: Metadata = {
	title: "Contact Us | FlowMasters Plumbing",
	description:
		"Get in touch with FlowMasters for all your plumbing needs. 24/7 emergency service available. Call us or fill out our contact form for a free quote.",
};

export default function ContactPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: SITE_CONFIG.brand.name,
		description: SITE_CONFIG.brand.description,
		telephone: SITE_CONFIG.contact.phone,
		email: SITE_CONFIG.contact.email,
		address: {
			"@type": "PostalAddress",
			streetAddress: SITE_CONFIG.contact.address,
			addressLocality: "Water City",
			addressRegion: "WC",
			postalCode: "12345",
			addressCountry: "US",
		},
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "08:00",
				closes: "19:00",
			},
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: "Saturday",
				opens: "09:00",
				closes: "18:00",
			},
		],
		priceRange: "$$",
		image: "/images/services-hero.png",
		sameAs: SITE_CONFIG.socials.map((s) => s.href).filter((h) => h !== "#"),
	};

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
								<h2 className="text-3xl md:text-4xl font-bold leading-tight">
									Professional Plumbing Services in Water City & Surrounding
									Areas
								</h2>
								<p className="text-lg text-muted-foreground leading-relaxed">
									Looking for a reliable plumber near you? FlowMasters has been
									proudly serving Water City and the greater metropolitan area
									for over 20 years. Our licensed and insured plumbers are
									available 24/7 for all your residential and commercial
									plumbing needs.
								</p>
							</div>

							{/* Service Areas */}
							<div className="space-y-3">
								<h3 className="text-lg font-semibold">
									Service Areas We Cover
								</h3>
								<p className="text-muted-foreground">
									Water City • Downtown District • Riverside Heights • North
									Valley • Oakwood Estates • Sunset Park • Harbor View •
									Industrial Zone • Lakeside Community • West End
								</p>
							</div>

							{/* Trust Signals */}
							<div className="grid grid-cols-2 gap-4">
								{[
									{ value: "20+", label: "Years of Experience" },
									{ value: "5,000+", label: "Happy Customers" },
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
								<h3 className="text-lg font-semibold">
									Why Water City Residents Choose FlowMasters
								</h3>
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
