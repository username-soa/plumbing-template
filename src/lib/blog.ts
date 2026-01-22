import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
	type BlogPostFrontmatter,
	type BlogPostData,
	calculateReadingTime,
} from "./blog-utils";

export type { BlogPostFrontmatter, BlogPostData };
export { formatDate, calculateReadingTime } from "./blog-utils";

const BLOG_PATH = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
	slug: string;
	frontmatter: BlogPostFrontmatter;
	content: string;
}

export const getBlogSlugs = (): string[] => {
	if (!fs.existsSync(BLOG_PATH)) {
		return [];
	}
	return fs
		.readdirSync(BLOG_PATH)
		.filter((path) => /\.mdx?$/.test(path))
		.map((path) => path.replace(/\.mdx?$/, ""));
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
	const realSlug = slug.replace(/\.mdx?$/, "");
	const filePath = path.join(BLOG_PATH, `${realSlug}.mdx`);

	if (!fs.existsSync(filePath)) {
		return undefined;
	}

	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	return {
		slug: realSlug,
		frontmatter: data as BlogPostFrontmatter,
		content,
	};
};

export const getAllBlogPosts = (): BlogPost[] => {
	const slugs = getBlogSlugs();
	const posts = slugs
		.map((slug) => getBlogPostBySlug(slug))
		.filter((post): post is BlogPost => post !== undefined)
		.sort(
			(a, b) =>
				new Date(b.frontmatter.publishedAt).getTime() -
				new Date(a.frontmatter.publishedAt).getTime(),
		);

	return posts;
};

export const getAllBlogPostsForClient = (): BlogPostData[] => {
	return getAllBlogPosts().map((post) => ({
		slug: post.slug,
		frontmatter: post.frontmatter,
		readingTime: calculateReadingTime(post.content),
	}));
};

export const getBlogCategories = (): string[] => {
	const posts = getAllBlogPosts();
	const categories = new Set<string>();
	posts.forEach((post) => {
		if (post.frontmatter.category) {
			categories.add(post.frontmatter.category);
		}
	});
	return Array.from(categories).sort();
};

export const getRelatedPostsForClient = (
	currentSlug: string,
	category: string,
	maxPosts = 3,
): BlogPostData[] => {
	const posts = getAllBlogPosts()
		.filter(
			(post) =>
				post.slug !== currentSlug && post.frontmatter.category === category,
		)
		.slice(0, maxPosts);

	return posts.map((post) => ({
		slug: post.slug,
		frontmatter: post.frontmatter,
		readingTime: calculateReadingTime(post.content),
	}));
};
