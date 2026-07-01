import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://lokchhaitjizdgqfujir.supabase.co"
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxva2NoaGFpdGppemRncWZ1amlyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjkwOTkzOSwiZXhwIjoyMDk4NDg1OTM5fQ.RzzuMZ2ZH3Nv3v0CKKDrSWskz63KFAY4E72h72PInwI"

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const img = (id) => `https://picsum.photos/seed/${id}/400/400`
const img2 = (id) => `https://picsum.photos/seed/${id}a/400/400`
const img3 = (id) => `https://picsum.photos/seed/${id}b/400/400`



const products = [
  {
    id: "p1", name: "Vitamin C Brightening Serum", brand: "GlowLab",
    category: "Skincare", sub_category: "Serums",
    description: "A potent vitamin C serum that brightens skin, reduces dark spots, and evens out skin tone. Formulated with 15% pure Vitamin C, Vitamin E, and Ferulic Acid for maximum antioxidant protection.",
    ingredients: "Ascorbic Acid (Vitamin C), Tocopherol (Vitamin E), Ferulic Acid, Hyaluronic Acid, Aloe Vera, Glycerin",
    benefits: ["Brightens skin tone", "Reduces dark spots", "Boosts collagen", "Antioxidant protection"],
    how_to_use: "Apply 3-4 drops to clean, dry face after cleansing. Follow with moisturizer and sunscreen. Use morning and evening.",
    price: 38, original_price: 52, discount: 27,
    rating: 4.8, review_count: 2453,
    images: [img(101), img2(101), img3(101)],
    videos: [],
    skin_type: ["All", "Normal", "Oily", "Combination"],
    product_type: "Serum", stock: 50, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: true, flash_sale_ends: "2026-07-03T23:59:59",
    tags: ["vitamin c", "brightening", "serum", "antioxidant"]
  },
  {
    id: "p2", name: "Hyaluronic Acid Moisture Cream", brand: "DewySkin",
    category: "Skincare", sub_category: "Moisturizers",
    description: "Ultra-hydrating moisturizer with triple hyaluronic acid complex. Provides deep, lasting hydration without feeling heavy.",
    ingredients: "Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Ceramides, Squalane, Shea Butter, Panthenol",
    benefits: ["Deep hydration", "Strengthens skin barrier", "Plumps skin", "Soothes irritation"],
    how_to_use: "Apply generously to face and neck after serum. Use morning and evening.",
    price: 34, original_price: 45, discount: 24,
    rating: 4.7, review_count: 1821,
    images: [img(102), img2(102), img3(102)],
    videos: [],
    skin_type: ["All", "Dry", "Normal", "Sensitive"],
    product_type: "Moisturizer", stock: 35, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: true, flash_sale_ends: "2026-07-04T23:59:59",
    tags: ["hyaluronic acid", "moisturizer", "hydration", "cream"]
  },
  {
    id: "p3", name: "Retinol Night Renewal Oil", brand: "GlowLab",
    category: "Skincare", sub_category: "Oils",
    description: "A lightweight retinol oil that works overnight to reduce fine lines, wrinkles, and improve skin texture.",
    ingredients: "Retinol, Jojoba Oil, Rosehip Oil, Vitamin E, Bakuchiol, CoQ10",
    benefits: ["Reduces fine lines", "Improves texture", "Even tone", "Overnight renewal"],
    how_to_use: "Apply 2-3 drops to face after cleansing. Use only at night. Start with 2-3 times per week.",
    price: 48, original_price: 65, discount: 26,
    rating: 4.6, review_count: 987,
    images: [img(103), img2(103)],
    videos: [],
    skin_type: ["Normal", "Combination", "Oily"],
    product_type: "Oil", stock: 25, is_new: true, is_best_seller: false, is_trending: true, is_flash_sale: true, flash_sale_ends: "2026-07-02T23:59:59",
    tags: ["retinol", "night oil", "anti-aging", "wrinkles"]
  },
  {
    id: "p4", name: "Gentle Cica Cleansing Foam", brand: "PureGlow",
    category: "Skincare", sub_category: "Cleansers",
    description: "pH-balanced foaming cleanser with Centella Asiatica (Cica) to calm and cleanse sensitive skin without stripping natural oils.",
    ingredients: "Centella Asiatica Extract, Tea Tree Oil, Salicylic Acid, Aloe Vera, Green Tea Extract",
    benefits: ["Calms irritation", "Removes impurities", "pH balanced", "Non-stripping"],
    how_to_use: "Dispense 1-2 pumps, lather with water, massage onto face, rinse thoroughly. Use morning and evening.",
    price: 22, original_price: 28, discount: 21,
    rating: 4.5, review_count: 1532,
    images: [img(104), img2(104)],
    videos: [],
    skin_type: ["All", "Sensitive", "Dry"],
    product_type: "Cleanser", stock: 60, is_new: true, is_best_seller: false, is_trending: true, is_flash_sale: false,
    tags: ["cica", "cleanser", "sensitive", "calming"]
  },
  {
    id: "p5", name: "Matte Liquid Lipstick - Rose Petal", brand: "VelvetTouch",
    category: "Makeup", sub_category: "Lips",
    description: "Long-wearing matte liquid lipstick with a comfortable, non-drying formula. Stays put for up to 12 hours without feathering.",
    ingredients: "Dimethicone, Vitamin E, Jojoba Oil, Shea Butter, Aloe Vera",
    benefits: ["12hr wear", "Non-drying", "Transfer-proof", "Comfortable matte"],
    how_to_use: "Apply directly to lips. Allow 30 seconds to dry for transfer-proof finish.",
    price: 18, original_price: 24, discount: 25,
    rating: 4.4, review_count: 3210,
    images: [img(105), img2(105)],
    videos: [],
    skin_type: ["All"],
    product_type: "Lipstick", stock: 80, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: true, flash_sale_ends: "2026-07-04T23:59:59",
    tags: ["lipstick", "matte", "long-wear", "rose"]
  },
  {
    id: "p6", name: "Dewy Skin Tint SPF 30", brand: "DewySkin",
    category: "Makeup", sub_category: "Base",
    description: "Light-coverage skin tint with SPF 30 for a natural dewy finish.",
    ingredients: "Zinc Oxide, Niacinamide, Hyaluronic Acid, Vitamin C, Aloe Vera",
    benefits: ["Light coverage", "Sun protection", "Dewy finish", "Skin benefits"],
    how_to_use: "Shake well. Apply with fingers or brush to face after moisturizer. Build as needed.",
    price: 32, original_price: 40, discount: 20,
    rating: 4.6, review_count: 1876,
    images: [img(106), img2(106)],
    videos: [],
    skin_type: ["All", "Normal", "Combination", "Dry"],
    product_type: "Tint", stock: 45, is_new: true, is_best_seller: false, is_trending: true, is_flash_sale: false,
    tags: ["skin tint", "spf", "dewy", "light coverage"]
  },
  {
    id: "p7", name: "Hair Repair Bond Treatment", brand: "BloomEssentials",
    category: "Hair Care", sub_category: "Treatments",
    description: "Bond-repairing treatment that rebuilds damaged hair from within.",
    ingredients: "Hydrolyzed Keratin, Argan Oil, Biotin, Silk Proteins, Vitamin B5",
    benefits: ["Repairs bonds", "Reduces breakage", "Adds shine", "Strengthens hair"],
    how_to_use: "Apply to damp clean hair. Leave for 10 minutes. Rinse thoroughly. Use 1-2 times per week.",
    price: 28, original_price: 36, discount: 22,
    rating: 4.7, review_count: 1456,
    images: [img(107), img2(107)],
    videos: [],
    skin_type: ["All"],
    product_type: "Treatment", stock: 30, is_new: true, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["hair treatment", "bond repair", "keratin", "damaged hair"]
  },
  {
    id: "p8", name: "Radiance Eye Cream with Caffeine", brand: "RadianceCo",
    category: "Skincare", sub_category: "Eye Care",
    description: "Brightening eye cream with caffeine and niacinamide to reduce dark circles, puffiness, and fine lines.",
    ingredients: "Caffeine, Niacinamide, Peptides, Hyaluronic Acid, Vitamin C, Licorice Root",
    benefits: ["Reduces dark circles", "Depuffs", "Brightens", "Smooths fine lines"],
    how_to_use: "Dot a small amount under eyes and gently tap with ring finger. Use morning and evening.",
    price: 36, original_price: 48, discount: 25,
    rating: 4.5, review_count: 876,
    images: [img(108), img2(108)],
    videos: [],
    skin_type: ["All", "Normal", "Dry", "Combination"],
    product_type: "Eye Cream", stock: 40, is_new: false, is_best_seller: true, is_trending: false, is_flash_sale: false,
    tags: ["eye cream", "caffeine", "dark circles", "puffiness"]
  },
  {
    id: "p9", name: "Korean Rice Brightening Toner", brand: "GlowLab",
    category: "Korean Beauty", sub_category: "Toners",
    description: "Traditional Korean rice toner that brightens and smooths skin texture.",
    ingredients: "Fermented Rice Water, Niacinamide, Sake Extract, Glycerin, Green Tea",
    benefits: ["Brightens complexion", "Smooths texture", "Hydrates", "Soothes"],
    how_to_use: "Apply to face after cleansing using hands or cotton pad. Pat gently for absorption.",
    price: 26, original_price: 34, discount: 24,
    rating: 4.8, review_count: 2341,
    images: [img(109), img2(109)],
    videos: [],
    skin_type: ["All", "Normal", "Combination", "Oily"],
    product_type: "Toner", stock: 55, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: true, flash_sale_ends: "2026-07-05T23:59:59",
    tags: ["k-beauty", "rice toner", "brightening", "fermented"]
  },
  {
    id: "p10", name: "Sunscreen SPF 50+ PA++++", brand: "PureGlow",
    category: "Sunscreen", sub_category: "Face Sunscreen",
    description: "Lightweight invisible sunscreen with SPF 50+ PA++++. No white cast, absorbs quickly.",
    ingredients: "Avobenzone, Homosalate, Octisalate, Niacinamide, Hyaluronic Acid, Vitamin E",
    benefits: ["Highest UV protection", "No white cast", "Lightweight", "Makeup-friendly"],
    how_to_use: "Apply generously to face and neck 15 minutes before sun exposure. Reapply every 2 hours.",
    price: 24, original_price: 30, discount: 20,
    rating: 4.7, review_count: 3214,
    images: [img(110), img2(110)],
    videos: [],
    skin_type: ["All", "Normal", "Oily", "Combination"],
    product_type: "Sunscreen", stock: 70, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: false,
    tags: ["sunscreen", "spf 50", "pa++++", "no white cast"]
  },
  {
    id: "p11", name: "Rose Water Hydrating Mist", brand: "BloomEssentials",
    category: "Skincare", sub_category: "Mists",
    description: "100% natural rose water mist to refresh, hydrate, and soothe skin throughout the day.",
    ingredients: "Rosa Damascena Flower Water, Glycerin, Aloe Vera",
    benefits: ["Instantly hydrates", "Refreshes skin", "Soothes redness", "Sets makeup"],
    how_to_use: "Mist onto face as needed throughout the day. Use after cleansing or to set makeup.",
    price: 14, original_price: 18, discount: 22,
    rating: 4.4, review_count: 1654,
    images: [img(111), img2(111)],
    videos: [],
    skin_type: ["All", "Sensitive", "Dry", "Normal"],
    product_type: "Mist", stock: 90, is_new: false, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["rose water", "mist", "hydrating", "natural"]
  },
  {
    id: "p12", name: "Shea & Vanilla Body Butter", brand: "BloomEssentials",
    category: "Body Care", sub_category: "Body Moisturizers",
    description: "Rich whipped body butter with shea butter and vanilla for deep lasting moisture.",
    ingredients: "Shea Butter, Cocoa Butter, Coconut Oil, Vanilla Extract, Vitamin E",
    benefits: ["Deep moisture", "Nourishes skin", "Natural scent", "Non-greasy"],
    how_to_use: "Apply to clean dry skin after bath. Massage in circular motions until absorbed.",
    price: 20, original_price: 26, discount: 23,
    rating: 4.6, review_count: 2134,
    images: [img(112), img2(112)],
    videos: [],
    skin_type: ["All", "Dry", "Normal"],
    product_type: "Body Butter", stock: 65, is_new: false, is_best_seller: true, is_trending: false, is_flash_sale: true, flash_sale_ends: "2026-07-06T23:59:59",
    tags: ["body butter", "shea", "vanilla", "moisturizer"]
  },
  {
    id: "p13", name: "Peptide Lip Treatment", brand: "RadianceCo",
    category: "Makeup", sub_category: "Lips",
    description: "Plumping lip treatment with peptides and hyaluronic acid for smoother, fuller-looking lips.",
    ingredients: "Peptides, Hyaluronic Acid, Squalane, Castor Oil, Vitamin E",
    benefits: ["Plumps lips", "Hydrates", "Smooths lines", "High-shine finish"],
    how_to_use: "Apply to lips as needed. Use alone or over lipstick for added shine.",
    price: 16, original_price: 20, discount: 20,
    rating: 4.3, review_count: 987,
    images: [img(113), img2(113)],
    videos: [],
    skin_type: ["All"],
    product_type: "Lip Treatment", stock: 75, is_new: true, is_best_seller: false, is_trending: true, is_flash_sale: false,
    tags: ["lip treatment", "peptide", "plumping", "hydration"]
  },
  {
    id: "p14", name: "Hyaluronic Acid Sheet Mask 10pk", brand: "DewySkin",
    category: "Skincare", sub_category: "Masks",
    description: "Sheet masks soaked in hyaluronic acid essence for an instant hydration boost.",
    ingredients: "Hyaluronic Acid, Ceramides, Glycerin, Aloe Vera, Panthenol",
    benefits: ["Instant hydration", "Plumps skin", "Calms skin", "Refreshes"],
    how_to_use: "Apply mask to clean face. Leave for 15-20 minutes. Remove and pat in remaining essence.",
    price: 28, original_price: 40, discount: 30,
    rating: 4.5, review_count: 4567,
    images: [img(114), img2(114)],
    videos: [],
    skin_type: ["All", "Dry", "Normal", "Dehydrated"],
    product_type: "Mask", stock: 200, is_new: false, is_best_seller: false, is_trending: false, is_flash_sale: true, flash_sale_ends: "2026-07-06T23:59:59",
    tags: ["sheet mask", "hyaluronic acid", "hydrating", "essence"]
  },
  {
    id: "p15", name: "Lash Growth Serum", brand: "GlowLab",
    category: "Makeup", sub_category: "Eyes",
    description: "Advanced lash growth serum with peptides and biotin that promotes longer, thicker lashes.",
    ingredients: "Peptides, Biotin, Castor Oil, Panthenol, Ginseng Extract",
    benefits: ["Lengthens lashes", "Thickens lashes", "Nourishes", "Results in 4 weeks"],
    how_to_use: "Apply a thin line along upper lash line once daily at night.",
    price: 42, original_price: 55, discount: 24,
    rating: 4.6, review_count: 2789,
    images: [img(115), img2(115)],
    videos: [],
    skin_type: ["All"],
    product_type: "Serum", stock: 40, is_new: false, is_best_seller: true, is_trending: false, is_flash_sale: false,
    tags: ["lash serum", "growth", "peptide", "eyelash"]
  },
  {
    id: "p16", name: "Niacinamide 10% + Zinc Serum", brand: "PureGlow",
    category: "Skincare", sub_category: "Serums",
    description: "High-strength niacinamide serum with zinc to control oil, minimize pores, and improve skin texture.",
    ingredients: "Niacinamide, Zinc PCA, Hyaluronic Acid, Green Tea Extract, Aloe Vera",
    benefits: ["Minimizes pores", "Controls oil", "Improves texture", "Evens tone"],
    how_to_use: "Apply a few drops to face after cleansing and before moisturizer. Use morning and evening.",
    price: 20, original_price: 28, discount: 29,
    rating: 4.6, review_count: 3120,
    images: [img(116), img2(116)],
    videos: [],
    skin_type: ["Oily", "Combination", "Normal"],
    product_type: "Serum", stock: 85, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: false,
    tags: ["niacinamide", "zinc", "pores", "oil control"]
  },
  {
    id: "p17", name: "Snail Mucin 96% Essence", brand: "GlowLab",
    category: "Korean Beauty", sub_category: "Essences",
    description: "Powerful snail mucin essence that repairs, hydrates and rejuvenates skin. A K-beauty cult favorite for glass skin.",
    ingredients: "Snail Secretion Filtrate 96%, Hyaluronic Acid, Panthenol, Allantoin",
    benefits: ["Repairs skin barrier", "Deep hydration", "Soothes inflammation", "Anti-aging"],
    how_to_use: "Apply 1-2 pumps to face after toner. Pat gently for absorption. Follow with moisturizer.",
    price: 22, original_price: 30, discount: 27,
    rating: 4.8, review_count: 5678,
    images: [img(117), img2(117), img3(117)],
    videos: [],
    skin_type: ["All", "Dry", "Sensitive", "Dehydrated"],
    product_type: "Essence", stock: 70, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: true, flash_sale_ends: "2026-07-07T23:59:59",
    tags: ["snail mucin", "k-beauty", "essence", "repair"]
  },
  {
    id: "p18", name: "Vitamin E Nourishing Hair Oil", brand: "BloomEssentials",
    category: "Hair Care", sub_category: "Oils",
    description: "Lightweight hair oil with Vitamin E and argan oil that nourishes dry ends, tames frizz, and adds shine.",
    ingredients: "Vitamin E, Argan Oil, Jojoba Oil, Coconut Oil, Rosemary Extract",
    benefits: ["Nourishes ends", "Tames frizz", "Adds shine", "Lightweight"],
    how_to_use: "Apply 2-3 drops to damp or dry hair, focusing on ends. Style as usual.",
    price: 18, original_price: 24, discount: 25,
    rating: 4.4, review_count: 1234,
    images: [img(118), img2(118)],
    videos: [],
    skin_type: ["All"],
    product_type: "Oil", stock: 55, is_new: true, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["hair oil", "vitamin e", "argan", "frizz control"]
  },
  {
    id: "p19", name: "Volumizing Mascara - Black", brand: "VelvetTouch",
    category: "Makeup", sub_category: "Eyes",
    description: "Intense black volumizing mascara with a unique hourglass brush that coats every lash.",
    ingredients: "Beeswax, Carnauba Wax, Vitamin B5, Keratin, Iron Oxides",
    benefits: ["Dramatic volume", "Lengthens", "Smudge-proof", "All-day wear"],
    how_to_use: "Wiggle brush from root to tip. Layer for more volume. Remove with micellar water.",
    price: 22, original_price: 28, discount: 21,
    rating: 4.5, review_count: 2890,
    images: [img(119), img2(119)],
    videos: [],
    skin_type: ["All"],
    product_type: "Mascara", stock: 90, is_new: false, is_best_seller: false, is_trending: true, is_flash_sale: false,
    tags: ["mascara", "volumizing", "lashes", "makeup"]
  },
  {
    id: "p20", name: "Body Scrub - Coffee & Coconut", brand: "BloomEssentials",
    category: "Body Care", sub_category: "Exfoliators",
    description: "Energizing body scrub with finely ground coffee and coconut oil that exfoliates, smooths, and invigorates skin.",
    ingredients: "Coffee Grounds, Coconut Oil, Brown Sugar, Vitamin E, Shea Butter",
    benefits: ["Exfoliates", "Smooths skin", "Boosts circulation", "Natural ingredients"],
    how_to_use: "Massage onto damp skin in circular motions. Rinse thoroughly. Use 2-3 times per week.",
    price: 24, original_price: 32, discount: 25,
    rating: 4.6, review_count: 1876,
    images: [img(120), img2(120)],
    videos: [],
    skin_type: ["All", "Normal", "Dry"],
    product_type: "Scrub", stock: 45, is_new: true, is_best_seller: true, is_trending: false, is_flash_sale: false,
    tags: ["body scrub", "coffee", "coconut", "exfoliator"]
  },
  {
    id: "p21", name: "Green Tea Matte Moisturizer", brand: "PureGlow",
    category: "Skincare", sub_category: "Moisturizers",
    description: "Oil-free matte moisturizer with green tea that hydrates without greasiness.",
    ingredients: "Green Tea Extract, Salicylic Acid, Niacinamide, Zinc PCA, Aloe Vera",
    benefits: ["Oil-free hydration", "Matter finish", "Reduces breakouts", "Calms skin"],
    how_to_use: "Apply a pea-sized amount to face after serum. Use morning and evening.",
    price: 26, original_price: 34, discount: 24,
    rating: 4.4, review_count: 1456,
    images: [img(121), img2(121)],
    videos: [],
    skin_type: ["Oily", "Combination", "Acne-prone"],
    product_type: "Moisturizer", stock: 60, is_new: false, is_best_seller: false, is_trending: true, is_flash_sale: false,
    tags: ["green tea", "matte", "moisturizer", "oil-free"]
  },
  {
    id: "p22", name: "Setting Spray - Dewy Finish", brand: "VelvetTouch",
    category: "Makeup", sub_category: "Setting",
    description: "Micro-fine setting spray that locks in makeup for 16 hours while giving a natural dewy glow.",
    ingredients: "Water, Glycerin, Aloe Vera, Green Tea Extract, Vitamin B5",
    benefits: ["16hr wear", "Dewy finish", "Locks makeup", "Hydrates"],
    how_to_use: "Hold 8 inches from face. Mist in an X and T pattern. Let air dry.",
    price: 16, original_price: 20, discount: 20,
    rating: 4.3, review_count: 2340,
    images: [img(122), img2(122)],
    videos: [],
    skin_type: ["All"],
    product_type: "Spray", stock: 100, is_new: true, is_best_seller: false, is_trending: true, is_flash_sale: false,
    tags: ["setting spray", "dewy", "makeup", "long-lasting"]
  },
  {
    id: "p23", name: "AHA BHA Exfoliating Toner", brand: "GlowLab",
    category: "Skincare", sub_category: "Toners",
    description: "Dual-action exfoliating toner with AHA and BHA that unclogs pores, smooths texture, and reveals brighter skin.",
    ingredients: "Glycolic Acid, Salicylic Acid, Lactic Acid, Aloe Vera, Panthenol",
    benefits: ["Unclogs pores", "Smooths texture", "Brightens", "Exfoliates"],
    how_to_use: "Apply with cotton pad to face after cleansing. Use only in PM. Start 2-3 times per week.",
    price: 24, original_price: 32, discount: 25,
    rating: 4.5, review_count: 2156,
    images: [img(123), img2(123)],
    videos: [],
    skin_type: ["Normal", "Combination", "Oily"],
    product_type: "Toner", stock: 45, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: false,
    tags: ["aha", "bha", "exfoliating", "toner"]
  },
  {
    id: "p24", name: "Squalane Cleansing Balm", brand: "DewySkin",
    category: "Skincare", sub_category: "Cleansers",
    description: "Silky cleansing balm with squalane that melts away makeup, sunscreen, and impurities without stripping the skin.",
    ingredients: "Squalane, Jojoba Oil, Vitamin E, Green Tea, Chamomile Extract",
    benefits: ["Removes makeup", "Dissolves sunscreen", "Non-stripping", "Nourishes"],
    how_to_use: "Scoop a pea-sized amount. Massage onto dry face. Add water to emulsify. Rinse.",
    price: 30, original_price: 38, discount: 21,
    rating: 4.7, review_count: 1890,
    images: [img(124), img2(124)],
    videos: [],
    skin_type: ["All", "Dry", "Normal", "Sensitive"],
    product_type: "Cleanser", stock: 40, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: false,
    tags: ["cleansing balm", "squalane", "makeup remover", "oil cleanser"]
  },
  {
    id: "p25", name: "Rosehip Brightening Oil", brand: "RadianceCo",
    category: "Skincare", sub_category: "Oils",
    description: "Cold-pressed rosehip seed oil rich in essential fatty acids and vitamin C to brighten, repair, and rejuvenate.",
    ingredients: "Rosa Canina Seed Oil, Vitamin C, Lycopene, Beta-Carotene, Vitamin E",
    benefits: ["Brightens skin", "Reduces scars", "Anti-aging", "Nourishes"],
    how_to_use: "Apply 2-3 drops to face after cleansing. Can be mixed with moisturizer. Use AM and PM.",
    price: 32, original_price: 42, discount: 24,
    rating: 4.5, review_count: 1678,
    images: [img(125), img2(125)],
    videos: [],
    skin_type: ["All", "Dry", "Normal", "Mature"],
    product_type: "Oil", stock: 35, is_new: false, is_best_seller: false, is_trending: true, is_flash_sale: false,
    tags: ["rosehip", "oil", "brightening", "vitamin c"]
  },
  {
    id: "p26", name: "Matte Bronzer Powder - Warm Tan", brand: "VelvetTouch",
    category: "Makeup", sub_category: "Face",
    description: "Silky matte bronzer that gives a natural sun-kissed warmth to the face.",
    ingredients: "Mica, Talc, Zinc Stearate, Vitamin E, Jojoba Oil",
    benefits: ["Natural tan", "Buildable", "Matte finish", "Blends easily"],
    how_to_use: "Brush onto cheeks, forehead, and jawline where the sun naturally hits.",
    price: 26, original_price: 34, discount: 24,
    rating: 4.4, review_count: 1432,
    images: [img(126), img2(126)],
    videos: [],
    skin_type: ["All"],
    product_type: "Bronzer", stock: 55, is_new: true, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["bronzer", "matte", "face", "contour"]
  },
  {
    id: "p27", name: "Cica Sleeping Mask", brand: "PureGlow",
    category: "Skincare", sub_category: "Masks",
    description: "Overnight sleeping mask with Centella Asiatica that calms, repairs, and hydrates while you sleep.",
    ingredients: "Centella Asiatica, Madecassoside, Hyaluronic Acid, Ceramides, Squalane",
    benefits: ["Overnight repair", "Calms redness", "Deep hydration", "Restores barrier"],
    how_to_use: "Apply a generous layer to face as last step of PM routine. Leave overnight. Rinse in AM.",
    price: 26, original_price: 35, discount: 26,
    rating: 4.6, review_count: 2134,
    images: [img(127), img2(127)],
    videos: [],
    skin_type: ["All", "Sensitive", "Dry", "Irritated"],
    product_type: "Mask", stock: 50, is_new: false, is_best_seller: true, is_trending: false, is_flash_sale: true, flash_sale_ends: "2026-07-08T23:59:59",
    tags: ["sleeping mask", "cica", "centella", "overnight"]
  },
  {
    id: "p28", name: "Sakura Body Lotion", brand: "DewySkin",
    category: "Body Care", sub_category: "Body Moisturizers",
    description: "Lightweight cherry blossom scented body lotion that hydrates and leaves skin delicately fragranced.",
    ingredients: "Cherry Blossom Extract, Shea Butter, Glycerin, Vitamin E, Jojoba Oil",
    benefits: ["Lightweight hydration", "Floral scent", "Soft skin", "Quick absorption"],
    how_to_use: "Apply liberally to body after shower. Massage until fully absorbed.",
    price: 18, original_price: 24, discount: 25,
    rating: 4.5, review_count: 1678,
    images: [img(128), img2(128)],
    videos: [],
    skin_type: ["All", "Normal", "Dry"],
    product_type: "Lotion", stock: 80, is_new: true, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["body lotion", "sakura", "cherry blossom", "hydrating"]
  },
  {
    id: "p29", name: "Lip Sleeping Mask - Berry", brand: "GlowLab",
    category: "Korean Beauty", sub_category: "Lips",
    description: "K-beauty lip sleeping mask with berry extracts that softens, smooths, and hydrates lips overnight.",
    ingredients: "Shea Butter, Jojoba Oil, Berry Extracts, Vitamin C, Hyaluronic Acid",
    benefits: ["Overnight treatment", "Softens lips", "Smooths lines", "Berry scent"],
    how_to_use: "Apply a generous layer to lips before bed. Wipe off excess in the morning.",
    price: 16, original_price: 22, discount: 27,
    rating: 4.7, review_count: 3456,
    images: [img(129), img2(129)],
    videos: [],
    skin_type: ["All"],
    product_type: "Mask", stock: 95, is_new: false, is_best_seller: true, is_trending: true, is_flash_sale: false,
    tags: ["lip mask", "sleeping mask", "k-beauty", "berry"]
  },
  {
    id: "p30", name: "Mineral Sunstick SPF 50", brand: "PureGlow",
    category: "Sunscreen", sub_category: "Face Sunscreen",
    description: "Convenient mineral sunstick with SPF 50 for easy reapplication throughout the day.",
    ingredients: "Zinc Oxide, Titanium Dioxide, Shea Butter, Vitamin E, Green Tea",
    benefits: ["Easy reapplication", "Transparent", "Mineral formula", "Travel-friendly"],
    how_to_use: "Swipe directly onto face and neck. Blend with fingers if needed. Reapply every 2 hours.",
    price: 18, original_price: 24, discount: 25,
    rating: 4.3, review_count: 987,
    images: [img(130), img2(130)],
    videos: [],
    skin_type: ["All", "Sensitive", "Normal"],
    product_type: "Sunscreen", stock: 65, is_new: true, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["sunstick", "spf 50", "mineral", "travel"]
  },
  {
    id: "p31", name: "Hydrating Face Mist - Cucumber", brand: "DewySkin",
    category: "Skincare", sub_category: "Mists",
    description: "Refreshing face mist with cucumber and aloe that instantly cools, hydrates, and revitalizes tired skin.",
    ingredients: "Cucumber Extract, Aloe Vera, Glycerin, Allantoin, Panthenol",
    benefits: ["Instantly cools", "Refreshes skin", "Hydrates", "Revitalizes"],
    how_to_use: "Mist onto face whenever skin needs a refresh. Use after cleansing or throughout the day.",
    price: 12, original_price: 16, discount: 25,
    rating: 4.2, review_count: 1234,
    images: [img(131), img2(131)],
    videos: [],
    skin_type: ["All", "Normal", "Oily", "Combination"],
    product_type: "Mist", stock: 120, is_new: true, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["face mist", "cucumber", "hydrating", "refresh"]
  },
  {
    id: "p32", name: "Perfume - White Jasmine", brand: "RadianceCo",
    category: "Fragrance", sub_category: "Eau de Parfum",
    description: "Elegant white jasmine perfume with notes of jasmine petals, vanilla musk, and sandalwood.",
    ingredients: "Alcohol Denat, Parfum, Jasmine Extract, Vanilla, Sandalwood Oil",
    benefits: ["Long-lasting", "Floral scent", "Elegant", "Day to night"],
    how_to_use: "Spray on pulse points: wrists, neck, and behind ears.",
    price: 58, original_price: 75, discount: 23,
    rating: 4.6, review_count: 2134,
    images: [img(132), img2(132)],
    videos: [],
    skin_type: ["All"],
    product_type: "Perfume", stock: 30, is_new: false, is_best_seller: true, is_trending: false, is_flash_sale: false,
    tags: ["perfume", "jasmine", "floral", "fragrance"]
  },
  {
    id: "p33", name: "Multi-Peptide Eye Serum", brand: "RadianceCo",
    category: "Skincare", sub_category: "Eye Care",
    description: "Advanced multi-peptide eye serum that targets fine lines, crow's feet, and loss of firmness.",
    ingredients: "Peptide Complex, Matrixyl, Argireline, Hyaluronic Acid, Vitamin C",
    benefits: ["Reduces crows feet", "Firms eyelids", "Brightens", "Smooths lines"],
    how_to_use: "Dot a small amount around the eye area. Gently tap with ring finger until absorbed. Use AM and PM.",
    price: 44, original_price: 58, discount: 24,
    rating: 4.5, review_count: 1678,
    images: [img(133), img2(133)],
    videos: [],
    skin_type: ["All", "Normal", "Mature", "Dry"],
    product_type: "Serum", stock: 35, is_new: true, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["eye serum", "peptide", "anti-aging", "firming"]
  },
  {
    id: "p34", name: "Deep Condition Hair Mask", brand: "BloomEssentials",
    category: "Hair Care", sub_category: "Treatments",
    description: "Intensive deep conditioning hair mask with shea butter and argan oil that restores moisture.",
    ingredients: "Shea Butter, Argan Oil, Coconut Oil, Keratin, Vitamin B5",
    benefits: ["Deep conditioning", "Restores moisture", "Reduces frizz", "Adds shine"],
    how_to_use: "Apply to clean damp hair. Leave for 15-20 minutes. Rinse thoroughly. Use weekly.",
    price: 22, original_price: 28, discount: 21,
    rating: 4.5, review_count: 1456,
    images: [img(134), img2(134)],
    videos: [],
    skin_type: ["All"],
    product_type: "Mask", stock: 50, is_new: false, is_best_seller: false, is_trending: false, is_flash_sale: false,
    tags: ["hair mask", "deep conditioning", "shea butter", "damaged hair"]
  },
  {
    id: "p35", name: "Loose Setting Powder - Translucent", brand: "VelvetTouch",
    category: "Makeup", sub_category: "Face",
    description: "Ultra-fine translucent setting powder that blurs pores, controls shine, and sets makeup for a flawless finish.",
    ingredients: "Silica, Mica, Zinc Stearate, Vitamin E, Jojoba Oil",
    benefits: ["Blurs pores", "Controls shine", "Airbrushed finish", "Invisible on skin"],
    how_to_use: "Dip brush into powder, tap off excess, and dust over face focusing on T-zone.",
    price: 30, original_price: 38, discount: 21,
    rating: 4.5, review_count: 2890,
    images: [img(135), img2(135)],
    videos: [],
    skin_type: ["All", "Oily", "Combination"],
    product_type: "Powder", stock: 70, is_new: false, is_best_seller: true, is_trending: false, is_flash_sale: false,
    tags: ["setting powder", "translucent", "matte", "blur"]
  },
]

