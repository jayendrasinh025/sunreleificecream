# Sun Relief Ice Cream — Official Website

A production-ready, responsive, multi-page website for **Sun Relief Ice Cream**, an authentic ice cream manufacturer and brand based in Sayan, Olpad, Surat (Gujarat), India.

Featuring an exact recreation of the signature **Reelmark-style curved, continuously moving interactive carousel hero**, real product photography, full 5-category catalogue, verified Gujarat manufacturing details, and direct WhatsApp customer/distributor/franchise inquiry flows.

---

## 🍦 Features

1. **Reelmark-Style Animated Curved Carousel Hero**:
   - Built to the exact 1440 × 1080 reference geometry and scaling math.
   - Continuous automatic movement (right to left, ~50 frame units/sec) with delta-time animation loop.
   - Pointer & touch drag physics with velocity momentum decay (~95%/sec) and seamless looping.
   - Custom calculated inside-of-a-cylinder curved cards with rounded quadrilateral geometry.
   - High-resolution real Sun Relief packaging tiles.
   - Hand-drawn SVG doodle strokes with animated drawing.
2. **Complete 6-Page Multi-Page Application**:
   - **Home**: Hero carousel, category cards, Gujarat brand heritage, trust pillars, bestselling highlights, dual commercial opportunities, and customer quick WhatsApp form.
   - **About Us**: Story of Maruti Marketing in Surat district, pure milk quality commitments, automated hygiene standards, product range spectrum, and commercial partnership roadmap.
   - **Products**: Searchable & filterable catalogue across all 5 initial categories (Cones, Candy & Sticks, Family Party Packs, Premium Sundaes/Tubs, and Traditional Shrikhand).
   - **Distribution**: Wholesale model, cold-chain refrigeration guidelines (-18°C), coverage area, and direct WhatsApp distributor application.
   - **Franchise**: Parlour & kiosk format tiers (Express Kiosk, Brand Parlour, Retail Deep-Freezer Corner), space requirements, and direct WhatsApp franchise inquiry form.
   - **Contact**: Verified factory address, operating hours, direct WhatsApp button, and directions link.
   - **Policy Pages**: Privacy Policy, Terms & Conditions, and Distributor & Franchise Inquiry Terms.
3. **Verified WhatsApp Enquiry Flows**:
   - Direct target business line: `+91 95588 83147`.
   - Separate formatted prefilled messages for customer queries, distributor partner applications, franchise inquiries, and individual product questions.
   - Privacy-focused: no database storage; users review and click send manually in their own WhatsApp client.

---

## 🛠️ Project Structure

```
├── public/
│   ├── _headers             # Cloudflare Pages security & caching headers
│   ├── _redirects           # Cloudflare Pages SPA rewrite rule
│   └── images/
│       └── products/        # High-res authentic Sun Relief packaging photos
│           ├── candy/       # Frostick, Mawa Kulfi, Mango Dolly, Chocobars
│           ├── cone/        # Butterscotch, Pista, Chocolate, Berry cones
│           ├── family-pack/ # 750ml celebration bricks
│           ├── premium/     # Rajbhog, Almond Sundaes, Gourmet tubs
│           └── shrikhand/   # Authentic Mango & Elaichi Shrikhand tubs
├── src/
│   ├── components/
│   │   ├── BrandLogo.tsx    # SVG brand mark & typography
│   │   ├── Header.tsx       # Top navigation bar & mobile drawer
│   │   ├── Footer.tsx       # Full brand footer & policy links
│   │   ├── HeroCarousel.tsx # Exact Reelmark curved carousel hero
│   │   └── ProductModal.tsx # Interactive product detail & WhatsApp popup
│   ├── data/
│   │   └── products.ts      # Centralized product catalogue data & hero items
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── DistributionPage.tsx
│   │   ├── FranchisePage.tsx
│   │   ├── ContactPage.tsx
│   │   └── PolicyPage.tsx
│   ├── utils/
│   │   └── whatsapp.ts      # WhatsApp message formatters and verified details
│   ├── App.tsx              # Main application router and state
│   ├── main.tsx
│   └── index.css            # Tailwind CSS theme & brand palette
└── package.json
```

---

## 🚀 How to Run the Project Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📦 How to Build and Deploy on Cloudflare Pages

This site is a static React single-page application and runs without any server or database.

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
   The production-ready static assets will be output to the `dist/` folder.

2. **Deploy to Cloudflare Pages**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - The included `public/_headers` and `public/_redirects` files are automatically copied to `dist/` during build to ensure proper routing and HTTP security headers.

---

## 🖼️ How to Edit Products and Replace Images

- **Edit Product Details**: Open `src/data/products.ts`. You can add, edit, or remove flavours, descriptions, badges, and pack sizes in the `PRODUCTS` array.
- **Hero Carousel Items**: Open `src/data/products.ts` and update `HERO_CAROUSEL_ITEMS` to change the 10 featured items in the signature hero carousel.
- **Add Product Photos**: Place new images into `public/images/products/<category>/` and update the `image` path in `src/data/products.ts`.
- **Contact Details**: Open `src/utils/whatsapp.ts` to adjust phone numbers, factory addresses, or email addresses across all forms and footer references.

---

## 🎨 Brand Design System

- **Royal Blue**: `#123B75` (Primary brand recognition, headers, CTAs)
- **Sunshine Yellow**: `#F5C542` (Playful accents, dashed button rings, badges)
- **Mango Red**: `#E94B35` (Flavour highlights, secondary accents)
- **Soft Pink**: `#F8DCE8` (Soft background accents, badge chips)
- **White**: `#FFFFFF` (Clean contrast, breathing room)
- **Headings Font**: `Arvo` (Bold serif)
- **Body & Interface Font**: `Inter`
