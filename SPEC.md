# Coffee Shop Website Specification

## 1. Project Overview
- **Project Name:** Brew & Bean Co.
- **Type:** Single-page e-commerce website
- **Core Functionality:** Coffee product catalog with shopping cart and checkout
- **Target Users:** Coffee enthusiasts looking to purchase premium coffee beans

## 2. UI/UX Specification

### Layout Structure
- **Header:** Fixed navigation with logo, nav links, cart icon with item count
- **Hero Section:** Full-width banner with tagline and CTA button
- **Products Section:** Grid of coffee product cards
- **Cart Modal:** Slide-in cart panel from right side
- **Checkout Modal:** Simple checkout form overlay
- **Footer:** Simple footer with copyright

### Responsive Breakpoints
- Mobile: < 768px (single column products)
- Tablet: 768px - 1024px (2 column products)
- Desktop: > 1024px (3-4 column products)

### Visual Design

#### Color Palette
- **Background:** `#FAF9F6` (off-white)
- **Primary Text:** `#1A1A1A` (near black)
- **Accent:** `#C4A77D` (warm gold/coffee brown)
- **Secondary:** `#2D2D2D` (dark gray)
- **Card Background:** `#FFFFFF`
- **Success:** `#4A7C59` (forest green)

#### Typography
- **Headings:** "Playfair Display", serif (elegant, premium feel)
- **Body:** "DM Sans", sans-serif (clean, readable)
- **Logo:** 28px bold Playfair Display
- **H1:** 48px / 56px mobile
- **H2:** 32px
- **Body:** 16px
- **Small:** 14px

#### Spacing System
- Section padding: 80px vertical, 5% horizontal
- Card padding: 24px
- Grid gap: 24px
- Component spacing: 16px

#### Visual Effects
- Card shadow: `0 4px 20px rgba(0,0,0,0.08)`
- Card hover: translateY(-8px) with shadow increase
- Button hover: darken 10%, scale(1.02)
- Smooth transitions: 0.3s ease
- Cart slide-in: transform translateX animation

### Components

#### Header
- Logo (left aligned)
- Navigation links: Home, Products, About (center)
- Cart icon with badge showing item count (right)
- Sticky on scroll with subtle shadow

#### Hero Section
- Large headline: "Exceptional Coffee, Delivered"
- Subheadline: "Premium single-origin beans roasted to perfection"
- CTA Button: "Shop Now" (scrolls to products)

#### Product Card
- Product image (coffee bag placeholder with gradient)
- Product name
- Roast level (Light/Medium/Dark)
- Price ($)
- "Add to Cart" button

#### Products (6 items)
1. **Ethiopian Yirgacheffe** - Light Roast - $18.99
2. **Colombian Supremo** - Medium Roast - $16.99
3. **Sumatra Mandheling** - Dark Roast - $17.99
4. **Guatemala Antigua** - Medium Roast - $19.99
5. **Kenya AA** - Light Roast - $21.99
6. **Brazilian Santos** - Medium Roast - $15.99

#### Cart Modal
- Slide-in from right
- Header with title and close button
- Cart items list with:
  - Product name
  - Quantity selector (+/-)
  - Item total price
  - Remove button
- Subtotal display
- "Checkout" button
- Empty cart state message

#### Checkout Modal
- Overlay with centered form
- Form fields:
  - Name (required)
  - Email (required)
  - Address (required)
  - Card Number (required, simple validation)
- "Place Order" button
- Close button
- Success message on submission

#### Footer
- Copyright text
- Simple centered layout

## 3. Functionality Specification

### Core Features
1. **Product Display:** Show 6 coffee products in responsive grid
2. **Add to Cart:** Add products with quantity increment
3. **Cart Management:**
   - View cart items
   - Update quantities
   - Remove items
   - Calculate subtotal
4. **Checkout Flow:**
   - Form validation
   - Success confirmation
   - Cart clear on success

### User Interactions
- Click "Add to Cart" → Add item, update cart badge, show brief toast
- Click cart icon → Open cart modal
- Click +/- in cart → Adjust quantity
- Click remove → Remove item from cart
- Click "Checkout" → Open checkout form
- Submit checkout → Show success, clear cart
- Click outside modal → Close modal
- Press ESC → Close modal

### Data Handling
- Cart stored in localStorage for persistence
- Products defined in JavaScript array

### Edge Cases
- Empty cart: Show "Your cart is empty" message
- Quantity reaches 0: Remove item
- Form validation: Highlight invalid fields
- Prevent duplicate product entries (merge quantities)

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Header is sticky with logo, nav, and cart icon
- [ ] Hero section displays with headline and CTA
- [ ] Product grid shows 6 products in responsive layout
- [ ] Product cards have hover animation
- [ ] Cart modal slides in from right
- [ ] Checkout form is centered with validation
- [ ] All colors match specified hex values
- [ ] Typography uses Playfair Display and DM Sans

### Functional Checkpoints
- [ ] Can add products to cart
- [ ] Cart badge updates correctly
- [ ] Can modify quantities in cart
- [ ] Can remove items from cart
- [ ] Subtotal calculates correctly
- [ ] Checkout form validates required fields
- [ ] Success message shows on order completion
- [ ] Cart persists on page reload
- [ ] Modals close on outside click and ESC
