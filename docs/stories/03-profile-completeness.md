# Story: Enhance Flow Service with Profile Completeness

**Story Title:** Enhance Flow Service with Profile Completeness - Brownfield Addition

**User Story:**
As a developer,
I want the `FlowService` to include the "Update Profile" required action in the generated flow,
So that all users are forced to complete their profiles.

**Story Context:**
*   **Existing System Integration:** Enhances the `FlowService` created in the previous story.
*   **Technology:** Node.js.
*   **Follows pattern:** Implements the business logic for a specific feature within the service layer, as defined in `docs/architecture.md`.
*   **Touch points:** `src/services/flow.js`.

**Acceptance Criteria:**
1.  The `FlowService`'s `createFlow` method no longer returns placeholder data.
2.  The method generates a valid Keycloak authentication flow JSON object for the "first broker login" flow.
3.  The generated JSON includes an execution step for the "Update Profile" required action (authenticator: `identity-provider-review-profile`).
4.  This execution step is marked as "REQUIRED".
5.  Unit tests are created for the `FlowService` to verify the structure of the generated JSON.
6.  The `POST /api/v1/realms/{realmName}/flows` endpoint now returns the generated JSON object (for now).

**Technical Notes:**
*   **Integration Approach:** This story replaces the placeholder logic in `src/services/flow.js` with the first piece of real business logic.
*   **Key Constraints:** The generated JSON must be structured precisely as the Keycloak Admin API expects.

**Status:** Completed

---
## Dev Agent Record

### File List
- `src/services/flow.js` (modified)
- `src/controllers/flow.js` (modified)
- `src/__tests__/flow.test.js` (modified)
- `src/services/__tests__/flow.service.test.js` (created)

### Completion Notes
- Replaced the placeholder logic in `FlowService` to generate a valid Keycloak authentication flow with a mandatory "Update Profile" step.
- Created a unit test to verify the structure of the generated flow JSON.
- Updated the `FlowController` to return the generated flow JSON in the API response.
- Updated the existing integration test to assert the new API response.
- All acceptance criteria have been met.