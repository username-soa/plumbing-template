import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { getAllCaseStudies } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CaseStudyGrid() {
	const caseStudies = getAllCaseStudies();

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{caseStudies.map((study) => (
						<Link
							key={study.slug}
							href={`/case-studies/${study.slug}`}
							className="group block h-full"
						>
							<Card className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-colors pt-0">
								<div className="relative aspect-4/3 overflow-hidden bg-muted">
									{study.frontmatter.heroImage ? (
										<Image
											src={study.frontmatter.heroImage}
											alt={study.frontmatter.title}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
											No Image
										</div>
									)}
									<div className="absolute top-4 left-4">
										<Badge
											variant="secondary"
											className="bg-background/90 backdrop-blur-sm shadow-sm border-none text-foreground font-medium hover:bg-background"
										>
											{study.frontmatter.category}
										</Badge>
									</div>
								</div>

								<CardHeader className="space-y-2">
									<h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
										{study.frontmatter.title}
									</h3>
									<div className="flex items-center text-sm text-muted-foreground gap-1">
										<MapPin className="w-4 h-4" />
										<span>{study.frontmatter.location}</span>
									</div>
								</CardHeader>

								<CardContent className="grow">
									<p className="text-muted-foreground line-clamp-3">
										{study.frontmatter.summary}
									</p>
								</CardContent>

								<CardFooter className="pt-0">
									<Button
										variant="link"
										className="p-0 h-auto font-semibold text-primary group-hover:text-primary/80"
									>
										Read Case Study{" "}
										<ArrowRight className="w-4 h-4 transition-transform -rotate-45 group-hover:rotate-0" />
									</Button>
								</CardFooter>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
