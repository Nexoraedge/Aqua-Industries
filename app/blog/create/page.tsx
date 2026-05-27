"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, Image, Eye, PenTool, CheckCircle, AlertCircle, Copy } from "lucide-react";
import { supabase } from "@/lib/supabase";

const PRESET_IMAGES = [
    { name: "Concrete & Raw Stone", url: "https://www.polycor.com/wp-content/uploads/2023/02/1-Header-Elevate-Your-Concrete-Project-With-Natural-Stone-Accents.jpg" },
    { name: "Industrial Blueprint", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" },
    { name: "Luxury Tile Laying", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
    { name: "Hydrophobic Pool Mosaic", url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop" }
];

const CATEGORIES = [
    "Technical Guide",
    "Calculations",
    "Application Deep Dive",
    "Market Analytics"
];

export default function CreateBlogPostPage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [author, setAuthor] = useState("Aqua Stone R&D");
    const [image, setImage] = useState(PRESET_IMAGES[0].url);
    const [customImage, setCustomImage] = useState("");

    // Automation States
    const [readTime, setReadTime] = useState("1 min read");
    const [isPublishing, setIsPublishing] = useState(false);
    const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({ type: "idle", message: "" });
    const [showPreview, setShowPreview] = useState(false);

    // Auto-generate clean URL slugs from title
    useEffect(() => {
        const generated = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // remove special chars
            .replace(/\s+/g, "-")         // collapse spaces to hyphens
            .replace(/-+/g, "-")          // collapse duplicate hyphens
            .trim();
        setSlug(generated);
    }, [title]);

    // Auto-calculate word-count read time (Avg: 180 words per minute)
    useEffect(() => {
        const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
        const minutes = Math.max(1, Math.ceil(words / 180));
        setReadTime(`${minutes} min read`);
    }, [content]);

    // Formatting date
    const getFormattedDate = () => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
        return new Date().toLocaleDateString("en-US", options);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !excerpt || !content || !slug) {
            setStatus({ type: "error", message: "Please fill out all required fields." });
            return;
        }

        setIsPublishing(true);
        setStatus({ type: "idle", message: "" });

        const articleData = {
            id: slug,
            title,
            excerpt,
            category,
            author,
            date: getFormattedDate(),
            read_time: readTime,
            image: customImage || image,
            content: content.replace(/\n/g, "<br />") // simple line breaks formatting
        };

        try {
            const { error } = await supabase.from("articles").insert([articleData]);

            if (error) {
                console.error("Supabase Detailed Error:", {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code
                });
                throw new Error(`${error.message} (Detail: ${error.details || 'None'}, Code: ${error.code})`);
            }

            setStatus({
                type: "success",
                message: "Article published successfully to Supabase! It is now live in the Knowledge Hub."
            });
            // Reset fields
            setTitle("");
            setExcerpt("");
            setContent("");
            setCustomImage("");
        } catch (err: any) {
            setStatus({
                type: "error",
                message: `Failed to publish to Supabase: ${err.message || "Unknown error"}. Make sure you have created the 'articles' table in the Supabase SQL Editor. Copy your draft below so you do not lose your work!`
            });
        } finally {
            setIsPublishing(false);
        }
    };

    const getRawJsonString = () => {
        return JSON.stringify({
            id: slug,
            title,
            excerpt,
            category,
            author,
            date: getFormattedDate(),
            read_time: readTime,
            image: customImage || image,
            content: content.replace(/\n/g, "<br />")
        }, null, 2);
    };

    const copyRawJson = () => {
        navigator.clipboard.writeText(getRawJsonString());
        alert("Post data copied to clipboard as JSON!");
    };

    return (
        <div className="bg-[#F8F7F4] min-h-screen pb-32 text-brand-900 font-sans selection:bg-brand-900 selection:text-white pt-28">
            <div className="max-w-[1300px] mx-auto px-6 sm:px-12">

                {/* Header */}
                <div className="pt-8 pb-10 border-b border-slate-200 mb-12">
                    <Link href="/blog" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-900 transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Knowledge Hub
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 block mb-2">Publishing Desk</span>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-[0.95] text-brand-950">
                                Article <span className="italic font-normal text-slate-500">Creator.</span>
                            </h1>
                        </div>

                        <div className="flex border border-brand-950/10 bg-white p-1 rounded-none shadow-sm">
                            <button
                                onClick={() => setShowPreview(false)}
                                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${!showPreview ? 'bg-brand-950 text-white' : 'text-slate-500 hover:text-brand-900'}`}
                            >
                                <PenTool className="w-3.5 h-3.5 inline mr-1.5" /> Editor
                            </button>
                            <button
                                onClick={() => setShowPreview(true)}
                                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${showPreview ? 'bg-brand-950 text-white' : 'text-slate-500 hover:text-brand-900'}`}
                            >
                                <Eye className="w-3.5 h-3.5 inline mr-1.5" /> Real-time Preview
                            </button>
                        </div>
                    </div>
                </div>

                {status.type !== "idle" && (
                    <div className={`p-5 mb-10 rounded-none border flex items-start gap-4 ${status.type === "success"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                        }`}>
                        {status.type === "success" ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                        <div className="flex-1">
                            <span className="font-bold text-xs uppercase tracking-wider block mb-1">
                                {status.type === "success" ? "System Success" : "Connection Error / Failure"}
                            </span>
                            <p className="text-sm font-light leading-relaxed">{status.message}</p>

                            {status.type === "error" && (
                                <div className="mt-4 p-3 bg-white border border-rose-100 font-mono text-xs text-slate-600 relative rounded-none max-h-40 overflow-y-auto">
                                    <button
                                        type="button"
                                        onClick={copyRawJson}
                                        className="absolute top-2 right-2 p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer flex items-center gap-1.5 font-sans font-bold uppercase text-[8px] tracking-wider text-slate-600 rounded-none"
                                    >
                                        <Copy className="w-3 h-3" /> Copy JSON
                                    </button>
                                    <pre>{getRawJsonString()}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Workspace */}
                {!showPreview ? (
                    <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Column: Post fields */}
                        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 rounded-none">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 border-b border-slate-100 pb-3 mb-6">
                                01 // Article Specifications
                            </h3>

                            {/* Title field */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                    Article Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Trowel Notch Sizes & Adhesive Coverage..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-[#FAF9F6] border border-slate-200 p-4 text-brand-950 font-serif text-lg sm:text-xl focus:border-brand-950 focus:outline-none transition-colors rounded-none"
                                />
                            </div>

                            {/* Slug & Read-time (Auto Calculated) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                        URL Slug (Auto Generated) *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className="w-full bg-[#FAF9F6] border border-slate-200 p-3 font-mono text-xs text-slate-500 focus:border-brand-950 focus:outline-none transition-colors rounded-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                        Read Time (Auto Calculated)
                                    </label>
                                    <div className="w-full bg-slate-50 border border-slate-200 p-3 font-mono text-xs text-brand-950 font-semibold select-none rounded-none">
                                        {readTime}
                                    </div>
                                </div>
                            </div>

                            {/* Excerpt/Summary */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                    Excerpt Summary * (Max 3 lines)
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Write a brief, compelling introduction to showcase in the article catalog cards..."
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full bg-[#FAF9F6] border border-slate-200 p-4 text-slate-600 font-light text-sm leading-relaxed focus:border-brand-950 focus:outline-none transition-colors rounded-none resize-none"
                                />
                            </div>

                            {/* Content Editor */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2 flex justify-between">
                                    <span>Article Body * (Raw HTML / Standard Text)</span>
                                    <span className="text-[9px] text-slate-400 font-mono tracking-widest lowercase">supports standard HTML styling</span>
                                </label>
                                <textarea
                                    required
                                    rows={15}
                                    placeholder="Write your article here. Supports raw HTML tags like <h2>, <p>, <blockquote>, etc."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full bg-[#FAF9F6] border border-slate-200 p-4 text-slate-700 font-light font-mono text-xs sm:text-sm leading-relaxed focus:border-brand-950 focus:outline-none transition-colors rounded-none resize-y"
                                />
                            </div>
                        </div>

                        {/* Right Column: Settings & Metadata */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Meta specifications */}
                            <div className="bg-white border border-slate-200 p-6 shadow-sm rounded-none space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 border-b border-slate-100 pb-3 mb-4">
                                    02 // Publishing Settings
                                </h3>

                                {/* Category */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                        R&D Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-[#FAF9F6] border border-slate-200 p-3 text-brand-950 font-bold uppercase tracking-wider text-[10px] focus:border-brand-950 focus:outline-none appearance-none cursor-pointer rounded-none"
                                    >
                                        {CATEGORIES.map(c => (
                                            <option key={c} value={c}>{c.toUpperCase()}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Author */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                        Author Designation
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="w-full bg-[#FAF9F6] border border-slate-200 p-3 text-brand-950 font-medium text-xs focus:border-brand-950 focus:outline-none transition-colors rounded-none"
                                    />
                                </div>
                            </div>

                            {/* Cover Image Selector */}
                            <div className="bg-white border border-slate-200 p-6 shadow-sm rounded-none space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 border-b border-slate-100 pb-3 mb-4">
                                    03 // Cover Image Pedestal
                                </h3>

                                {/* Presets */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                        Cover Preset Gallery
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {PRESET_IMAGES.map((img, idx) => (
                                            <button
                                                type="button"
                                                key={idx}
                                                onClick={() => {
                                                    setImage(img.url);
                                                    setCustomImage("");
                                                }}
                                                className={`p-1.5 border relative group text-left rounded-none overflow-hidden aspect-[4/3] flex flex-col justify-end cursor-pointer ${image === img.url && !customImage
                                                    ? "border-brand-950 bg-slate-50 ring-1 ring-brand-950"
                                                    : "border-slate-200 hover:border-slate-400"
                                                    }`}
                                            >
                                                <img src={img.url} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" />
                                                <div className="absolute inset-0 bg-brand-950/20" />
                                                <span className="relative z-10 text-[7px] font-bold uppercase tracking-widest text-white leading-tight">
                                                    {img.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom URL */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 block mb-2">
                                        Custom Image URL (Unsplash/Hosting)
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 rounded-none">
                                            <Image className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="https://images.unsplash.com/..."
                                            value={customImage}
                                            onChange={(e) => setCustomImage(e.target.value)}
                                            className="w-full bg-[#FAF9F6] border border-slate-200 px-3 text-xs focus:border-brand-950 focus:outline-none transition-colors rounded-none"
                                        />
                                    </div>
                                    <span className="text-[8px] font-mono text-slate-400 block mt-1.5 uppercase tracking-wider">
                                        Overrides preset selection above if populated.
                                    </span>
                                </div>
                            </div>

                            {/* Publish Action Card */}
                            <div className="bg-brand-950 text-white p-6 shadow-md rounded-none space-y-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                                <h4 className="font-serif text-lg font-light text-white tracking-tight relative z-10">Confirm Publication</h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-light relative z-10">
                                    Your article will be inserted directly into the Supabase database and rendered on the live Knowledge Hub feed.
                                </p>

                                <button
                                    type="submit"
                                    disabled={isPublishing}
                                    className="relative z-10 w-full bg-white text-brand-950 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all rounded-none flex items-center justify-center gap-3 shrink-0 cursor-pointer transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isPublishing ? "Syncing Database..." : "Publish Article"}
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>

                        </div>
                    </form>
                ) : (
                    /* Real-time Dynamic Live Preview Rendering Panel (luxury editorial page clone) */
                    <div className="bg-[#FAF9F6] p-6 sm:p-12 border border-slate-200 shadow-sm relative rounded-none">
                        <div className="max-w-[1000px] mx-auto pt-4 pb-8">

                            <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-6">
                                <span className="bg-brand-950 text-white px-2.5 py-1 font-sans font-bold tracking-[0.2em] rounded-none">
                                    {category}
                                </span>
                                <span>{getFormattedDate()}</span>
                                <span>{readTime}</span>
                            </div>

                            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-[0.95] text-brand-950 mb-8">
                                {title || "Untitled Article Outline"}
                            </h1>

                            <div className="flex items-center justify-between border-t border-b border-slate-200 py-4 mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-200 flex items-center justify-center rounded-none font-serif text-[10px] font-bold text-brand-950">
                                        AQ
                                    </div>
                                    <div>
                                        <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Author</span>
                                        <span className="block text-xs font-semibold text-brand-900 leading-none">{author}</span>
                                    </div>
                                </div>
                                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">LIVE PREVIEW</span>
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div className="w-full h-64 sm:h-96 max-w-[1100px] mx-auto mb-12 overflow-hidden border border-slate-200 shadow-sm">
                            <img
                                src={customImage || image}
                                alt="Cover image preview"
                                className="w-full h-full object-cover object-center grayscale"
                            />
                        </div>

                        {/* Article Text Content */}
                        <div className="max-w-[750px] mx-auto">
                            <div
                                className="prose prose-md max-w-none 
                                prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight 
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-brand-950
                                prose-p:font-light prose-p:leading-relaxed prose-p:text-slate-600 prose-p:text-sm sm:prose-p:text-base
                                prose-blockquote:border-l-4 prose-blockquote:border-brand-950 prose-blockquote:bg-slate-100 prose-blockquote:p-6 prose-blockquote:font-serif prose-blockquote:text-lg prose-blockquote:italic prose-blockquote:text-brand-900 prose-blockquote:my-6
                                [&_img]:w-full [&_img]:h-48 sm:[&_img]:h-80 [&_img]:object-cover [&_img]:border [&_img]:border-slate-200 [&_img]:my-6
                                [&_span]:block [&_span]:text-center [&_span]:text-[10px] [&_span]:text-slate-400 [&_span]:font-mono [&_span]:uppercase [&_span]:tracking-wider [&_span]:mb-6 [&_span]:mt-[-1rem]"
                                dangerouslySetInnerHTML={{
                                    __html: content.replace(/\n/g, "<br />") || "<p class='text-slate-400 italic font-mono'>Content draft is currently empty. Use the Editor tab to start writing...</p>"
                                }}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
