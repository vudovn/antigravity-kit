# Requirements Document

## Introduction

This specification focuses on **integrating** the existing dark mode toggle component into the Antigravity Kit dashboard.

**Existing Implementation:**
- `ThemeProvider` is already configured in `web/src/app/layout.tsx` using `next-themes`
- `ThemeToggle` component exists at `web/src/components/theme-toggle.tsx` with full functionality
- Dark mode is set as the default theme with system preference support enabled

**Gap Identified:** The `ThemeToggle` component is complete but **not integrated** into any page or navigation. This spec defines where and how to place the toggle for optimal user experience.

---

## Requirements

### Requirement 1: Theme Toggle Placement
**Objective:** As a user, I want to easily access the dark/light mode toggle, so that I can switch themes without navigating away from my current page.

#### Acceptance Criteria
1. The Dashboard shall display the theme toggle button in a consistently accessible location across all pages.
2. When user clicks the toggle button, the Dashboard shall immediately switch between dark and light themes.
3. While on any documentation page, the user shall have access to the theme toggle in the navigation header.
4. The Dashboard shall render the toggle with appropriate visual styling that matches the current theme.

---

### Requirement 2: Theme Persistence
**Objective:** As a user, I want my theme preference to be remembered, so that I don't have to re-select it on every visit.

#### Acceptance Criteria
1. When user selects a theme, the Dashboard shall persist the preference in localStorage.
2. When user returns to the site, the Dashboard shall apply the previously selected theme.
3. Where system preference detection is enabled, the Dashboard shall respect the user's OS-level theme setting on first visit.
4. If user explicitly sets a theme, the Dashboard shall prioritize user preference over system preference.

---

### Requirement 3: Hydration Safety
**Objective:** As a developer, I want the toggle to handle SSR/hydration correctly, so that there's no flash of incorrect theme or hydration mismatch errors.

#### Acceptance Criteria
1. While the component is mounting (SSR), the Dashboard shall display a placeholder skeleton matching the button dimensions.
2. The Dashboard shall not render theme-dependent content until client-side hydration is complete.
3. The Dashboard shall use `suppressHydrationWarning` on the html element to prevent console warnings.

---

### Requirement 4: Accessibility
**Objective:** As a user with accessibility needs, I want the toggle to be fully accessible, so that I can use it with keyboard and screen readers.

#### Acceptance Criteria
1. The Dashboard shall provide an aria-label describing the toggle's current state and action.
2. When user presses Enter or Space on the focused toggle, the Dashboard shall activate the theme switch.
3. The Dashboard shall maintain visible focus indicators on the toggle button.
4. The toggle shall have a minimum touch target size of 44x44 pixels for mobile accessibility.

---

### Requirement 5: Visual Integration
**Objective:** As a user, I want the toggle to look native to the dashboard design, so that the UI feels cohesive.

#### Acceptance Criteria
1. The Dashboard shall display appropriate icons (sun/moon or equivalent) indicating current theme state.
2. The toggle button shall follow the existing Button component styling from the UI library.
3. When theme changes, the Dashboard shall apply smooth CSS transitions for background and text colors.
4. The toggle shall be visually distinguishable but not distracting from primary content.
