import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = getCaseStudySlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const study = getCaseStudyBySlug(slug);

	if (!study) {
		return {
			title: "Case Study Not Found",
		};
	}

	return {
		title: `${study.frontmatter.title} | Case Studies`,
		description: study.frontmatter.summary,
	};
}

export default async function CaseStudyPage({ params }: PageProps) {
	const { slug } = await params;
	const study = getCaseStudyBySlug(slug);

	if (!study) {
		notFound();
	}

	const { default: Post } = await import(
		`@/content/case-studies/${study.slug}.mdx`
	);

	return (
		<article className="min-h-screen pb-20">
			{/* Hero Section */}
			<div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
				{study.frontmatter.heroImage && (
					<Image
						src={study.frontmatter.heroImage}
						alt={study.frontmatter.title}
						fill
						sizes="100vw"
						className="object-cover brightness-[0.3]"
						priority
					/>
				)}
				<div className="container px-6 mx-auto relative z-10 pb-16 md:pb-24 text-white">
					<div className="max-w-4xl space-y-6">
						<Link
							href="/case-studies"
							className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-6"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Case Studies
						</Link>

						<div className="flex flex-wrap gap-3">
							<Badge
								variant="outline"
								className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
							>
								<Tag className="w-3 h-3 mr-1" />
								{study.frontmatter.category}
							</Badge>
							{study.frontmatter.location && (
								<Badge
									variant="outline"
									className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
								>
									<MapPin className="w-3 h-3 mr-1" />
									{study.frontmatter.location}
								</Badge>
							)}
							{study.frontmatter.duration && (
								<Badge
									variant="outline"
									className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
								>
									<Calendar className="w-3 h-3 mr-1" />
									{study.frontmatter.duration}
								</Badge>
							)}
						</div>

						<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
							{study.frontmatter.title}
						</h1>
						<p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light">
							{study.frontmatter.summary}
						</p>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="container px-6 mx-auto mt-12 md:mt-16">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
					<div className="prose prose-lg dark:prose-invert max-w-none">
						<Post />
					</div>

					<aside className="space-y-8">
						<div className="sticky top-24 space-y-8">
							<div className="bg-muted/30 rounded-xl p-6 border border-border">
								<h3 className="font-semibold text-lg mb-4">Project Details</h3>
								<dl className="space-y-4 text-sm">
									<div>
										<dt className="text-muted-foreground mb-1">Service Type</dt>
										<dd className="font-medium text-foreground text-base">
											{study.frontmatter.relatedService ? (
												<Link
													href={`/services/${study.frontmatter.relatedService}`}
													className="text-primary hover:underline"
												>
													{study.frontmatter.category || "Plumbing Service"}
												</Link>
											) : (
												study.frontmatter.category || "Plumbing Service"
											)}
										</dd>
									</div>
									<div className="h-px bg-border" />
									<div>
										<dt className="text-muted-foreground mb-1">Completed In</dt>
										<dd className="font-medium text-foreground text-base">
											{study.frontmatter.duration}
										</dd>
									</div>
									<div className="h-px bg-border" />
									<div>
										<dt className="text-muted-foreground mb-1">Location</dt>
										<dd className="font-medium text-foreground text-base">
											{study.frontmatter.location}
										</dd>
									</div>
								</dl>
							</div>

							<div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
								<h3 className="font-bold text-xl mb-2">
									Need a similar repair?
								</h3>
								<p className="text-primary-foreground/90 mb-6">
									Contact us today for a free consultation about your plumbing
									needs.
								</p>
								<Button
									asChild
									variant="secondary"
									className="w-full font-semibold"
								>
									<Link href="/contact">Get a Quote</Link>
								</Button>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</article>
	);
}