const reviews = [
  { product_id: "p1", user_name: "Sophia Chen", rating: 5, title: "Holy grail serum!", comment: "I've been using this serum for 3 weeks and the difference in my skin is incredible. My dark spots are fading and my skin looks so radiant!", date: "2026-06-15", likes: 234 },
  { product_id: "p2", user_name: "Maya Patel", rating: 5, title: "Worth every penny", comment: "This moisturizer is amazing. I have dry skin and this is the only cream that keeps my skin hydrated all day without feeling greasy.", date: "2026-06-12", likes: 189 },
  { product_id: "p5", user_name: "Emma Wilson", rating: 4, title: "Great lipstick, long lasting", comment: "The color is gorgeous and it really does last all day. It can be a bit drying after 8+ hours but overall fantastic.", date: "2026-06-10", likes: 145 },
  { product_id: "p9", user_name: "Olivia Johnson", rating: 5, title: "Game changer for my skin", comment: "The rice toner is amazing! My skin has never looked this bright and even. I can see results after just one week of use.", date: "2026-06-08", likes: 312 },
  { product_id: "p10", user_name: "Isabella Kim", rating: 5, title: "Best sunscreen ever", comment: "No white cast, lightweight, and works beautifully under my makeup. I've finally found my forever sunscreen!", date: "2026-06-05", likes: 267 },
  { product_id: "p12", user_name: "Aria Thompson", rating: 4, title: "Lovely body butter", comment: "The shea and vanilla scent is divine without being overpowering. My skin feels so soft and nourished after using it.", date: "2026-06-03", likes: 98 },
  { product_id: "p15", user_name: "Zara Ali", rating: 5, title: "Lashes look amazing", comment: "After 6 weeks of using this serum, my lashes are noticeably longer and thicker. So glad I tried this!", date: "2026-05-28", likes: 201 },
  { product_id: "p6", user_name: "Lily Martinez", rating: 5, title: "Perfect skin tint", comment: "Finally found a skin tint that matches my skin perfectly. The dewy finish gives me that glass skin look I've been wanting.", date: "2026-05-25", likes: 176 },
]

