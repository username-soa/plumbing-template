import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { ServiceHero } from "../_components/service-hero";
import { ServiceBenefits } from "../_components/service-benefits";
import { ServiceFAQ } from "../_components/service-faq";
import { RelatedServices } from "../_components/related-services";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { ProcessSteps } from "../_components/process-steps";
import { TrustIndicators } from "../_components/trust-indicators";
import { ReviewSection } from "@/components/sections/review";

interface ServicePageProps {
	params: Promise<{
		slug: string;
	}>;
}

import { JsonLd } from "@/components/json-ld";

// 1. Generate Static Params for all services
export async function generateStaticParams() {
	return SITE_CONFIG.services.map((service) => ({
		slug: service.slug,
	}));
}

// 2. Generate Metadata for SEO
export async function generateMetadata({
	params,
}: ServicePageProps): Promise<Metadata> {
	const { slug } = await params;
	const service = SITE_CONFIG.services.find((s) => s.slug === slug);

	if (!service) {
		return {
			title: "Service Not Found",
		};
	}

	return {
		title: service.metaTitle || `${service.title} | FlowMasters`,
		description: service.metaDescription || service.description,
	};
}

// 3. Main Page Component
export default async function ServicePage({ params }: ServicePageProps) {
	const { slug } = await params;
	const service = SITE_CONFIG.services.find((s) => s.slug === slug);

	if (!service) {
		notFound();
	}

	// Dynamic Icon
	// @ts-ignore
	const Icon = Icons[service.icon as keyof typeof Icons] || Icons.Wrench;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Service",
		serviceType: service.title,
		provider: {
			"@type": "LocalBusiness",
			name: SITE_CONFIG.brand.name,
			telephone: SITE_CONFIG.contact.phone,
			address: {
				"@type": "PostalAddress",
				streetAddress: SITE_CONFIG.contact.address,
				addressLocality: "Water City",
				addressRegion: "WC",
				postalCode: "12345",
				addressCountry: "US",
			},
		},
		description: service.longDescription || service.description,
		areaServed: {
			"@type": "City",
			name: "Water City",
		},
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<Breadcrumbs
				items={[
					{ label: "Services", href: "/services" },
					{ label: service.title },
				]}
			/>

			<ServiceHero
				title={service.title}
				description={service.longDescription || service.description}
				icon={Icon}
			/>

			{/* How It Works - Process Steps */}
			<ProcessSteps />

			<ServiceBenefits benefits={service.benefits || []} />

			{/* Reviews Section */}
			<div className="bg-muted/10 py-12">
				<ReviewSection />
			</div>

			{/* Trust Indicators */}
			<TrustIndicators />

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Need {service.title}? we're here to help.
					</h2>
					<p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-10">
						Professional, licensed, and insured plumbers ready to solve your
						problem today.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							variant="secondary"
							className="rounded-full px-8 font-bold"
							asChild
						>
							<Link href="/contact">Schedule Appointment</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="rounded-full px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
							asChild
						>
							<a href={`tel:${SITE_CONFIG.contact.phone}`}>
								Call {SITE_CONFIG.contact.phone}
							</a>
						</Button>
					</div>
				</div>
			</section>

			<ServiceFAQ faqs={service.faqs || []} />

			<RelatedServices currentSlug={service.slug || ""} />
		</>
	);
}
