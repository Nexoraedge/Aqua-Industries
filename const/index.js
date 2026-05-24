 export const products = [
    {
      id: "ultimabond-1t",
      name: "Ultima Bond TYPE 1T",
      grade: "C1TE • IS 15477:2019",
      description: "Standard thin-set adhesive. Ideal for smaller size ceramic tiles on both floor and wall applications.",
      badge: "Standard Fix",
      bgClass: "bg-orange-50 text-orange-950 border border-orange-200",
      tagColor: "text-orange-700 bg-orange-100 border border-orange-200",
      stats: { strength: "1.36 N/mm²", coverage: "4.5-5.5 m²" },
      image: "/assest/Ultimabondtype-1t.jpeg",
      packsize:"20kg"
    },
    {
      id: "ultimabond-2t",
      name: "Ultima Bond TYPE 2T",
      grade: "C2TE • IS 15477:2019",
      description: "Engineered for superior performance. High slip resistance for vertical application of small to medium ceramic tiles.",
      badge: "High Strength",
      bgClass: "bg-green-50 text-green-950 border border-green-200",
      tagColor: "text-green-800 bg-green-100 border border-green-300",
      stats: { strength: "1.95 N/mm²", coverage: "4.5-5.5 m²" },
      image: "/assest/Ultimabondtype-2t.jpeg",
      packsize:"20kg"
    },
    {
      id: "ultimabond-3",
      name: "Ultima Bond TYPE 3",
      grade: "C2TE S1 • IS 15477:2019",
      description: "Highly deformable premium adhesive. Engineered specifically for large format tiles, marble, granite, and exterior cladding.",
      badge: "Premium Heavy-Duty",
      bgClass: "bg-[#092c74] text-white border border-blue-900",
      tagColor: "text-blue-100 bg-blue-800 border border-blue-700",
      stats: { strength: "1.95 N/mm²", coverage: "2.5-3.5 m²" },
      image: "/assest/ultimabondtype-3t.jpeg",
      packsize:"20kg"
    },
    {
      id: "gripoxy",
      name: "Gripoxy® System",
      grade: "Chemical Resistant Grout",
      description: "Premium 3-component epoxide system. High-performance, stain-proof joints for residential and commercial environments.",
      badge: "100% Stain Proof",
      bgClass: "bg-slate-50 text-slate-900 border border-brand-100",
      tagColor: "text-brand-800 bg-brand-50 border border-brand-100",
      stats: { strength: "Epoxy Base", coverage: "Varies" },
      image: "/assest/Gripoxy.jpeg",
      packsize:"1kg" 
    }
  ];

  export const stats = [
    { value: "150K+", label: "Metric Tons / Annum Capacity", desc: "Fully automated manufacturing pipeline ensuring scaling production consistency." },
    { value: "48+", label: "Custom Mineral Grout Shades", desc: "Bespoke designer color options curated to complement luxury stone tiles." },
    { value: "ISO", label: "9001:2015 Certified Plant", desc: "Rigorous laboratory testing workflows aligned with strict BIS international metrics." },
    { value: "0% VOC", label: "Eco-Friendly Green Matrix", desc: "Certified formulation safe for clean drinking water structures and swimming pools." }
  ];
