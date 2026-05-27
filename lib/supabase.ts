import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
    "";

// Graceful fallback for local developer setups without active env files
if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== "undefined") {
        console.warn(
            "Supabase credentials missing. Knowledge Hub is running in fallback mode with local static articles."
        );
    }
}

export const supabase = createClient(
    supabaseUrl || "https://placeholder-project.supabase.co",
    supabaseAnonKey || "placeholder-key"
);
