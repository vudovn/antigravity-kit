# Implementation Tasks

## Task Breakdown

### 1. Integrate Header Component into Homepage

- [ ] 1.1 (P) Add Header to homepage layout
  - Import Header component from `components/layout/header`
  - Render Header at top of homepage container
  - Verify ThemeToggle appears and functions on homepage
  - Ensure responsive behavior maintained across breakpoints
  - Visual regression check: confirm homepage aesthetic maintained with Header
  - _Requirements: 1.1, 1.3_

- [ ] 1.2 (P) Verify touch target accessibility
  - Measure computed button size in browser DevTools
  - If below 44x44px minimum, update ThemeToggle to use `size="icon-xl"` variant
  - Test touch target on mobile viewport (375px width)
  - Confirm button clickable area meets WCAG 2.1 Level AA standard
  - _Requirements: 4.4_

### 2. Integration Testing

- [ ] 2.1 Theme persistence across pages
  - Toggle theme on homepage, navigate to /docs, verify theme persisted
  - Toggle theme on /docs, navigate to homepage, verify theme persisted
  - Reload page after theme change, verify localStorage restoration
  - Clear localStorage, verify fallback to system preference or default dark theme
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4_

- [ ] 2.2 Cross-page consistency validation
  - Navigate between homepage, /docs, and other pages
  - Verify Header renders consistently on all pages
  - Verify ThemeToggle state synchronized across navigation
  - Confirm no theme flash or hydration warnings in console
  - _Requirements: 1.1, 1.3, 3.1, 3.2, 3.3_

### 3. Accessibility Verification

- [ ] 3.1 Keyboard navigation testing
  - Tab to ThemeToggle button, verify visible focus ring
  - Press Enter key, verify theme toggles
  - Press Space key, verify theme toggles  
  - Test keyboard navigation on both homepage and /docs pages
  - _Requirements: 4.2, 4.3_

- [ ] 3.2 Screen reader compatibility
  - Activate screen reader (VoiceOver on macOS, NVDA on Windows)
  - Navigate to ThemeToggle, verify announces "Toggle theme button"
  - Activate button, verify announces action or state change
  - Test on both homepage and documentation pages
  - _Requirements: 4.1_

- [ ] 3.3* Color contrast validation
  - Measure icon contrast ratio in light theme (minimum 4.5:1)
  - Measure icon contrast ratio in dark theme (minimum 4.5:1)
  - Verify focus indicator contrast (minimum 3:1 against background)
  - Use browser DevTools or automated contrast checker
  - _Requirements: 5.1, 5.2_

### 4. Visual Integration Testing

- [ ] 4.1 Theme toggle interaction flow
  - Load page in light theme
  - Click toggle, verify smooth transition to dark theme
  - Verify all UI elements update colors appropriately
  - Confirm transition completes within 500ms
  - Verify no jarring visual changes or flash
  - _Requirements: 1.2, 1.4, 5.3, 5.4_

- [ ] 4.2 Mobile responsive verification
  - Test on mobile viewport (375px width)
  - Verify Header and ThemeToggle visible and accessible
  - Tap toggle button, verify theme changes
  - Confirm touch target adequate for thumb interaction
  - Test on /docs pages mobile menu behavior
  - _Requirements: 1.1, 1.3, 1.4, 4.4_

## Requirements Coverage Summary

All 18 acceptance criteria mapped:
- **Requirement 1** (Placement): 1.1, 1.2, 1.3, 1.4 → Tasks 1.1, 2.1, 2.2, 4.1, 4.2
- **Requirement 2** (Persistence): 2.1, 2.2, 2.3, 2.4 → Task 2.1
- **Requirement 3** (Hydration): 3.1, 3.2, 3.3 → Task 2.2
- **Requirement 4** (Accessibility): 4.1, 4.2, 4.3, 4.4 → Tasks 1.2, 3.1, 3.2
- **Requirement 5** (Visual): 5.1, 5.2, 5.3, 5.4 → Tasks 3.3, 4.1, 4.2

## Implementation Notes

**No code changes to existing components required** - ThemeToggle and Header already implement all functionality. Focus is on:
1. Homepage layout integration (single file change: `app/page.tsx`)
2. Touch target size verification/adjustment (if needed: `components/theme-toggle.tsx`)
3. Comprehensive testing across all pages

**Parallel execution**: Tasks 1.1 and 1.2 can run in parallel as they touch different concerns (layout vs. accessibility sizing). All testing tasks (2.x, 3.x, 4.x) should run sequentially after integration complete.

**Optional marker** (`*`): Task 3.3 marked optional as contrast validation is purely compliance checking - acceptance criteria already satisfied by existing design system.
