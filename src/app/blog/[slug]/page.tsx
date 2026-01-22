import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import {
	getBlogPostBySlug,
	getBlogSlugs,
	formatDate,
	calculateReadingTime,
	getRelatedPostsForClient,
} from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { TableOfContents } from "../_components/table-of-contents";
import { ShareButtons } from "../_components/share-buttons";
import { RelatedPosts } from "../_components/related-posts";
import { JsonLd } from "@/components/json-ld";
import { generateArticleSchema, generateBlogBreadcrumbs } from "@/lib/json-ld";

const { brand, seo } = SITE_CONFIG;

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = getBlogSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return {
		title: `${post.frontmatter.title} | ${brand.name} Blog`,
		description: post.frontmatter.excerpt,
	};
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const { default: Post } = await import(`@/content/blog/${post.slug}.mdx`);
	const readingTime = calculateReadingTime(post.content);
	const relatedPosts = getRelatedPostsForClient(
		post.slug,
		post.frontmatter.category,
	);

	// Count words for schema
	const wordCount = post.content
		.split(/\s+/)
		.filter((word) => word.length > 0).length;

	// JSON-LD Schema for blog post
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			// Breadcrumb schema
			generateBlogBreadcrumbs(post.frontmatter.title),
			// BlogPosting schema
			generateArticleSchema({
				title: post.frontmatter.title,
				description: post.frontmatter.excerpt,
				slug: post.slug,
				datePublished: post.frontmatter.publishedAt,
				dateModified: post.frontmatter.publishedAt,
				image: post.frontmatter.coverImage,
				category: post.frontmatter.category,
				wordCount,
				type: "BlogPosting",
				basePath: "blog",
			}),
		],
	};

	return (
		<>
			<JsonLd data={jsonLd} />

			<article className="min-h-screen pb-20">
				{/* Hero Section */}
				<div className="relative h-[50vh] min-h-[400px] w-full flex items-end">
					{post.frontmatter.coverImage && (
						<Image
							src={post.frontmatter.coverImage}
							alt={post.frontmatter.title}
							fill
							sizes="100vw"
							className="object-cover brightness-[0.3]"
							priority
						/>
					)}
					<div className="container px-6 mx-auto relative z-10 pb-12 md:pb-16 text-white">
						<div className="max-w-4xl space-y-4">
							<Link
								href="/blog"
								className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-4"
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Blog
							</Link>

							<div className="flex flex-wrap gap-3">
								<Badge
									variant="outline"
									className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
								>
									<Tag className="w-3 h-3 mr-1" />
									{post.frontmatter.category}
								</Badge>
								<Badge
									variant="outline"
									className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
								>
									<Calendar className="w-3 h-3 mr-1" />
									{formatDate(post.frontmatter.publishedAt)}
								</Badge>
								<Badge
									variant="outline"
									className="text-white border-white/20 bg-white/10 backdrop-blur-sm"
								>
									<Clock className="w-3 h-3 mr-1" />
									{readingTime}
								</Badge>
							</div>

							<TypographyH1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
								{post.frontmatter.title}
							</TypographyH1>
							<TypographyP className="text-lg md:text-xl text-white/80 max-w-2xl font-light mt-0">
								{post.frontmatter.excerpt}
							</TypographyP>
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div className="container px-6 mx-auto mt-12 md:mt-16">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
						<div className="prose prose-lg dark:prose-invert max-w-none">
							<Post />
						</div>

						<aside className="hidden lg:block">
							<div className="sticky top-24 space-y-6">
								<div className="bg-muted/30 rounded-xl p-6 border border-border">
									<TableOfContents />
								</div>

								<div className="bg-muted/30 rounded-xl p-6 border border-border">
									<ShareButtons title={post.frontmatter.title} />
								</div>

								{relatedPosts.length > 0 && (
									<div className="bg-muted/30 rounded-xl p-6 border border-border">
										<RelatedPosts posts={relatedPosts} />
									</div>
								)}

								<div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
									<h3 className="font-bold text-xl mb-2">
										Need Plumbing Help in {seo.location.city}?
									</h3>
									<p className="text-primary-foreground mb-6">
										Our expert team is ready to assist with any plumbing issue.
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
		</>
	);
}
