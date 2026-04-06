---
name: lint
description: |
  Run linting checks on the codebase.
  Use when: Everytime after modifing codebase.
---

# Lint

## Step 1: Run auto-type generation

```bash
npm run typecheck
```

## Step 2: Run oxlint

```bash
npm run lint
```

## Step 3: Run ls-lint

```bash
npx ls-lint
```

## Step 4: Run dependency-cruiser

```bash
npx depcruise app
```

## Step5: Report

Report the results:

- Files checked
- Issues found
