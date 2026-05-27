import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryPageClient from "./CategoryPageClient";

// Production Data Model
const products = [
    // Adhesives
    {
        id: "ultima-bond-1t",
        name: "Ultima Bond TYPE 1T",
        categorySlug: "ultima-bond-tile-adhesives",
        grade: "IS 15477 Type 1",
        packSize: "20 Kg",
        image: "/assest/Ultimabond-1.png",
        strength: "1.4 N/mm²",
        coverage: "4.0 kg/m²",
        description: "Standard set polymer-modified cementitious adhesive engineered for porous ceramic tiles on regular floor applications. Delivers reliable performance for everyday residential use."
    },
    {
        id: "ultima-bond-2t",
        name: "Ultima Bond TYPE 2T",
        categorySlug: "ultima-bond-tile-adhesives",
        grade: "IS 15477 Type 2",
        packSize: "20 Kg",
        image: "/assest/Ultimabond-2.png",
        strength: "2.1 N/mm²",
        coverage: "3.5 kg/m²",
        description: "High-strength adhesive with extended open time. Ideal for vitrified tiles, marble, and heavy natural stones in high-traffic residential and commercial areas."
    },
    {
        id: "ultima-bond-3",
        name: "Ultima Bond TYPE 3",
        categorySlug: "ultima-bond-tile-adhesives",
        grade: "C2TES1",
        packSize: "20 Kg",
        image: "/assest/UltimaBond-3.png",
        strength: "2.8 N/mm²",
        coverage: "3.5 kg/m²",
        description: "Premium heavy-duty, highly deformable adhesive. Built for massive large format slabs, exterior high-rise facades, and continuously submerged environments like swimming pools."
    },
    // Epoxies
    {
        id: "gripoxy-system",
        name: "Gripoxy® System",
        categorySlug: "gripoxy-epoxy-grouts",
        grade: "100% Stain Proof",
        packSize: "1 Kg / 5 Kg Kits",
        image: "/assest/Gripozy.png",
        strength: "Epoxy Base",
        coverage: "Variable",
        description: "Advanced three-component epoxide system engineered for high-traffic stone layouts. Complete resistance against harsh industrial acids, cleansers, and biological staining."
    },
    // Polymer Grouts
    {
        id: "ultima-v-two-grout",
        name: "Ultima V-Two Grout",
        categorySlug: "ultima-v-two-grout",
        grade: "High Polymer Modified",
        packSize: "1 Kg",
        image: "/assest/v-two-grout-placeholder.jpg",
        strength: "Water Resistant",
        coverage: "Variable",
        description: "High polymer modified grout for wall and floor tile joints. Ideal for kitchens, bathrooms, and shower stalls. Creates a smooth, water-resistant finish."
    }
];

const categoryMeta = {
    "ultima-bond-tile-adhesives": { 
        title: "Premium Tile Adhesives | High-Strength Mortar Systems", 
        label: "Ultima Bond Series",
        seoDesc: "Browse our high-performance polymer-modified tile adhesives. Conforming to IS 15477 and EN standards for ceramic, vitrified slabs, and swimming pools."
    },
    "gripoxy-epoxy-grouts": { 
        title: "Epoxy Grouts | 100% Stain-Proof Luxury Tile Fillers", 
        label: "Gripoxy Systems",
        seoDesc: "Discover Gripoxy premium three-component epoxy tile grouts. Acid-resistant, waterproof, and ideal for luxury residential and commercial environments."
    },
    "ultima-v-two-grout": { 
        title: "Polymer Grouts | Water-Resistant Joint Mortars", 
        label: "Ultima V-Two Grout",
        seoDesc: "Explore Ultima V-Two high-polymer modified tile joint grouts. Ideal for moisture-intense areas like bathroom shower stalls, kitchen walls, and toilets."
    }
};

interface RouteProps {
    params: Promise<{ category: string }>;
}

// Highly robust Google SEO dynamic metadata generator
export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const resolvedParams = await params;
    const category = resolvedParams.category;
    const meta = categoryMeta[category as keyof typeof categoryMeta];

    if (!meta) {
        return {
            title: "Architectural Construction Systems | Aqua Stone",
            description: "Browse Aqua Stone premium grade construction chemicals, tile mortars, and epoxy joint fillers."
        };
    }

    return {
        title: `${meta.title} | Aqua Stone`,
        description: meta.seoDesc,
        openGraph: {
            title: `${meta.title} | Aqua Stone`,
            description: meta.seoDesc,
            type: "website"
        }
    };
}

export default async function CategoryPage({ params }: RouteProps) {
    const resolvedParams = await params;
    const categorySlug = resolvedParams.category;
    const meta = categoryMeta[categorySlug as keyof typeof categoryMeta];
    const catProducts = products.filter(p => p.categorySlug === categorySlug);

    if (!meta || catProducts.length === 0) {
        notFound();
    }

    const clientMeta = {
        title: meta.title.split(" | ")[0], // Keep client header crisp and clean
        label: meta.label
    };

    return (
        <CategoryPageClient 
            categorySlug={categorySlug} 
            meta={clientMeta} 
            catProducts={catProducts} 
        />
    );
}
