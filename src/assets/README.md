# Assets Organization

This directory contains all organized assets for the Material Bank Component Library.

## Folder Structure

```
src/assets/
├── images/          # Static images (PNG, JPG, JPEG, WebP)
├── icons/           # Icon files (ICO, small SVGs)
├── svgs/            # SVG graphics and illustrations  
├── logos/           # Brand logos and marks
└── index.js         # Asset exports and constants
```

## Usage

### Local Assets
Import local assets using the @assets alias:

```javascript
import { PlaceholderSvg, FaviconIcon } from '@assets';
// or
import PlaceholderSvg from '@assets/svgs/placeholder-content.svg';
```

### External Assets
Use the organized constants for external CDN assets:

```javascript
import { EXTERNAL_ASSETS } from '@assets';

// Use in components
<img src={EXTERNAL_ASSETS.BOXES.BLUE} alt="Material box" />
<img src={EXTERNAL_ASSETS.TESTIMONIALS.JESSICA_HAVARD} alt="Jessica Havard" />
```

## Asset Categories

### EXTERNAL_ASSETS.BOXES
Material Bank packaging boxes in different colors:
- `BLUE` - Blue material box
- `RED` - Red material box  
- `GREEN` - Green material box
- `MOSS` - Moss colored box
- `EMERALD` - Emerald colored box

### EXTERNAL_ASSETS.WORKFLOW
Workflow demonstration images:
- `COMMUNICATE` - Brand communication interface
- `SAVE_MATERIALS` - Material saving interface

### EXTERNAL_ASSETS.TARGET_AUDIENCE
Target audience imagery:
- `ARCHITECTS` - For architects and interior designers
- `MANUFACTURERS` - For manufacturers

### EXTERNAL_ASSETS.TESTIMONIALS
Customer testimonial photos:
- `JESSICA_HAVARD` - Jessica Havard portrait
- `STEPHANIE_WEXLER` - Stephanie Wexler portrait
- `KATI_KIRBY` - Kati Kirby portrait

### EXTERNAL_ASSETS.AUTH
Authentication page assets:
- `REGISTER_BACKGROUND` - Registration background image

### EXTERNAL_ASSETS.SUSTAINABILITY  
Sustainability related imagery:
- `PACKAGES` - Sustainable packaging image

## Naming Conventions

- Use kebab-case for all file names: `material-box-blue.webp`
- Use descriptive names instead of generic ones
- Group related assets in appropriate folders
- Maintain consistent naming patterns within categories

## Adding New Assets

1. Place files in the appropriate subfolder
2. Use descriptive kebab-case names
3. Update `index.js` with exports/constants
4. Update this README if adding new categories
