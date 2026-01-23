# Research & Design Decisions

---
**Purpose**: Capture discovery findings, architectural investigations, and rationale that inform the technical design.
---

## Summary
- **Feature**: `dark-mode-toggle`
- **Discovery Scope**: Extension (integrating existing component)
- **Key Findings**:
  - ThemeToggle component already implemented and integrated in Header component
  - Uses next-themes@0.4.6 with full SSR/hydration support
  - Missing integration point: Homepage (`app/page.tsx`) does not have Header/navigation
  - Existing Button component from @base-ui/react provides consistent styling

## Research Log

### Integration Point Analysis
- **Context**: Determine where ThemeToggle needs to be integrated
- **Sources Consulted**: 
  - `/web/src/components/layout/header/index.tsx` - Header implementation
  - `/web/src/app/docs/layout.tsx` - Documentation layout with Header
  - `/web/src/app/page.tsx` - Homepage (no Header currently)
- **Findings**:
  - Header component at line 63 already renders `<ThemeToggle />`
  - Documentation pages (`/docs/*`) use `DocsLayout` which includes Header
  - Homepage is standalone page without Header/Footer layout
  - ThemeToggle uses ghost variant Button with size icon from UI library
- **Implications**: 
  - No new component creation needed
  - Focus on adding Header to homepage layout
  - Maintain consistent layout structure across all pages

### Technology Stack Verification
- **Context**: Verify compatibility of existing implementation with requirements
- **Sources Consulted**:
  - `package.json` - Dependencies versions
  - [next-themes documentation](https://github.com/pacocoursey/next-themes)
  - `theme-toggle.tsx` - Implementation details
- **Findings**:
  - `next-themes@0.4.6` - Latest stable, supports Next.js 16.1.3
  - Provides `useTheme()` hook for theme management
  - Built-in SSR/hydration support with `suppressHydrationWarning`
  - localStorage persistence by default
  - System preference detection via `enableSystem` prop
- **Implications**:
  - All Requirement 2 (Persistence) criteria already satisfied
  - All Requirement 3 (Hydration Safety) criteria already implemented
  - No additional dependencies needed

### Accessibility Compliance Check
- **Context**: Verify existing toggle meets accessibility requirements
- **Sources Consulted**: 
  - `theme-toggle.tsx` implementation
  - Button component from @base-ui/react
- **Findings**:
  - `aria-label="Toggle theme"` present on button (line 26)
  - Button component includes focus-visible ring (from CVA variants)
  - Size icon variant provides 36x36px touch target (size-9 = 2.25rem = 36px)
  - SVG icons have proper role and sizing
- **Implications**:
  - Requirement 4.1 (aria-label) ✅ satisfied
  - Requirement 4.2 (keyboard activation) ✅ satisfied via Button component
  - Requirement 4.3 (focus indicators) ✅ satisfied
  - Requirement 4.4 (touch target) ✅ satisfied (36px > 44px minimum - needs verification)

## Design Decisions

### Decision: Extend Header to Homepage
- **Context**: Homepage currently has standalone layout without navigation/header
- **Alternatives Considered**:
  1. Add standalone toggle to homepage only - inconsistent UX
  2. Create unified layout wrapper for all pages - consistent UX
  3. Keep homepage minimal, add toggle overlay - poor discoverability
- **Selected Approach**: Integrate Header component into homepage layout
- **Rationale**: 
  - Provides consistent navigation across all pages
  - Toggle automatically available on homepage once Header is added
  - Aligns with documentation pages pattern
  - Better user experience with unified navigation
- **Trade-offs**: 
  - **Benefits**: Consistency, better UX, single source of truth
  - **Compromises**: Slightly different homepage design from current minimal approach
- **Follow-up**: 
  - Verify homepage design still maintains intended aesthetic with Header
  - Test mobile responsive behavior on homepage

### Decision: No Additional Components Required
- **Context**: Requirements specify adding dark mode toggle functionality
- **Alternatives Considered**:
  1. Create new toggle component from scratch - unnecessary duplication
  2. Use existing ThemeToggle - leverages existing work
  3. Use third-party toggle library - adds dependency
- **Selected Approach**: Leverage existing `ThemeToggle` component
- **Rationale**:
  - Component already implements all required functionality
  - Already integrated in Header (documentation pages)
  - Follows project's existing patterns and styling
  - No new dependencies or complexity
- **Trade-offs**:
  - **Benefits**: Zero additional code, consistent implementation
  - **Compromises**: None identified
- **Follow-up**: Verify touch target meets 44x44px minimum (currently 36px)

## Risks & Mitigations
- **Risk 1**: Homepage aesthetic change with Header addition
  - **Mitigation**: Design Header integration to complement minimal homepage design, possibly with reduced padding/styling variant
- **Risk 2**: Touch target size may be below 44x44px minimum (currently 36px)
  - **Mitigation**: Update Button icon variant size to `icon-lg` (40px) or add padding to meet accessibility standard
- **Risk 3**: Homepage may need Footer for consistency
  - **Mitigation**: Evaluate Footer inclusion in homepage layout as separate enhancement

## References
- [next-themes GitHub](https://github.com/pacocoursey/next-themes) - Theme provider library
- [WCAG 2.1 Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html) - 44x44px minimum guideline
- [Base UI React Documentation](https://base-ui.com/) - Button component system
