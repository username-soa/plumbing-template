import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_PATH = path.join(process.cwd(), "src/content/case-studies");

export interface CaseStudy {
	slug: string;
	frontmatter: {
		title: string;
		category: string;
		summary: string;
		location: string;
		duration: string;
		relatedService: string;
		featured: boolean;
		heroImage?: string;
		[key: string]: any;
	};
	content: string;
}

export const getCaseStudySlugs = () => {
	if (!fs.existsSync(CASE_STUDIES_PATH)) {
		return [];
	}
	return fs
		.readdirSync(CASE_STUDIES_PATH)
		.filter((path) => /\.mdx?$/.test(path))
		.map((path) => path.replace(/\.mdx?$/, ""));
};

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
	const realSlug = slug.replace(/\.mdx?$/, "");
	const filePath = path.join(CASE_STUDIES_PATH, `${realSlug}.mdx`);

	if (!fs.existsSync(filePath)) {
		return undefined;
	}

	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	return {
		slug: realSlug,
		frontmatter: data as CaseStudy["frontmatter"],
		content,
	};
};

export const getAllCaseStudies = (): CaseStudy[] => {
	const slugs = getCaseStudySlugs();
	const caseStudies = slugs
		.map((slug) => getCaseStudyBySlug(slug))
		.filter((post): post is CaseStudy => post !== undefined)
		// Sort by featured first, then you might want to add a date field or just random/alphabetical
		.sort((a, b) =>
			a.frontmatter.featured === b.frontmatter.featured
				? 0
				: a.frontmatter.featured
					? -1
					: 1,
		);

	return caseStudies;
};
