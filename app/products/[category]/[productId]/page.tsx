import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailPageClient from "./ProductDetailPageClient";
import { detailedProducts } from "@/const";

interface RouteProps {
    params: Promise<{ category: string; productId: string }>;
}

// Highly robust dynamic Google SEO metadata generator for product pages
export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const resolvedParams = await params;
    const prodId = resolvedParams.productId;
    const product = (detailedProducts as Record<string, any>)[prodId];

    if (!product) {
        return {
            title: "Architectural Construction Product | Aqua Stone",
            description: "View technical specifications for Aqua Stone high-performance tile adhesives and epoxy grouts."
        };
    }

    const titleText = `${product.name} | ${product.testReport?.classification || 'Premium Grade'} | Aqua Stone`;
    const descText = `${product.description} Conforms to ${product.testReport?.classification || 'high standards'}. Built for professional-grade architectural layouts.`;

    return {
        title: titleText,
        description: descText,
        openGraph: {
            title: titleText,
            description: descText,
            images: [
                {
                    url: product.image,
                    alt: product.name
                }
            ]
        }
    };
}

export default async function ProductDetailPage({ params }: RouteProps) {
    const resolvedParams = await params;
    const categorySlug = resolvedParams.category;
    const productId = resolvedParams.productId;
    const product = (detailedProducts as Record<string, any>)[productId];

    if (!product) {
        notFound();
    }

    // Dynamic Related Products Logic (Executed on the Server side)
    const relatedProducts = Object.values(detailedProducts)
        .filter((p: any) => p.categorySlug === product.categorySlug && p.id !== product.id)
        .slice(0, 3);

    // Fallback if not enough related in same category
    if (relatedProducts.length < 3) {
        const fallbacks = Object.values(detailedProducts)
            .filter((p: any) => p.id !== product.id && !relatedProducts.find((r: any) => r.id === p.id))
            .slice(0, 3 - relatedProducts.length);
        relatedProducts.push(...fallbacks);
    }

    return (
        <ProductDetailPageClient 
            categorySlug={categorySlug} 
            product={product} 
            relatedProducts={relatedProducts} 
        />
    );
}