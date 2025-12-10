# Design System - Bx Cakes

## Color Palette

### Primary Colors

- **Pink 50**: `#FDF2F8` - Very light pink backgrounds
- **Pink 100**: `#FCE7F3` - Light pink backgrounds, badges
- **Pink 500**: `#EC4899` - Medium pink accents
- **Pink 600**: `#DB2777` - Main brand color, buttons, links
- **Pink 700**: `#BE185D` - Hover states, darker accents

### Neutral Colors

- **White**: `#FFFFFF` - Cards, backgrounds
- **Gray 50**: `#F9FAFB` - Page backgrounds
- **Gray 100**: `#F3F4F6` - Light borders, disabled states
- **Gray 200**: `#E5E7EB` - Borders, dividers
- **Gray 300**: `#D1D5DB` - Input borders
- **Gray 400**: `#9CA3AF` - Placeholder text, icons
- **Gray 500**: `#6B7280` - Secondary text
- **Gray 600**: `#4B5563` - Body text
- **Gray 700**: `#374151` - Headings, important text
- **Gray 800**: `#1F2937` - Dark headings
- **Gray 900**: `#111827` - Footer, dark sections

### Accent Colors

- **Yellow 400**: `#FBBF24` - Star ratings
- **Red 600**: `#DC2626` - Error messages, delete actions
- **Red 100**: `#FEE2E2` - Error backgrounds

## Typography

### Font Families

```css
--font-main: "Open Sans", sans-serif;
--font-secondary: "Merriweather Sans", sans-serif;
--font-tertiary: "Josefin Sans", sans-serif;
--font-quaternary: "League Spartan", sans-serif;
```

### Font Sizes

- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Font Weights

- **normal**: 400
- **medium**: 500
- **semibold**: 600
- **bold**: 700

## Spacing

### Common Spacing Values

- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)

## Border Radius

- **rounded**: 0.25rem (4px)
- **rounded-md**: 0.375rem (6px)
- **rounded-lg**: 0.5rem (8px)
- **rounded-xl**: 0.75rem (12px)
- **rounded-2xl**: 1rem (16px)
- **rounded-full**: 9999px (fully rounded)

## Shadows

- **shadow-sm**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **shadow**: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- **shadow-md**: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- **shadow-lg**: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- **shadow-xl**: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
- **shadow-2xl**: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

## Component Patterns

### Buttons

#### Primary Button

```jsx
<button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
  Button Text
</button>
```

#### Secondary Button

```jsx
<button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
  Button Text
</button>
```

#### Icon Button

```jsx
<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
  <Icon className="w-5 h-5" />
</button>
```

### Cards

#### Product Card

```jsx
<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
  <img src="..." className="w-full h-64 object-cover" />
  <div className="p-4">{/* Content */}</div>
</div>
```

#### Info Card

```jsx
<div className="bg-white p-6 rounded-xl shadow-md">{/* Content */}</div>
```

### Forms

#### Input Field

```jsx
<input
  type="text"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
/>
```

#### Input with Icon

```jsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Icon className="h-5 w-5 text-gray-400" />
  </div>
  <input
    type="text"
    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
  />
</div>
```

### Badges

#### Price Badge

```jsx
<span className="text-2xl font-bold text-pink-600">$45.99</span>
```

#### Category Badge

```jsx
<span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
  Featured
</span>
```

#### Status Badge

```jsx
<span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
  Status
</span>
```

## Icons

Using Lucide React icons with consistent sizing:

- **Small**: `w-4 h-4` (16px)
- **Medium**: `w-5 h-5` (20px)
- **Large**: `w-6 h-6` (24px)
- **Extra Large**: `w-8 h-8` (32px)

## Animations & Transitions

### Standard Transition

```jsx
className = "transition-colors duration-200";
```

### Hover Scale

```jsx
className = "hover:scale-110 transition-transform duration-300";
```

### Fade In

```jsx
className = "opacity-0 animate-fade-in";
```

## Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Layout Patterns

### Container

```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* Content */}</div>
```

### Grid Layout

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Items */}
</div>
```

### Flex Layout

```jsx
<div className="flex items-center justify-between">{/* Items */}</div>
```

## Accessibility

- All interactive elements have focus states
- Color contrast meets WCAG AA standards
- Form inputs have associated labels
- Images have alt text
- Keyboard navigation supported
