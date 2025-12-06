# General PF Global Resources - Comprehensive SEO Strategy
**Targeting:** Lagos, Nigeria (Primary) & Global (Secondary)

## 1. Implemented SEO Foundation
We have successfully implemented a robust technical SEO foundation for General PF Global Resources.

### ✅ Metadata & Tags
- **Title Tags:** Optimized, high-CTR titles for all core pages (Home, HR, Logistics, Real Estate, Advertise, About, Contact).
- **Meta Descriptions:** Compelling 150-160 char descriptions targeting key services and local keywords.
- **Open Graph (OG):** Facebook/WhatsApp sharing cards with images and descriptions.
- **Twitter Cards:** Optimized summary cards for Twitter sharing.
- **Keywords:** 10+ high-value keywords injected into metadata for every page.
- **Canonical URLs:** Self-referencing canonicals to prevent duplicate content issues.
- **Robots Meta:** 
  - `index, follow` for all public pages.
  - `noindex, nofollow` for Admin and Login pages (Security).

### ✅ Structured Data (JSON-LD)
- **Organization Schema:** Establishes the brand identity, logo, and social profiles.
- **LocalBusiness Schema:** Critical for "near me" searches in Lagos. Includes coordinates (Fadeyi, Lagos), opening hours, and phone number.
- **Service Schema:** Explicitly defines HR and Logistics services for better understanding by Google.
- **RealEstateAgent Schema:** Specifically for the Real Estate section to rank for property queries.
- **ContactPage Schema:** Helps search engines identify contact information.
- **Sitelinks Searchbox:** Enabled via WebSite schema.

### ✅ Technical Files
- **sitemap.xml:** Generated with proper `lastmod`, `priority`, and `changefreq`. Excludes private admin routes.
- **robots.txt:** configured to maximize crawling of useful content while blocking sensitive admin areas and API routes.

## 2. Keyword Strategy (Implemented)
We have targeted the following high-value keyword clusters in the metadata:

**HR & Recruitment:**
- "Lagos HR services", "Recruitment agency Lagos", "Staffing Nigeria", "Workforce management"

**Logistics:**
- "Logistics company Lagos", "Nationwide delivery Nigeria", "Dispatch riders Lagos", "Waybill services"

**Real Estate:**
- "Real estate company Lagos", "Houses for sale Lekki", "Apartments for rent Ikeja", "Property management Lagos"

**General Business:**
- "Digital marketing Lagos", "Skill acquisition Nigeria", "Business solutions Lagos"

## 3. 90-Day Ranking Strategy for Lagos
To achieve first-page rankings in Lagos within 90 days, follow this execution plan:

### Month 1: Technical & Local Authority
1. **Google My Business (GMB):** 
   - Claim and verify your GMB profile immediately.
   - Use the description provided in `lib/seo-config.ts`.
   - Add high-quality photos of your office, staff, and successful deliveries/projects.
   - Get 5-10 generic but positive reviews from existing network.
2. **Social Signals:**
   - Share every page of the website on your Facebook, Instagram, and LinkedIn.
   - Ensure the OG images look good when shared.
3. **Directory Listings:**
   - Register on Nigerian business directories (VConnect, BusinessList, Finelib).
   - Ensure "NAP" (Name, Address, Phone) consistency matches exactly what is on the website.

### Month 2: Content Depth & Link Building
1. **Service Page Expansion:**
   - Add 300-500 words of unique content to each service page describing *how* you solve problems in Lagos specifically.
   - Mention specific landmarks/areas (e.g., "Fast delivery from Ikeja to Victoria Island").
2. **Backlinks:**
   - Partner with a few local blogs or news sites for a press release about "Modern HR Solutions in Lagos".
   - Exchange links with non-competing Lagos businesses.

### Month 3: User Experience & Reviews
1. **Review Generation:** Implement an automated system to ask satisfied clients for Google Reviews. This is the #1 ranking factor for Local SEO.
2. **Page Speed:** Monitor Core Web Vitals. The current build is optimized (Next.js), but ensure images remain compressed.

## 4. Technical Checklist (Maintenance)
- [ ] **Google Search Console:** Submit the `sitemap.xml` immediately.
- [ ] **Bing Webmaster Tools:** Submit the site there as well.
- [ ] **Analytics:** Ensure Google Analytics 4 is tracking conversions (form fills, WhatsApp clicks).
- [ ] **Broken Links:** Check monthly for any 404 errors.
- [ ] **Security:** Keep SSL certificates active (handled by Vercel automatically).

## 5. Security Note
- The Admin Portal (`/admin`) and Login (`/login`) are successfully hidden from Google. 
- `robots.txt` disallows them.
- `noindex` meta tags act as a second layer of defense.

**Next Immediate Step:** 
Log in to **Google Search Console** and submit your sitemap: `https://www.generalpf.com/sitemap.xml`
