# GraphQL Codegen Workflow Guide

## Current State (Pre-Codegen)

We've created **temporary shared types** in `src/types/database/models.ts` to:
- Avoid type duplication
- Allow development to continue without Hasura running
- Maintain DRY principles

## When to Run Codegen

### Option 1: Continue Development Without Codegen ✅
You can build through **Phase 5 (Hooks)** and even **Phase 6 (Molecules)** using the temporary types. This is fine for:
- Local development
- Testing UI components
- Building without Hasura running

### Option 2: Run Codegen Before Phase 6 (Recommended) 🎯
This ensures type consistency across the entire app:

```bash
# 1. Make sure Hasura is running with your schema
# 2. Update .env with correct HASURA_ENDPOINT
# 3. Run codegen
yarn codegen
```

## After Running Codegen

### 1. Update Type Imports
```typescript
// Before (temporary types)
import type { Exercise, Workout } from '@/types/database/models';

// After (generated types)
import type { Exercise, Workout } from '@/types/generated/graphql';
```

### 2. Delete Temporary Types
```bash
# Remove the temporary file
rm src/types/database/models.ts
```

### 3. Update Mock API
The mockApi will now use the generated types, ensuring perfect alignment with your database schema.

## Benefits of This Approach

1. **No Duplication**: Single source of truth for types
2. **Flexibility**: Can develop without Hasura running
3. **Easy Migration**: Simple find/replace when switching to generated types
4. **Type Safety**: Consistent types throughout development

## Type Flow Diagram

```
Development Phase:
mockApi.ts → imports from → database/models.ts ← also used by → hooks/stores

After Codegen:
mockApi.ts → imports from → generated/graphql.ts ← also used by → hooks/stores
                                    ↑
                            (auto-generated from)
                                    ↑
                              Hasura Schema
```

## Summary

- **Current**: Using shared temporary types (DRY ✅)
- **Future**: Replace with codegen types (Automated ✅)
- **Migration**: Simple import path update (Easy ✅)

This approach maintains clean architecture while allowing flexible development!
