# Animation & 3D Effects Guide

## What's Been Added

### ✅ Fixed Issues
- **Donation button disappearing**: Fixed by ensuring the donate section uses `reveal--bottom` and the observer properly handles scroll up/down (elements re-animate when scrolled back into view)

### 🎨 3D Effects Implemented

1. **Body Perspective**
   - Added `perspective: 1200px` to body for 3D depth
   - All sections use `transform-style: preserve-3d`

2. **Reveal Variants** (scroll animations):
   - **Default**: Fade + translateY + rotateX (3D tilt)
   - **reveal--left**: Slide from left + rotateY (3D rotation)
   - **reveal--right**: Slide from right + rotateY
   - **reveal--bottom**: Slide from bottom + rotateX (NEW!)
   - **reveal--scale**: Scale + translateZ + rotateX
   - **reveal--3d-flip**: Full 3D flip with rotateX + rotateY

3. **Card Hover Effects**:
   - 3D tilt: `rotateX(2deg) rotateY(-2deg)` on hover
   - Depth: `translateZ(20px)` lifts card off page
   - Enhanced shadows with depth

4. **Payment Card**:
   - Subtle floating animation (`depth-shift`)
   - 3D hover lift with rotation
   - Gradient glow border effect
   - Multi-layer shadows

5. **Buttons**:
   - 3D transform on hover (`translateZ` + `rotateX`)
   - Ripple effect (expanding circle on hover)
   - Gradient overlay for shine
   - Enhanced shadows

6. **Hero Section**:
   - Parallax background animation (`hero-parallax`)
   - Multi-layer depth with `translateZ`
   - Animated gradient overlay

7. **Counters**:
   - Floating animation (`float-slow`) with 3D depth
   - Staggered delays per counter

### 🎯 Animation Timing
- Smooth easing: `cubic-bezier(0.22, 1, 0.36, 1)` (premium feel)
- Stagger delays: 100ms between reveal-items
- Observer triggers: 80px before element enters viewport
- All animations respect `prefers-reduced-motion`

## Optional Assets You Could Add

### Images (replace placeholders)
1. **Real photos** for story cards:
   - `assets/story-1.jpg` (food relief)
   - `assets/story-2.jpg` (child nutrition)
   - `assets/story-3.jpg` (community partners)
   - Recommended: 1200x700px, optimized WebP format

2. **Logo variations**:
   - `assets/logo-dark.png` (for dark mode)
   - `assets/logo-icon.svg` (icon-only version)

3. **Background textures** (optional):
   - `assets/hero-pattern.svg` (subtle pattern overlay)
   - `assets/section-divider.svg` (decorative dividers)

### Video (optional premium touch)
- `assets/hero-video.mp4` (background video for hero section)
- `assets/impact-video.mp4` (short impact story video)

### Icons (if you want custom)
- SVG icon set for programs (food, education, water)
- Custom emoji replacements (if you don't want emoji)

## How to Add Assets

1. **Replace story images**:
   ```html
   <!-- Change from: -->
   <div class="story-placeholder story-1">...</div>
   
   <!-- To: -->
   <img src="assets/story-1.jpg" alt="Food relief" class="story-image">
   ```

2. **Add video background** (if desired):
   ```html
   <video class="hero-video" autoplay muted loop>
     <source src="assets/hero-video.mp4" type="video/mp4">
   </video>
   ```

## Performance Notes

- All 3D transforms use `will-change` for GPU acceleration
- Animations pause when elements are off-screen
- Reduced motion support disables all effects
- No external libraries needed (pure CSS + JS)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge): Full 3D support
- Older browsers: Graceful fallback (2D transforms only)
- Mobile: Optimized (reduced 3D on touch devices)
