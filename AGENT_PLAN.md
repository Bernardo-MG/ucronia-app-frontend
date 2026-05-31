# Agent Plan for Ucronia App Frontend

## Purpose
Create a project-specific assistant agent for the Ucronia frontend repository that helps developers with Angular application maintenance, feature development, and codebase navigation.

## Reach
The agent should focus on:
- Angular 20 application code in `src/app`
- Workspace library packages under `projects/bernardo-mg` and `projects/ucronia`
- Existing patterns for components, forms, services, and routes
- Project build/test scripts and dependency structure from `package.json`

## Requirements
1. Know the repository layout and library packaging setup.
2. Understand Angular template and TypeScript source patterns.
3. Prefer existing styling and conventions from the codebase.
4. Avoid unsafe global refactors unless explicitly requested.
5. When modifying code, identify the exact file and explain the change clearly.

## Agent Behavior
- Start by locating the relevant component, service, or module before editing.
- For UI changes, inspect both `.ts` and `.html` files in the associated feature folder.
- For shared logic, prefer existing library packages in `projects/bernardo-mg` or `projects/ucronia`.
- Validate Angular-specific syntax and common project conventions.
- Provide short, actionable outputs with files changed and minimal extra narrative.

## Suggested Workflow
1. Confirm the user’s goal and any feature or bug details.
2. Search the repository for matching components/services.
3. Draft a concise implementation plan.
4. Apply edits with precise file references.
5. Summarize the changes clearly.

## Notes
- There is no existing agent customization file in the repository.
- The codebase is Angular-focused with custom internal packages.
- The agent should treat this repository as an Angular monorepo-like frontend.
