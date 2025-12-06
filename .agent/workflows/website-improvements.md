---
description: Workflow for implementing all Seriaflow website improvements
---

## Prerequisites
- [ ] Existing codebase analyzed
- [ ] DOE framework in place
- [ ] Implementation plan approved by user

## Phase 1: Shared Infrastructure

### 1.1 Create Constants File
// turbo
```bash
# No command, file creation
```
Create `lib/constants.ts` with:
- Stats data (20+ automations, 500+ hours, 5 industries)
- Navigation items
- Contact info
- Social links

### 1.2 Create Shared Components
Create reusable components:
- `components/Stats.tsx` - Reusable stats display
- `components/CTASection.tsx` - Reusable CTA block
- `components/SEO.tsx` - OpenGraph metadata helper

## Phase 2: SEO Implementation

### 2.1 Per-Page Metadata
Update each page.tsx with unique:
- title
- description
- openGraph
- twitter cards

### 2.2 Structured Data
Add JSON-LD for:
- Organization
- LocalBusiness
- FAQPage (pricing, contact)

## Phase 3: Accessibility

### 3.1 Aria Labels
Add aria-labels to:
- All buttons
- Icon-only elements
- Navigation links

### 3.2 Color Contrast
Improve text-gray-400 → text-gray-300 where WCAG requires

### 3.3 Skip Navigation
Add skip-to-content link in Header

### 3.4 Form Accessibility
Add:
- aria-describedby for errors
- aria-invalid for invalid fields
- Focus management

## Phase 4: Functionality

### 4.1 Live Chat Button
Options:
a) Link to WhatsApp
b) Integrate Crisp/Tawk.to
c) Custom chat modal

### 4.2 Book Now Button
Options:
a) Calendly embed
b) Cal.com integration
c) Simple form modal

### 4.3 Email Button
Connect to:
- mailto: link with prefilled subject

## Phase 5: Contact Form UX

### 5.1 Loading State
- Add spinner component
- Disable form during submit
- Show loading text

### 5.2 Success Feedback
- Success modal/toast
- Clear form on success
- Celebrate animation (optional)

### 5.3 Error Handling
- Per-field error display
- Summary error message
- Retry functionality

## Phase 6: Performance

### 6.1 Animation Optimization
- Add will-change properties
- Reduce motion for prefers-reduced-motion

### 6.2 Particles Optimization
- Fewer particles on mobile
- Disable on low-power mode

## Phase 7: Database

### 7.1 Schema Update
Add columns:
- is_read BOOLEAN DEFAULT false
- status VARCHAR(20) DEFAULT 'new'
- Create updated_at trigger

## Verification

// turbo
```bash
npm run lint
```

// turbo
```bash
npm run build
```

```bash
npm run dev
# Manual verification at http://localhost:3000
```

## Rollback
- All changes tracked in Git
- Use `git checkout -- .` to revert if needed
