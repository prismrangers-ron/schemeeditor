# Project Rules

## Code Style

| Rule | Standard |
|------|----------|
| Language | **TypeScript** for all new files |
| Components | **Functional components** (if React added) |
| Database columns | **snake_case** (if backend added) |

## Architecture

| Pattern | Description |
|---------|-------------|
| **Repository pattern** | Data access through repositories (if backend added) |
| **Service layers** | Business logic isolated in services (if backend added) |

## Current Scope (V1)

This is a client-side only application:
- No backend/database in V1
- Repository and service patterns apply if backend is added later
- TypeScript is required for all source files

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| TypeScript files | camelCase | `cardRenderer.ts` |
| Type definition files | camelCase | `types.ts` |
| CSS files | kebab-case | `styles.css` |
| Assets | kebab-case | `card-template.png` |

## TypeScript Standards

- Strict mode enabled
- Explicit return types on functions
- Interface over type for object shapes
- No `any` unless absolutely necessary


