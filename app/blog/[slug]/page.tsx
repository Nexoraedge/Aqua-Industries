import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetailPageClient from "./BlogDetailPageClient";
import { supabase } from "@/lib/supabase";

// Detailed static R&D articles index database
const detailedArticles: Record<string, {
    title: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    nextSlug: string;
    nextTitle: string;
    prevSlug: string;
    prevTitle: string;
    content: string;
}> = {
    "evolution-of-polymer": {
        title: "Why Next-Generation Projects Are Abandoning Traditional Cement",
        category: "Featured Report",
        author: "Aqua Stone R&D",
        date: "May 15, 2026",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
        nextSlug: "adhesive-vs-cement",
        nextTitle: "Tile Adhesive vs. White Cement Comparison",
        prevSlug: "swimming-pool-tiling",
        prevTitle: "Glass Mosaic Installation Guide",
        content: ""
    },
    "adhesive-vs-cement": {
        title: "Tile Adhesive vs. White Cement: The Ultimate Engineering Comparison",
        category: "Technical Guide",
        author: "Aqua Stone R&D",
        date: "May 12, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
        nextSlug: "how-much-adhesive",
        nextTitle: "Calculating Trowel Notch Sizes & Coverage",
        prevSlug: "evolution-of-polymer",
        prevTitle: "Abandoning Traditional Cement",
        content: ""
    },
    "how-much-adhesive": {
        title: "Trowel Notch Sizes & Adhesive Coverage: How to Calculate Your Needs",
        category: "Calculations",
        author: "Logistics Team",
        date: "April 28, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
        nextSlug: "swimming-pool-tiling",
        nextTitle: "Swimming Pool Glass Mosaic Installations",
        prevSlug: "adhesive-vs-cement",
        prevTitle: "Tile Adhesive vs. White Cement Guide",
        content: ""
    },
    "swimming-pool-tiling": {
        title: "The Ultimate Guide to Swimming Pool Glass Mosaic Installations",
        category: "Application Deep Dive",
        author: "Engineering Dept.",
        date: "March 15, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        nextSlug: "evolution-of-polymer",
        nextTitle: "Why Projects Abandon Traditional Cement",
        prevSlug: "how-much-adhesive",
        prevTitle: "Calculating Trowel Notch Sizes & Coverage",
        content: ""
    }
};

interface RouteProps {
    params: Promise<{ slug: string }>;
}

// Generates highly descriptive search engine index data directly from the dynamic route parameter
export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    let titleText = "Knowledge Hub Dispatch | Aqua Stone";
    let descText = "Read the latest engineering resources and technical installation insights from Aqua Stone.";
    let image = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop";

    // 1. Check local static database
    const local = detailedArticles[slug];
    if (local) {
        titleText = `${local.title} | Aqua Stone`;
        descText = `Read our technical report: "${local.title}". Engineered for professional architects, builders, and developers.`;
        image = local.image;
    } else {
        // 2. Safely attempt server-side Supabase pre-fetch for real-time SEO
        try {
            const { data } = await supabase
                .from("articles")
                .select("title, excerpt, image")
                .eq("id", slug)
                .single();
                
            if (data) {
                titleText = `${data.title} | Aqua Stone`;
                descText = data.excerpt;
                image = data.image;
            }
        } catch (e) {
            // fail silently on missing database connections
        }
    }

    return {
        title: titleText,
        description: descText,
        openGraph: {
            title: titleText,
            description: descText,
            images: [{ url: image }]
        }
    };
}

export default async function BlogPostPage({ params }: RouteProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    // Load static fallback template if present (excludes content body which is in Client file)
    const staticArticle = detailedArticles[slug] || detailedArticles["evolution-of-polymer"];

    return (
        <BlogDetailPageClient 
            slug={slug} 
            staticArticle={staticArticle} 
        />
    );
}