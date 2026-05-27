import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetailPageClient from "./BlogDetailPageClient";
import { supabase } from "@/lib/supabase";

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

    // Safely attempt server-side Supabase pre-fetch for real-time SEO
    try {
        const { data, error } = await supabase
            .from("articles")
            .select("title, excerpt, image")
            .eq("id", slug)
            .single();
            
        if (data && !error) {
            titleText = `${data.title} | Aqua Stone`;
            descText = data.excerpt;
            image = data.image;
        }
    } catch (e) {
        // fail silently on missing database connections
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

    try {
        // Fetch active article server-side for search engines (SEO)
        const { data: article, error } = await supabase
            .from("articles")
            .select("*")
            .eq("id", slug)
            .single();

        if (error || !article) {
            return notFound();
        }

        // Dynamic sibling querying for next/prev articles based on created_at timestamp
        // Fetch previous article (older than current)
        const { data: prevData } = await supabase
            .from("articles")
            .select("id, title")
            .lt("created_at", article.created_at)
            .order("created_at", { ascending: false })
            .limit(1);

        // Fetch next article (newer than current)
        const { data: nextData } = await supabase
            .from("articles")
            .select("id, title")
            .gt("created_at", article.created_at)
            .order("created_at", { ascending: true })
            .limit(1);

        const prevArticle = prevData && prevData.length > 0 ? prevData[0] : null;
        const nextArticle = nextData && nextData.length > 0 ? nextData[0] : null;

        const mappedArticle = {
            title: article.title,
            category: article.category,
            author: article.author,
            date: article.date,
            readTime: article.read_time,
            image: article.image,
            content: article.content,
            nextSlug: nextArticle ? nextArticle.id : null,
            nextTitle: nextArticle ? nextArticle.title : null,
            prevSlug: prevArticle ? prevArticle.id : null,
            prevTitle: prevArticle ? prevArticle.title : null
        };

        return (
            <BlogDetailPageClient 
                slug={slug} 
                initialArticle={mappedArticle} 
            />
        );
    } catch (err) {
        console.error("Server-side article fetch failed:", err);
        return notFound();
    }
}