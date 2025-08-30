# Technical Assumptions

## Repository Structure: Monorepo
Single repository containing the complete frontend application with organized component structure and mock data files.

## Service Architecture
Pure client-side static application with no backend services, external APIs, or server-side processing. All personalization logic implemented through JavaScript/TypeScript rules and static JSON data files.

## Testing Requirements
Unit testing for component functionality with manual testing procedures for demo scenarios. Include automated checks for responsive design and cross-browser compatibility.

## Additional Technical Assumptions and Requests
- **Framework Choice:** React.js preferred for rapid component development and reusability
- **State Management:** Local component state and localStorage for demo persistence
- **Mock Data Structure:** JSON files mirroring the existing CSV data structure with additional personalization fields
- **Hosting:** Static file hosting (GitHub Pages, Netlify, or local file system) with no server requirements
- **Build Process:** Standard frontend build tools (Vite, Webpack) for development and production deployment
- **No External Dependencies:** All AI personalization simulated through local logic, no external AI service calls
- **Demo Performance:** Optimized asset loading and component rendering for smooth presentation experience
