# DOE Framework - Seriaflow Website Development

## Overview

This framework defines how the AI coding assistant operates on this codebase using a 3-Layer Architecture: **D**irective, **O**rchestration, **E**xecution.

---

## Layer 1: DIRECTIVE (What to Do)

### Purpose
Define goals, inputs, constraints, outputs, and edge cases for each task.

### Current Directives

#### DIRECTIVE: SERIAFLOW_WEBSITE_IMPROVEMENTS

**Goal**: Enhance the Seriaflow website for production readiness with focus on SEO, accessibility, performance, and code quality.

**Inputs**:
- Existing Next.js 14 codebase with App Router
- Current pages: Home, Services, Pricing, Case Studies, About, Contact
- Tech stack: TypeScript, Tailwind CSS, PostgreSQL, Resend

**Constraints**:
- Maintain existing visual design (Glassmorphism theme)
- Keep Indonesian-English bilingual content style
- Preserve all security measures (reCAPTCHA, XSS/SQL protection)
- Must pass ESLint checks
- No breaking changes to existing functionality

**Outputs**:
- Per-page SEO metadata with OpenGraph support
- Accessible interface with WCAG compliance
- DRY codebase with shared constants/components
- Functional CTA buttons
- Enhanced contact form UX
- Performance optimizations

**Edge Cases**:
- Handle reduced motion preferences
- Mobile-first responsiveness
- Screen reader compatibility
- Graceful degradation for older browsers

---

## Layer 2: ORCHESTRATION (Decision Making)

### Purpose
Intelligent routing, decision-making, and coordination between directives and execution.

### Core Principles

1. **Read Before Write**
   - Always analyze existing code before modifying
   - Understand component relationships and dependencies

2. **Sequential Dependency**
   - Shared constants → Components → Pages
   - Base styles → Utility classes → Component styles

3. **Indonesian Tech Culture**
   - Mix of Indonesian and English is natural for tech audience
   - "Kak/Pak/Bu" formality where appropriate
   - Professional but approachable tone

4. **Error Handling**
   - Log all errors with context
   - Provide user-friendly error messages
   - Graceful fallbacks for non-critical features

5. **Quality Gates**
   - ESLint must pass before completion
   - Visual verification in browser
   - Accessibility audit

### Decision Matrix

| Situation | Action |
|-----------|--------|
| New shared component needed | Create in `components/` |
| New utility function needed | Create in `lib/` |
| Page-specific component | Create in `app/[page]/components/` |
| Shared constants | Create in `lib/constants.ts` |
| Type definitions | Create in `types/` |

---

## Layer 3: EXECUTION (Doing the Work)

### Purpose
Deterministic, reliable implementation of decisions made in orchestration layer.

### Execution Patterns

#### Pattern 1: File Modification
```
1. View file to understand current state
2. Identify exact lines to modify
3. Make targeted changes with replace_file_content
4. Verify no syntax errors
```

#### Pattern 2: New File Creation
```
1. Determine appropriate directory
2. Follow existing naming conventions
3. Create with proper TypeScript types
4. Export appropriately (named vs default)
5. Update imports where needed
```

#### Pattern 3: Component Refactoring
```
1. Identify repeated patterns
2. Extract to reusable component
3. Replace usages one by one
4. Test each replacement
```

#### Pattern 4: Verification
```
1. Run ESLint: npm run lint
2. Run build: npm run build
3. Visual verification: npm run dev + browser
```

### File Structure Standards

```
d:\ProjectAI\Website-Seriaflow\
├── .agent/
│   ├── DOE_FRAMEWORK.md      # This file
│   └── workflows/            # Specific task workflows
├── app/
│   ├── [page]/
│   │   └── page.tsx          # Route pages
│   └── components/           # Page-specific components
├── components/               # Shared components
├── lib/
│   ├── constants.ts          # Shared constants (NEW)
│   ├── database.ts          
│   ├── email.ts             
│   └── validation.ts        
└── types/                    # TypeScript definitions
```

---

## Workflow Template

```markdown
---
description: [Task description]
---

## Prerequisites
- [ ] List prerequisites

## Steps
1. Step description
   - Substep if needed
2. Next step

## Verification
- [ ] Verification steps

## Rollback
- Steps to undo if needed
```

---

## Active Directive Status

**Current**: SERIAFLOW_WEBSITE_IMPROVEMENTS
**Phase**: Implementation Planning
**Next Action**: Create detailed implementation plan for user approval
