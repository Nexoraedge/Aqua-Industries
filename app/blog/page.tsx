import React from "react";
import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Technical Dispatches & Architectural Insights | Aqua Stone",
  description: "Explore the Aqua Stone R&D Knowledge Hub. In-depth technical guides, tile adhesive calculator, polymer mortar comparisons, and swimming pool tile specifications.",
  openGraph: {
    title: "Technical Dispatches & Architectural Insights | Aqua Stone",
    description: "Explore the Aqua Stone R&D Knowledge Hub. In-depth technical guides, tile adhesive calculator, polymer mortar comparisons, and swimming pool tile specifications.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 675,
        alt: "Aqua Stone Knowledge Hub",
      },
    ],
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}