import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import * as CustomComponents from "@/components/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Typography components
		h1: ({ children }: { children: ReactNode }) => (
			<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-12 mb-6 first:mt-0">
				{children}
			</h1>
		),
		h2: ({ children }: { children: ReactNode }) => (
			<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-10 mb-4 pb-2">
				{children}
			</h2>
		),
		h3: ({ children }: { children: ReactNode }) => (
			<h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
				{children}
			</h3>
		),
		h4: ({ children }: { children: ReactNode }) => (
			<h4 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
				{children}
			</h4>
		),
		h5: ({ children }: { children: ReactNode }) => (
			<h5 className="text-base md:text-lg font-medium text-foreground mt-4 mb-2">
				{children}
			</h5>
		),
		h6: ({ children }: { children: ReactNode }) => (
			<h6 className="text-sm md:text-base font-medium text-muted-foreground mt-4 mb-2">
				{children}
			</h6>
		),
		p: ({ children }: { children: ReactNode }) => (
			<p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
				{children}
			</p>
		),
		ul: ({ children }: { children: ReactNode }) => (
			<ul className="my-6 ml-6 list-disc text-muted-foreground space-y-2">
				{children}
			</ul>
		),
		ol: ({ children }: { children: ReactNode }) => (
			<ol className="my-6 ml-6 list-decimal text-muted-foreground space-y-2">
				{children}
			</ol>
		),
		li: ({ children }: { children: ReactNode }) => (
			<li className="text-base md:text-lg leading-relaxed">{children}</li>
		),
		a: ({ href, children }: { href?: string; children: ReactNode }) => (
			<a
				href={href}
				className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
			>
				{children}
			</a>
		),
		blockquote: ({ children }: { children: ReactNode }) => (
			<blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground">
				{children}
			</blockquote>
		),
		hr: () => <hr className="my-8 border-border" />,
		strong: ({ children }: { children: ReactNode }) => (
			<strong className="font-semibold text-foreground">{children}</strong>
		),
		code: ({ children }: { children: ReactNode }) => (
			<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
				{children}
			</code>
		),
		pre: ({ children }: { children: ReactNode }) => (
			<pre className="mb-6 mt-4 overflow-x-auto rounded-lg bg-muted p-4">
				{children}
			</pre>
		),
		// Custom components
		...components,
		...CustomComponents,
	};
}
