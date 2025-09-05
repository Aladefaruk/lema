# Icons Folder

This folder is for storing your custom icon files.

## Supported Formats:
- **SVG files** (recommended)
- **PNG/JPG** for raster icons
- **React components** for SVG icons

## Usage:

### 1. SVG Files:
Put your `.svg` files here and import them:
```tsx
import TrashIcon from '../assets/icons/trash.svg';
```

### 2. React Components:
Export icon components from `index.ts`:
```tsx
import { TrashIcon, PlusIcon } from '../assets/icons';
```

### 3. Image Files:
```tsx
import iconImage from '../assets/icons/my-icon.png';
<img src={iconImage} alt="Icon" />
```

## File Structure:
```
assets/
└── icons/
    ├── index.ts          # Export all icons
    ├── trash.svg         # Your SVG files
    ├── plus.svg
    ├── arrow-left.svg
    └── README.md         # This file
```