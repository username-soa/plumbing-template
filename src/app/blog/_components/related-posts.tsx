import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostData } from "@/lib/blog-utils";
import { formatDate } from "@/lib/blog-utils";

interface RelatedPostsProps {
	posts: BlogPostData[];
	maxPosts?: number;
}

export function RelatedPosts({ posts, maxPosts = 3 }: RelatedPostsProps) {
	const displayPosts = posts.slice(0, maxPosts);

	if (displayPosts.length === 0) {
		return null;
	}

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-sm text-foreground">Related Posts</h4>
			<div className="space-y-4">
				{displayPosts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="group flex gap-3 p-2 -mx-2 rounded-lg transition-colors hover:bg-muted/50"
					>
						{post.frontmatter.coverImage && (
							<div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
								<Image
									src={post.frontmatter.coverImage}
									alt={post.frontmatter.title}
									fill
									sizes="64px"
									className="object-cover"
								/>
							</div>
						)}
						<div className="flex-1 min-w-0">
							<h5 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
								{post.frontmatter.title}
							</h5>
							<p className="text-xs text-muted-foreground mt-1">
								{formatDate(post.frontmatter.publishedAt)}
							</p>
						</div>
						<ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
					</Link>
				))}
			</div>
		</div>
	);
}
