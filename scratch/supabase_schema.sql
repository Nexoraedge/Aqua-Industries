-- SQL Schema to create the dynamic blog articles table in Supabase
-- Run this block directly inside your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS articles (
  id text PRIMARY KEY, -- Slug of the article, e.g. "evolution-of-polymer"
  title text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  date text NOT NULL,
  read_time text NOT NULL,
  image text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create Policies to grant read/write access to everyone for standard public submission
-- Note: For a high-security production app, insert policy should be restricted to authenticated admins, 
-- but for ease of B2B uploads, standard public inserts are allowed here.

CREATE POLICY "Enable read access for all users" ON articles
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON articles
  FOR INSERT WITH CHECK (true);
