import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/mdx";

const { seo, services } = SITE_CONFIG;

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = seo.siteUrl;

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/case-studies`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/privacy-policy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/terms-conditions`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	// Dynamic service pages
	const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
		url: `${baseUrl}/services/${service.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	// Dynamic blog posts
	const blogPosts = getAllBlogPosts();
	const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.frontmatter.publishedAt),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	// Dynamic case studies
	const caseStudies = getAllCaseStudies();
	const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
		url: `${baseUrl}/case-studies/${study.slug}`,
		lastModified: study.frontmatter.completedDate
			? new Date(study.frontmatter.completedDate)
			: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	return [...staticPages, ...servicePages, ...blogPages, ...caseStudyPages];
}
