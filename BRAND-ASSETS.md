# Brand Assets & Implementation

## Color Codes

### Primary Colors
| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| Primary Blue | #0099cc | 0, 153, 204 | Headers, CTAs, primary UI |
| Dark Gray | #1a1a1a | 26, 26, 26 | Text, strong contrast |
| White | #ffffff | 255, 255, 255 | Backgrounds, text |

### Secondary Colors
| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| Gold | #ffdb58 | 255, 219, 88 | Highlights, premium accents |
| Light Gray | #f8f9fa | 248, 249, 250 | Section backgrounds |
| Medium Gray | #e8eef5 | 232, 238, 245 | Borders, dividers |
| Text Gray | #666666 | 102, 102, 102 | Secondary text |

## Typography

### Headline Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
font-weight: 900;
letter-spacing: -1px;
```

### Body Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
font-weight: 400;
line-height: 1.6;
```

## Component Specifications

### Primary Button
```css
Background: #0099cc
Color: #ffffff
Padding: 12px 28px
Font-size: 0.95rem
Font-weight: 600
Border-radius: 4px
Hover: background #0077aa + transform translateY(-2px)
```

### Secondary Button
```css
Background: transparent
Border: 2px solid #0099cc
Color: #0099cc
Padding: 10px 26px
Font-size: 0.95rem
Font-weight: 600
Border-radius: 4px
Hover: background #e6f5ff
```

### Card Component
```css
Background: #ffffff or #f8f9fa
Border: 1px solid #ddd
Padding: 30px
Border-radius: 8px
Hover: transform translateY(-8px) + box-shadow
```

## Logo Specifications

### Logo Format
- **Type**: SVG (scalable, preferred)
- **Icon**: Warehouse/building outline
- **Color**: #0099cc (primary blue)
- **Clear Space**: 20px minimum around logo
- **Minimum Size**: 120px width

### Logo Usage
- Primary brand mark on website header
- Footer branding
- Email templates
- Future: Social media, business cards

## Imagery Guidelines

### Hero Image Specs
- **Dimensions**: Minimum 2000px wide, 1200px tall
- **Format**: JPG or PNG
- **Subject**: Clean warehouse interior, professional facility
- **Lighting**: Bright, well-lit (no dark corners)
- **Equipment**: Visible but not cluttered (forklifts, storage racks, organized)
- **People**: Minimal (focus on space)

### Color Tone
- Industrial grays and blues
- Natural lighting (bright)
- Professional, organized appearance
- Clean floors and clear pathways

## Typography Hierarchy

### Page Title (H1)
- Size: 3.5rem (desktop), 2rem (mobile)
- Weight: 900
- Color: #1a1a1a or #ffffff (on hero)
- Highlight: #ffdb58 (gold) for key words

### Section Header (H2)
- Size: 2.5rem (desktop), 1.8rem (mobile)
- Weight: 900
- Color: #1a1a1a
- Spacing: 60px margin-bottom

### Card Header (H3)
- Size: 1.15rem
- Weight: 700
- Color: #1a1a1a
- Spacing: 15px margin-bottom

### Body Text
- Size: 0.95rem - 1rem
- Weight: 400
- Color: #666666
- Line-height: 1.6

### Label/Caption
- Size: 0.85rem - 0.9rem
- Weight: 600
- Color: #666666
- Text-transform: uppercase (optional)
- Letter-spacing: 0.5px

## Spacing System

### Vertical Spacing
- Section padding: 100px (desktop), 60px (mobile)
- Component gap: 30-40px
- Element margin: 15-25px

### Horizontal Spacing
- Container max-width: 1200px
- Container padding: 20px (mobile), 60px (desktop)
- Component padding: 25-40px
- Gap between cards: 25-40px

## Breakpoints

### Desktop
- Width: 1025px and above
- Full layout with all elements visible
- Multi-column grids

### Tablet
- Width: 769px - 1024px
- 2-column grids reduced to 1-2 columns
- Slightly reduced font sizes

### Mobile
- Width: Below 768px
- Single-column layout
- Stacked cards and sections
- Increased padding for touch targets

## Brand Voice Examples

### Headlines
- "Professional Warehouse Space. Built for Growth."
- "Secure. Flexible. Transparent Pricing."
- "Enterprise-Grade Security for Serious Operations."

### Body Copy
- "We provide secure, professional warehouse space designed for businesses that demand quality."
- "Month-to-month flexibility with no long-term contracts required."
- "24/7 security, controlled access, and professional monitoring."

### CTAs
- "Schedule a Tour"
- "Request Information"
- "Learn More"
- "Get Your Space"

## Implementation Status

✅ Hero section with background image
✅ Blue primary color scheme
✅ Gold accent highlights
✅ Professional typography hierarchy
✅ Card-based component layout
✅ Mobile responsive design
✅ Professional footer with branding
✅ Contact form integration
✅ Section spacing and alignment

## Future Assets

⏳ Detailed logo file (SVG)
⏳ Brand book (PDF)
⏳ Email templates
⏳ Social media graphics
⏳ Business card designs
⏳ Presentation templates
