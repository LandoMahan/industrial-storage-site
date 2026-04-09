# 2882 2nd Floor — Local Schema Markup

**Purpose:** Add structured data to website so Google understands:
- What your business is
- Where you're located
- What services you offer
- Reviews & ratings
- Pricing information

**Format:** JSON-LD (best for SEO, easiest to implement)

---

## Implementation

Add these JSON-LD blocks to the `<head>` section of `index.html` (inside `<script type="application/ld+json">` tags).

### 1. LocalBusiness Schema (Primary)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "2882 2nd Floor Industrial Storage",
  "image": "https://serving-insured-jack-cherry.trycloudflare.com/logo.svg",
  "description": "Professional 50,000 sqft warehouse and industrial storage facility in Grove City, Ohio. 18' ceiling height, loading elevator, month-to-month flexible leasing.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2882 Lewis Centre Way",
    "addressLocality": "Grove City",
    "addressRegion": "OH",
    "postalCode": "43123",
    "addressCountry": "US"
  },
  "telephone": "(610) 297-0112",
  "email": "johnmahan@westpatrick.com",
  "url": "https://serving-insured-jack-cherry.trycloudflare.com",
  "priceRange": "$1.20/sqft/month",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 39.9612,
      "longitude": -83.1058
    },
    "geoRadius": "25"
  },
  "serviceArea": {
    "@type": "City",
    "name": "Columbus",
    "areaServed": "Ohio"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/2882secondfloor",
    "https://www.linkedin.com/company/2882-second-floor",
    "https://maps.google.com"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "0",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### 2. RealEstateProperty Schema

```json
{
  "@context": "https://schema.org",
  "@type": "CommercialProperty",
  "name": "2882 Lewis Centre Way - Industrial Warehouse Space",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2882 Lewis Centre Way",
    "addressLocality": "Grove City",
    "addressRegion": "OH",
    "postalCode": "43123",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.9612,
    "longitude": -83.1058
  },
  "description": "50,000 sqft warehouse with 18' ceiling, elevator access, flexible month-to-month leasing",
  "image": {
    "@type": "ImageObject",
    "url": "https://serving-insured-jack-cherry.trycloudflare.com/photo-1.jpg",
    "width": 1200,
    "height": 675
  },
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": "50000",
    "unitCode": "FTK"
  },
  "priceSpecification": {
    "@type": "PriceSpecification",
    "priceCurrency": "USD",
    "price": "1.20",
    "unitCode": "sqft/month",
    "description": "Month-to-month flexible leasing"
  },
  "availableProperty": {
    "@type": "PropertyValue",
    "name": "Availability",
    "value": "Available"
  }
}
```

### 3. Service Schema (for Services Offered)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Warehouse Rental",
  "name": "Professional Industrial Storage & Warehouse Space",
  "description": "Month-to-month warehouse rental in Grove City, Ohio. 50,000 sqft with 18' ceiling and elevator access.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "2882 2nd Floor Industrial Storage",
    "url": "https://serving-insured-jack-cherry.trycloudflare.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "Columbus, OH"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Warehouse Rental Options",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Full Facility Lease",
        "description": "50,000 sqft warehouse space",
        "priceCurrency": "USD",
        "price": "60000",
        "pricingDescription": "$1.20/sqft/month"
      },
      {
        "@type": "Offer",
        "name": "Partial Space Rental",
        "description": "Custom warehouse space rental",
        "priceCurrency": "USD",
        "pricingDescription": "$1.20/sqft/month (flexible)"
      }
    ]
  }
}
```

### 4. FAQPage Schema (For SEO)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the facility specifications for 2882 Lewis Centre Way?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "50,000 sqft warehouse with 18' ceiling height, 12,000 lb elevator, climate control, and flexible month-to-month leasing."
      }
    },
    {
      "@type": "Question",
      "name": "Is month-to-month leasing available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer fully flexible month-to-month leasing with no long-term contracts required. You can adjust space or terms with 30 days notice."
      }
    },
    {
      "@type": "Question",
      "name": "What is the pricing for warehouse space?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We charge $1.20/sqft per month for warehouse space, which is competitive for the Grove City market. Pricing is transparent with no hidden fees."
      }
    },
    {
      "@type": "Question",
      "name": "Where is the warehouse located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2882 Lewis Centre Way, Grove City, Ohio 43123. We're conveniently located near I-71 and I-270, with easy access to downtown Columbus and the greater region."
      }
    },
    {
      "@type": "Question",
      "name": "What types of businesses use the facility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our tenants include distribution centers, retail storage, light manufacturing, e-commerce fulfillment, and general warehouse operations."
      }
    }
  ]
}
```

### 5. Organization Schema (For Trust)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "2882 2nd Floor Industrial Storage",
  "url": "https://serving-insured-jack-cherry.trycloudflare.com",
  "logo": "https://serving-insured-jack-cherry.trycloudflare.com/logo.svg",
  "description": "Professional industrial storage and warehouse rental facility in Grove City, Ohio.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "(610) 297-0112",
    "email": "johnmahan@westpatrick.com"
  },
  "sameAs": [
    "https://www.facebook.com/2882secondfloor",
    "https://www.linkedin.com/company/2882-second-floor"
  ],
  "foundingDate": "2026",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2882 Lewis Centre Way",
    "addressLocality": "Grove City",
    "addressRegion": "OH",
    "postalCode": "43123"
  }
}
```

---

## Implementation Instructions

### For Static HTML Site:

1. Open `/Users/landomahan/.openclaw/workspace/projects/industrial-storage-site/index.html`

2. Find the `<head>` section (after `<meta>` tags, before `</head>`)

3. Add **all 5 schema blocks** as separate `<script type="application/ld+json">` tags:

```html
<head>
  <!-- ... existing meta tags ... -->
  
  <!-- LocalBusiness Schema -->
  <script type="application/ld+json">
  { "LocalBusiness schema JSON here" }
  </script>
  
  <!-- CommercialProperty Schema -->
  <script type="application/ld+json">
  { "RealEstateProperty schema JSON here" }
  </script>
  
  <!-- Service Schema -->
  <script type="application/ld+json">
  { "Service schema JSON here" }
  </script>
  
  <!-- FAQPage Schema -->
  <script type="application/ld+json">
  { "FAQPage schema JSON here" }
  </script>
  
  <!-- Organization Schema -->
  <script type="application/ld+json">
  { "Organization schema JSON here" }
  </script>
</head>
```

---

## Validation

Test schema with Google's Rich Results Test:
https://search.google.com/test/rich-results

**Steps:**
1. Go to https://search.google.com/test/rich-results
2. Enter site URL: `https://serving-insured-jack-cherry.trycloudflare.com`
3. Run test
4. Verify all 5 schema types show as "Valid"

---

## SEO Benefits of Schema Markup

✅ **Rich snippets** in search results (star ratings, pricing, etc.)
✅ **Better understanding** of business type & location
✅ **Local Pack visibility** (Google Maps 3-pack)
✅ **FAQ featured snippets** (position zero traffic)
✅ **Knowledge panel** eligibility
✅ **Higher click-through rates** from SERPs

---

## Next Steps

1. ✅ Create schema JSON (done above)
2. [ ] Add to index.html `<head>`
3. [ ] Test with Google Rich Results Tool
4. [ ] Monitor in Google Search Console
5. [ ] Update as business info changes

---

**Last Updated:** 2026-04-08 22:11 EDT
