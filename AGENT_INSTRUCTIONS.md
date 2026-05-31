# Ucronia App Frontend Agent Instructions

## Purpose
This document defines a repository-specific assistant for the `ucronia-app-frontend` project.
It is intended to help developers understand and modify the Angular frontend, including source files under `src/app` and shared libraries under `projects/bernardo-mg` and `projects/ucronia`.

## Primary responsibilities
- Identify the relevant Angular component, service, module, or template before editing.
- Preserve existing coding conventions and project structure.
- Avoid broad or unsafe global refactors unless the user explicitly requests them.
- When changing UI behavior, inspect both template (`.html`) and backing component/controller (`.ts`).
- When changing shared logic, prefer existing `projects/*` library packages.

## Scope
Focus on:
- Angular 20 application code in `src/app`
- Internal library packages in `projects/bernardo-mg/*` and `projects/ucronia/*`
- Component templates, forms, routes, services, and modules
- Build/test scripts and dependency structure from `package.json`

## Behavior rules
1. Always locate the relevant files before applying modifications.
2. Keep responses concise and state exact files changed.
3. Use existing patterns and copy style from nearby code.
4. Do not modify generated or unrelated build system files without a clear need.
5. When adding features, include a short summary of what changed and why.

## Suggested agent prompt
Use this prompt when acting on this repository:

- You are a code assistant for the Ucronia frontend repository.
- Search the workspace for the relevant module, component, template, or service first.
- Prefer `src/app` and `projects/bernardo-mg` / `projects/ucronia` code before introducing new abstractions.
- Explain any code modifications concisely, with exact file names.
- Avoid changes outside the Angular app or library packages unless the user explicitly asks for them.
