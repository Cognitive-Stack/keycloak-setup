# Story: Implement Foundational Express Server Structure

**Story Title:** Foundational Express Server Structure - Greenfield Implementation

**User Story:**
As a developer,
I want to create the basic file and folder structure for the Express.js server, including a health check endpoint,
So that I have a functional starting point for building the API.

**Story Context:**
*   **Existing System Integration:** This is the foundational implementation; it does not integrate with existing application code.
*   **Technology:** Node.js, Express.js, dotenv, helmet, cors.
*   **Follows pattern:** Follows the Layered Architecture pattern defined in `docs/architecture.md`.
*   **Touch points:** `index.js`, `src/`, `.env`.

**Acceptance Criteria:**
1.  The directory structure `src/controllers`, `src/routes`, `src/services`, `src/middleware` is created.
2.  An `index.js` file is created that initializes and starts the Express server.
3.  The server uses the `helmet` and `cors` middleware.
4.  The server loads configuration from a `.env` file (e.g., `PORT`).
5.  A basic `GET /healthz` endpoint is created that returns a `200 OK` response with `{ "status": "ok" }`.
6.  The server starts without errors when running `npm start`.

**Technical Notes:**
*   **Integration Approach:** This story establishes the foundational structure for the entire application as defined in `docs/architecture.md`.
*   **Key Constraints:** The implementation must strictly follow the source tree and component architecture outlined in the architecture document.

**Status:** Completed

---
## Dev Agent Record

### File List
- `src/controllers/` (created)
- `src/routes/` (created)
- `src/services/` (created)
- `src/middleware/` (created)
- `src/__tests__/health.test.js` (created)
- `.env` (created)
- `index.js` (created)
- `app.js` (created)
- `package.json` (modified)
- `jest.config.js` (created)

### Completion Notes
- Created the basic directory structure for the Express.js application.
- Implemented the main server entry point in `index.js` and the app definition in `app.js`.
- Added a `/healthz` endpoint for monitoring.
- Installed Jest and Supertest for testing.
- Configured Jest to only run tests within the `src` directory.
- Wrote a passing test for the health check endpoint.