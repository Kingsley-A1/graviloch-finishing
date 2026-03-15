# Phase 2 Implementation Plan

## Goal Description
Perform several UI upgrades to the Home, About, and Samples pages, and populate the database with dummy data for Samples and Gallery images to fully flesh out the site. 

##  Changes to perfom now

### 1. Database Seeding Tooling (`scripts/seed-data.ts` or via API)
We will create a quick internal script using `@prisma/client` to:
- Seed **10 Stucco Samples** into the [Sample](file:///c:/Users/KING%20MADU/Desktop/GRAVILOCH/graviloch-finishing/src/components/samples/SamplesGrid.tsx#23-162) table.
- Seed additional **Gallery Images** / **Products** into the database.
- We will generate stunning, highly realistic sample and gallery images using AI to fit the premium Graviloch aesthetic and save them to `public/images/samples/` and `public/images/gallery/`.

### 2. Styling Modifications
#### [MODIFY] [src/components/home/HeroSection.module.css](file:///c:/Users/KING%20MADU/Desktop/GRAVILOCH/graviloch-finishing/src/components/home/HeroSection.module.css)
- Adjust the `.overlay` gradient from its current heavy opacity to something more transparent (e.g., `rgba(13, 13, 13, 0.2)` to `0.7`) to let the new hero images shine through while keeping text readable.

#### [MODIFY] [src/components/samples/SamplesGrid.tsx](file:///c:/Users/KING%20MADU/Desktop/GRAVILOCH/graviloch-finishing/src/components/samples/SamplesGrid.tsx)
- Complete redesign of the "no samples found" empty state to match Graviloch's luxurious standards (using soft borders, gold gradient accents, and a larger elegant icon or image placeholder).

### 3. ServicesPreview Component Updates
#### [MODIFY] [src/components/home/ServicesPreview.tsx](file:///c:/Users/KING%20MADU/Desktop/GRAVILOCH/graviloch-finishing/src/components/home/ServicesPreview.tsx)
- Replace SVGs in the array with `<Image />` tags linking to newly generated icon-style images (maintained at the original SVG dimensions).
- Rename "Stucco" to "Stucco" and update its description to reflect stunning white stucco finishes.
- Add a new state variable `selectedService` to track modal opens.
- Implement an `AnimatePresence` overlay modal that pops up cleanly when a card is clicked, providing a brief description and a "Close" button.

### 4. Image Generation
We will use the `generate_image` via Gemini 3.1 Pro tool to create:
1. 6 square icon-style images for the ServicesPreview cards.
2. 10 interior wall texture sample images for the `/samples` page.
3. 4-6 beautiful luxury interior images for the `/gallery` page.
Once generated, we will move them to the `public/` directory so the Next.js app can serve them.


### 5. Arrange the Gallery  Nav items to be in middle, 
### 6. Change he  global header colur to green gradient.
## Verification Plan
### Automated Tests
- Run `npm run build` and `npm run test` to verify no regressions in the Prisma Client, API routes, or React components.

### Manual Verification
- Start the server `npm run dev`.
- Use the Browser Subagent to open `http://localhost:3000/`. Verify the Hero overlay is transparent and click a Services card to verify the modal animation.
- Navigate to `http://localhost:3000/samples` (prior to seeding) to verify the new empty state aesthetics. 
- Run the seed script and navigate back to `http://localhost:3000/samples` and `http://localhost:3000/gallery` to physically see all images.
