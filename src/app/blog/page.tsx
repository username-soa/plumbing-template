import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogHero } from "./_components/blog-hero";
import { BlogGrid } from "./_components/blog-grid";
import { getAllBlogPostsForClient, getBlogCategories } from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
	title: `Blog | ${SITE_CONFIG.brand.name}`,
	description:
		"Expert plumbing tips, maintenance guides, and insights from our professional team. Learn how to protect your home and make informed decisions.",
};

function BlogGridSkeleton() {
	return (
		<section className="py-12 md:py-16">
			<div className="container mx-auto px-6">
				<div className="mb-10 flex gap-2">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="h-10 w-24 animate-pulse rounded-full bg-muted"
						/>
					))}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
					))}
				</div>
			</div>
		</section>
	);
}

export default function BlogPage() {
	const posts = getAllBlogPostsForClient();
	const categories = getBlogCategories();

	return (
		<>
			<BlogHero />
			<Suspense fallback={<BlogGridSkeleton />}>
				<BlogGrid posts={posts} categories={categories} />
			</Suspense>
		</>
	);
}