export  const articles = [
    {
      id: "adhesive-vs-cement",
      title: "Tile Adhesive vs. White Cement: The Ultimate Engineering Comparison",
      excerpt: "Traditional white cement slurry is prone to shrinkage, cracking, and debonding. Learn why modern architectural projects mandate polymer-modified adhesives like UltimaBond for long-term structural integrity.",
      category: "Technical Guide",
      author: "Aqua Stone R&D",
      date: "May 12, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "how-much-adhesive",
      title: "Trowel Notch Sizes & Adhesive Coverage: How to Calculate Your Needs",
      excerpt: "Are you using a 6mm, 8mm, or 12mm notch trowel? Discover the mathematical formulas behind tile adhesive coverage rates to ensure you never under-order or overspend on your B2B projects.",
      category: "Calculations",
      author: "Logistics Team",
      date: "April 28, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "swimming-pool-tiling",
      title: "The Ultimate Guide to Swimming Pool Glass Mosaic Installations",
      excerpt: "Water pressure, chlorine chemical exposure, and constant submersion make pool tiling highly complex. Learn the step-by-step process of waterproofing and using S1 deformable adhesives for zero-failure results.",
      category: "Application Deep Dive",
      author: "Engineering Dept.",
      date: "March 15, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
    }
  ];
  
  export const detailedProducts = {
      "ultima-bond-1t": {
          id: "ultima-bond-1t",
          name: "Ultima Bond TYPE 1T",
          categorySlug: "ultima-bond-tile-adhesives",
          categoryName: "Tile Adhesives",
          tagline: "Thin-set Adhesive",
          description: "A highly reliable adhesive made specifically for fixing regular ceramic tiles on floors. It conforms to IS 15477:2019 and provides superior adhesion for long-lasting performance.",
          packSizes: ["20 kg"],
          image: "/assest/Ultimabond-1.png",
          features: [
              "Superior adhesion for long-lasting performance.",
              "Engineered for superior performance and durability.",
              "Allows ample time for precise tile placement.",
              "Provides flexibility for aligning tiles perfectly.",
              "High slip resistance for vertical applications."
          ],
          applicationAreas: [
              { text: "Floor and Wall tiles of small sizes", image: "/hero_small_architecture_1779022130822.png" },
              { text: "12\" x 18\", 1\" x 1\", 2\" x 2\" Ceramic Tiles", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Interior & Exterior Use", image: "/hero_small_architecture_1779022130822.png" }
          ],
          testReport: {
              classification: "Type-1T",
              tensileDry: "0.70",
              tensileWet: "N/A",
              shearDry: "1.36",
              shearHeat: "N/A",
              shearWet: "N/A",
              openTime: "30",
              adjustmentTime: "35",
              slip: "0.29",
              deformability: "3.29"
          }
      },
      "ultima-bond-2t": {
          id: "ultima-bond-2t",
          name: "Ultima Bond TYPE 2T",
          categorySlug: "ultima-bond-tile-adhesives",
          categoryName: "Tile Adhesives",
          tagline: "C2TE Thin-set Adhesive",
          description: "A super-strong adhesive designed for heavy vitrified tiles and natural stones. It conforms to EN 12004 C2TE standards, preventing heavy stones from shifting or cracking over time.",
          packSizes: ["20 kg"],
          image: "/assest/Ultimabond-2.png",
          features: [
              "Superior adhesion for long-lasting performance.",
              "Engineered for superior performance and durability.",
              "Allows ample time for precise tile placement.",
              "Provides flexibility for aligning tiles perfectly.",
              "High slip resistance for vertical applications."
          ],
          applicationAreas: [
              { text: "Floor and Wall tiles of small to medium sizes", image: "/hero_small_architecture_1779022130822.png" },
              { text: "2\" x 4\", 2.5\" x 5\" Ceramic tiles", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Interior & Exterior Use", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Water Resistant Areas", image: "/hero_small_architecture_1779022130822.png" }
          ],
          testReport: {
              classification: "Type-2T",
              tensileDry: "1.34",
              tensileWet: "1.31",
              shearDry: "1.95",
              shearHeat: "1.74",
              shearWet: "1.51",
              openTime: "30",
              adjustmentTime: "35",
              slip: "0.22",
              deformability: "3.60"
          }
      },
      "ultima-bond-3": {
          id: "ultima-bond-3",
          name: "Ultima Bond TYPE 3",
          categorySlug: "ultima-bond-tile-adhesives",
          categoryName: "Tile Adhesives",
          tagline: "C2TE S1 Thin-set Adhesive",
          description: "Premium heavy-duty, highly deformable adhesive. Built for massive large format slabs, marble, granite, and stones. Conforms to EN 12004 C2TE S1 standards for maximum strength.",
          packSizes: ["20 kg"],
          image: "/assest/UltimaBond-3.png",
          features: [
              "Superior adhesion for long-lasting performance.",
              "Engineered for superior performance and durability.",
              "Allows ample time for precise tile placement.",
              "Provides flexibility for aligning tiles perfectly.",
              "High slip resistance for vertical application."
          ],
          applicationAreas: [
              { text: "Large format tiles", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Marble, Granite, Stone", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Cladding and heavy exterior use", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Interior & Exterior Use", image: "/hero_small_architecture_1779022130822.png" }
          ],
          testReport: {
              classification: "Type-3",
              tensileDry: "1.92",
              tensileWet: "1.80",
              shearDry: "1.95",
              shearHeat: "1.61",
              shearWet: "1.51",
              openTime: "35",
              adjustmentTime: "40",
              slip: "0.18",
              deformability: "3.75"
          }
      },
      "gripoxy-system": {
          id: "gripoxy-system",
          name: "Gripoxy Epoxy Grout",
          categorySlug: "gripoxy-epoxy-grouts",
          categoryName: "Epoxy Grouts",
          tagline: "100% Stain Proof Joints",
          description: "Advanced epoxide system engineered for high-traffic stone layouts. Complete resistance against acids, cleansers, and biological staining.",
          packSizes: ["1 Kg", "5 Kg"],
          image: "/assest/Gripozy.png",
          features: [
              "100% Stain proof and water resistant.",
              "Chemical and acid resistant.",
              "Does not crack or shrink over time.",
              "Extremely easy to clean."
          ],
          applicationAreas: [
              { text: "Kitchen backsplashes", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Bathroom and shower floors", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Swimming pools", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Heavy commercial traffic areas", image: "/hero_small_architecture_1779022130822.png" }
          ],
          testReport: {
              classification: "Epoxy",
              tensileDry: "N/A",
              tensileWet: "N/A",
              shearDry: "N/A",
              shearHeat: "N/A",
              shearWet: "N/A",
              openTime: "45",
              adjustmentTime: "60",
              slip: "N/A",
              deformability: "N/A"
          }
      },
      "ultima-v-two-grout": {
          id: "ultima-v-two-grout",
          name: "Ultima V-Two Grout",
          categorySlug: "ultima-v-two-grout",
          categoryName: "Polymer Grouts",
          tagline: "High Polymer Modified Grout",
          description: "High polymer modified grout for wall & floor tile joints. Ideal for kitchens, bathrooms, shower stalls, toilets, etc. Creates a smooth, beautiful, water-resistant finish.",
          packSizes: ["1 Kg"],
          image: "/assest/v-two-grout-placeholder.jpg",
          features: [
              "High polymer modified for flexibility.",
              "Smooth, flawless finish for tile joints.",
              "Water resistant to prevent mold growth.",
              "Easy to apply with a grout float or sponge."
          ],
          applicationAreas: [
              { text: "Kitchen and bathroom walls", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Shower stalls and toilets", image: "/hero_small_architecture_1779022130822.png" },
              { text: "Ceramic and vitrified floor joints", image: "/hero_small_architecture_1779022130822.png" }
          ],
          testReport: {
              classification: "Polymer",
              tensileDry: "N/A",
              tensileWet: "N/A",
              shearDry: "N/A",
              shearHeat: "N/A",
              shearWet: "N/A",
              openTime: "N/A",
              adjustmentTime: "N/A",
              slip: "N/A",
              deformability: "N/A"
          }
      }
  };
