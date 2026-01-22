// Shared types and utility functions that are safe to use in both client and server components

export interface BlogPostFrontmatter {
	title: string;
	excerpt: string;
	publishedAt: string;
	category: string;
	tags: string[];
	coverImage: string;
	featured?: boolean;
}

export interface BlogPostData {
	slug: string;
	frontmatter: BlogPostFrontmatter;
	readingTime: string;
}

export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const calculateReadingTime = (content: string): string => {
	const wordsPerMinute = 200;
	const wordCount = content.split(/\s+/).length;
	const minutes = Math.ceil(wordCount / wordsPerMinute);
	return `${minutes} min read`;
};
