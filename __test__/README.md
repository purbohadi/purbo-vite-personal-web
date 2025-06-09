# Test Structure

This project follows the **root-level test directory pattern** similar to the sqemp-dashboard-frontend project.

## Directory Structure

```
__test__/
├── src/
│   ├── components/
│   │   └── layout/
│   │       └── MainLayout.test.tsx
│   ├── types/
│   │   ├── card.test.ts
│   │   ├── dashboard.test.ts
│   │   ├── index.test.ts
│   │   ├── transaction.test.ts
│   │   └── user.test.ts
│   ├── utils/
│   │   ├── api.test.ts
│   │   ├── avatarUtils.test.ts
│   │   ├── charts.test.ts
│   │   ├── formatters.test.ts
│   │   ├── helpers.test.ts
│   │   ├── storage.test.ts
│   │   └── validators.test.ts
│   ├── setupAfterEnv.ts
│   └── test-utils.tsx
```

## Benefits

1. **Production Build Optimization**: Tests are automatically excluded from production builds since they're outside the `src/` directory
2. **Clear Separation**: Tests are clearly separated from source code while maintaining a parallel structure
3. **Consistency**: Follows the same pattern as other projects in the organization (sqemp-dashboard-frontend)
4. **Easy Exclusion**: Can be easily excluded from various build tools and processes

## Import Paths

Test files use relative imports to the source code:

```typescript
// Example from __test__/src/types/card.test.ts
import { Card, CardSummary } from '../../../src/types/card';
```

## Configuration

- **Jest Config**: Updated to look for tests in `__test__/**/*.test.[jt]s?(x)`
- **TypeScript Config**: Includes `__test__` directory for type checking
- **Test Match Pattern**: Explicitly matches `.test.` and `.spec.` files only

## Coverage

The current test coverage includes:
- **Types**: 100% coverage with comprehensive type validation and utilities
- **Components**: Basic component testing setup
- **Utils**: Extensive utility function testing

## Running Tests

```bash
# Run all tests
npm test

# Run specific test directory
npm test __test__/src/types/

# Run with coverage
npm run test:coverage
``` 