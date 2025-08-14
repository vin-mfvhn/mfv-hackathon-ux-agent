# @frontend-boilerplate/next-app-router

This package is a boilerplate (≒ starter kit) based on technical standards for web frontend development at Money Forward. It is provided as a "[Paved Load](https://www.slideshare.net/slideshow/the-paved-road-at-netflix/75867013)" to help developers efficiently start projects and proceed with development in compliance with the standards.

## Main Features

- **Project Structure Template:** Provides a standard directory structure and file layout.
- **Build Tool Configuration**: Provides build tool settings using Vite.
- **Coding Best Practices:** Provides best practices for coding in TypeScript, CSS, and so on.
- **Linting & Formatting:** Includes configurations for static code analysis and formatting using ESLint, Stylelint, and Prettier.
- **Testing:** Provides basic settings for unit tests and E2E tests using testing frameworks like Vitest, React Testing Library, and Playwright.

## Capabilities, Limitations, and Prohibitions

### Capabilities

- Use as a reference to understand technical standards.
- Use as a template for setting up new projects.
- Use as a reference when introducing technical standards to existing projects.
- Use as educational material for training new members.
- Use as a base for implementations including RSC, SSR, and SSG features.

### Limitations

- Cannot be used as a base for implementing specific business logic.

### Prohibitions

- TBD

## Running this boilerplate

### Prerequisites

| Module                   | Version                              |
| :----------------------- | :----------------------------------- |
| Node.js                  | Refer to `.node-version` or `.nvmrc` |
| [pnpm](https://pnpm.io/) | Refer to `package.json`              |

### Setup

#### 1. Clone this repository

```sh
git clone https://github.com/moneyforward/frontend-boilerplate.git
```

#### 2. Install dependencies

```sh
cd frontend-boilerplate/examples/next-app-router
corepack enable # if pnpm is not installed, execute this command
pnpm install    # don't use npm or yarn
```

### Development

```sh
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser to verify that the application is running correctly.

### UI Components Catalog

This project uses [Storybook](https://storybook.js.org/) to generate a UI components catalog.

```sh
pnpm storybook
```

### API Type Definitions Generation

This project provides a command to generate TypeScript type definitions from OpenAPI definition files stored in the `./api` directory.

Run the following command to generate TypeScript type definitions:

```sh
pnpm typegen:api
```

When you run this command, it reads OpenAPI definition files located under the `./api` directory and generates TypeScript type definitions in the `./app/_types` directory. By utilizing the generated type definitions, you can implement type-safe API client methods, ensuring better reliability and maintainability in your codebase.

### Linting

```sh
pnpm lint
```

### Testing

```sh
pnpm test
```

## Main Technology Stack

| Category               | Technology                                                                      | ADR                                                                                                                                        |
| :--------------------- | :------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Language               | [TypeScript](https://www.typescriptlang.org/)                                   | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0001-programming-language-for-web-frontend-development.md)   |
| Development Runtime    | [Node.js](https://nodejs.org/)                                                  | wip                                                                                                                                        |
| Web Frontend Library   | [React](https://react.dev/)                                                     | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0002-web-frontend-library-for-product-development.md)        |
| Framework              | [Next.js](https://nextjs.org/docs/app)                                          | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0015-framework-selection-for-web-frontend-development.md)    |
| State Management       | [Jotai](https://jotai.org/)                                                     | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0003-state-management-selection.md)                          |
| Styling                | [CSS Modules](https://github.com/css-modules/css-modules)                       | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0004-styling-for-web-frontend-development.md)                |
| UI Library             | [mfui](https://github.com/moneyforward/mfui)                                    | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0014-ui-library-for-web-frontend-development.md)             |
| Node Package Manager   | [pnpm](https://pnpm.io/)                                                        | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0005-node-package-manager-for-web-frontend-development.md)   |
| Unit Test Runner       | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0006-unit-test-runner-for-web-frontend-development.md)       |
| E2E Test Runner        | [Playwright](https://playwright.dev/)                                           | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0007-e2e-test-framework-for-web-frontend-development.md)     |
| UI Catalog             | [Storybook](https://storybook.js.org/)                                          | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0008-ui-catalog-for-web-frontend-development.md)             |
| Visual Regression Test | [Chromatic](https://www.chromatic.com/storybook)                                | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0009-visual-regression-test-for-web-frontend-development.md) |
| JavaScript Linter      | [ESLint](https://eslint.org/)                                                   | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0010-linter-for-typescript-for-web-frontend-development.md)  |
| CSS Linter             | [Stylelint](https://stylelint.io/)                                              | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0011-linter-for-css-for-web-frontend-development.md)         |
| Code Formatter         | [Prettier](https://prettier.io/)                                                | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0012-code-formatter-for-web-frontend-development.md)         |
| Dependency Update      | [Renovate](https://docs.renovatebot.com/)                                       | [ADR](https://github.com/moneyforward/frontend-boilerplate/blob/main/docs/adr/0013-dependency-automation-for-web-frontend-development.md)  |

## Contact Information

If you have any questions or encounter any issues, please contact us at the following:

### Slack

- **Channel:** [#development_standards](https://moneyforward.slack.com/archives/C07KEPTDL69)
- **Mention:** `@dpe-members`

### GitHub

- **Repository:** [frontend-boilerplate](https://github.com/moneyforward/frontend-boilerplate/)
