# Udacity Catalog Search Test Automation

This project contains automated end-to-end tests for the Udacity catalog search functionality using Cucumber.js with Playwright and TypeScript.

## Project Structure

```
src/
├── feature/           # Cucumber feature files
│   └── search.feature
├── pages/            # Page Object Models
│   └── searchPage.ts
├── steps/            # Step definitions
│   └── search.steps.ts
├── support/          # Test setup and configuration
│   ├── hooks.ts
│   └── world.ts
└── utils/            # Utility functions
    └── apiHelper.ts
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the project root:
```env
BASE_URL=https://www.udacity.com/catalog
```

## Running Tests

To run all tests:
```bash
npm test
```

## Key Features

- **Page Object Model**: Implements the Page Object pattern for better maintainability
- **API Integration**: Compares UI results with API responses
- **Retry Mechanism**: Includes automatic retries for browser initialization
- **Custom World**: Extended Cucumber World object for sharing context between steps
- **Type Safety**: Full TypeScript support throughout the project

## Test Scenarios

The test suite covers the following scenarios:
1. Basic search functionality
2. Skill-based filtering
3. No results handling

## Framework Components

### World Class
- Manages browser and page instances
- Stores test context (search terms, results)
- Handles initialization and cleanup

### Page Objects
- Encapsulates page elements and actions
- Provides reusable methods for common interactions

### Step Definitions
- Implements Cucumber steps
- Handles test assertions
- Manages timeouts and waits

### Hooks
- Sets up test environment
- Handles cleanup after tests
- Implements retry mechanism

## Configuration

### Cucumber Configuration
Located in `cucumber.js`:
- Uses TypeScript
- Configures step timeouts
- Sets up reporting

### TypeScript Configuration
Located in `tsconfig.json`:
- Strict type checking
- CommonJS modules
- Node.js types

## Best Practices

1. **Error Handling**
   - All critical operations include try-catch blocks
   - Meaningful error messages
   - Retry mechanisms for flaky operations

2. **Timeouts**
   - Default timeout: 2000ms
   - Custom timeouts for specific operations
   - Configurable through environment variables

3. **Selectors**
   - Prioritizes role-based selectors
   - Uses test IDs for stable element identification
   - Falls back to CSS selectors when necessary

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Troubleshooting

Common issues and solutions:

1. **Tests timing out**
   - Increase the default timeout in `hooks.ts`
   - Check network connectivity
   - Verify selector validity

2. **Browser launch fails**
   - Ensure Playwright browsers are installed
   - Check system resources
   - Verify no conflicting processes

3. **API comparison fails**
   - Verify API endpoint availability
   - Check response format matches expectations
   - Ensure proper error handling
