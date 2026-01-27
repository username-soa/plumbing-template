import createMDX from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	experimental: {
		inlineCss: true,
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [["remark-frontmatter", { type: "yaml", marker: "-" }]],
	},
});

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(withMDX(nextConfig));
