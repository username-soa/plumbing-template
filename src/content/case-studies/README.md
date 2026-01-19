# How to Manage Case Studies

This website uses **MDX** (Markdown + React) for case studies. This allows you to write content easily while including rich components like galleries and video players.

## 📁 Where are the files?
All case studies are located in: `src/content/case-studies/`

Each file represents one case study page. The filename becomes the URL (e.g., `restaurant-project.mdx` -> `yourwebsite.com/case-studies/restaurant-project`).

## ➕ How to add a new Case Study

1. **Create a new file** in `src/content/case-studies/` ending in `.mdx`.
2. **Copy the template below** and paste it into your new file.
3. **Fill in the details** at the top (Frontmatter) and write your content.
4. **Save** and the new page will automatically appear on the site.

### Template

```mdx
---
title: "Project Title Here"
category: "Residential" 
summary: "Short description shown on the listing page (1-2 sentences)."
location: "Neighborhood or City"
duration: "e.g. 3 Days"
relatedService: "service-slug" 
featured: true
heroImage: "/path/to/image.jpg"
---

## The Challenge

Describe the problem here...

<Callout type="info">
Important detail or deadline constraint.
</Callout>

## Included Components Cheat Sheet

### 1. Stats Row
<StatsRow stats={[
  { value: "100%", label: "Success Rate" },
  { value: "2 Days", label: "Timeline" }
]} />

### 2. Before / After Slider
<BeforeAfter 
  before="/images/before.jpg" 
  after="/images/after.jpg" 
/>

### 3. Image Gallery
<ImageGallery 
  images={[
    { src: "/images/1.jpg", caption: "Caption 1" },
    { src: "/images/2.jpg", caption: "Caption 2" }
  ]} 
/>

### 4. Testimonial
<Testimonial 
  quote="Great service!"
  author="John Doe"
  role="Homeowner"
/>

### 5. Video
<VideoPlayer src="/video.mp4" />
OR
<YouTubeEmbed id="VIDEO_ID" />
```

## 🖼️ Where to put images?
Place your images in the `public/` folder, for example `public/case-studies/`. Then link to them starting with `/case-studies/...`.