const blogPosts = [
  { id: "b1", title: "10-Step Korean Skincare Routine for Beginners", excerpt: "Discover the legendary Korean skincare routine that transformed skin worldwide. We break down each step for glass skin.", image: "/images/blog1.jpg", author: "Sarah Beauty", date: "2026-06-20", category: "Skincare Tips" },
  { id: "b2", title: "Vitamin C vs. Retinol: Which Should You Use?", excerpt: "Can't decide between Vitamin C and Retinol? Learn what each ingredient does and how to incorporate them into your routine.", image: "/images/blog2.jpg", author: "Dr. Mia Chen", date: "2026-06-18", category: "Ingredients" },
  { id: "b3", title: "Summer Skincare: How to Protect Your Skin in Heat", excerpt: "Your ultimate guide to summer skincare — lightweight hydration, SPF tips, and post-sun recovery routines.", image: "/images/blog3.jpg", author: "Emma Radiance", date: "2026-06-15", category: "Seasonal" },
  { id: "b4", title: "The Ultimate Guide to Hyaluronic Acid", excerpt: "Everything you need to know about the hydration powerhouse ingredient, including how to layer it for maximum benefits.", image: "/images/blog4.jpg", author: "Lisa Glow", date: "2026-06-12", category: "Ingredients" },
]

async function seedProducts() {
  console.log("Seeding 35 products...")
  let inserted = 0
  for (const p of products) {
    const { slug, ...productData } = p
    const { error } = await supabase.from("products").upsert(
      productData,
      { onConflict: "id" }
    )
    if (error) {
      console.log(`  Error seeding ${p.name}: ${error.message}`)
    } else {
      inserted++
    }
  }
  console.log(`  ${inserted}/35 products seeded`)
}

async function seedReviews() {
  console.log("Seeding 8 reviews...")
  const { data: existing } = await supabase.from("reviews").select("id").limit(1)
  if (existing?.length > 0) {
    console.log("  Reviews already exist, skipping")
    return
  }
  let inserted = 0
  for (const r of reviews) {
    const { error } = await supabase.from("reviews").insert({
      product_id: r.product_id,
      user_id: null,
      user_name: r.user_name,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      likes: r.likes,
      created_at: r.date,
    })
    if (error) {
      console.log(`  Error seeding review by ${r.user_name}: ${error.message}`)
    } else {
      inserted++
    }
  }
  console.log(`  ${inserted}/8 reviews seeded`)
}

async function main() {
  await seedProducts()
  await seedReviews()
  console.log("Done!")
}

main().catch(console.error)
