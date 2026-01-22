"use client";

import { useSearchParams } from "next/navigation";
import { BlogCard } from "./blog-card";
import { CategoryFilter } from "./category-filter";
import type { BlogPostData } from "@/lib/blog-utils";

interface BlogGridProps {
	posts: BlogPostData[];
	categories: string[];
}

export function BlogGrid({ posts, categories }: BlogGridProps) {
	const searchParams = useSearchParams();
	const activeCategory = searchParams.get("category");

	const filteredPosts = activeCategory
		? posts.filter((post) => post.frontmatter.category === activeCategory)
		: posts;

	const featuredPost = filteredPosts.find((post) => post.frontmatter.featured);
	const regularPosts = filteredPosts.filter(
		(post) => !post.frontmatter.featured || post !== featuredPost,
	);

	return (
		<section className="py-12 md:py-16">
			<div className="container mx-auto px-6">
				{/* Category Filter */}
				<div className="mb-10">
					<CategoryFilter categories={categories} />
				</div>

				{/* Featured Post */}
				{featuredPost && activeCategory === null && (
					<div className="mb-12">
						<BlogCard post={featuredPost} featured />
					</div>
				)}

				{/* Posts Grid */}
				{regularPosts.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regularPosts.map((post, index) => (
							<BlogCard key={post.slug} post={post} priority={index === 0} />
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<p className="text-muted-foreground text-lg">
							No posts found in this category.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
