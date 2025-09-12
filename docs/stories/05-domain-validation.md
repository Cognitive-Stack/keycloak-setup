# Story: Enhance Flow Service with Domain Validation

**Story Title:** Enhance Flow Service with Domain Validation - Brownfield Addition

**User Story:**
As a developer,
I want the `FlowService` to include a configurable script authenticator for email domain validation,
So that access can be restricted to approved domains.

**Story Context:**
*   **Existing System Integration:** Further enhances the `FlowService`.
*   **Technology:** Node.js, Keycloak Script Authenticators (JavaScript).
*   **Follows pattern:** Adds a new execution and a corresponding `authenticatorConfig` to the flow generation logic.
*   **Touch points:** `src/services/flow.js`, `src/services/__tests__/flow.service.test.js`.

**Acceptance Criteria:**
1.  The `FlowService`'s `createFlow` method adds a "Script Authenticator" execution to the generated flow.
2.  This execution is placed after the "Detect Existing Broker User" step but before the "Update Profile" step.
3.  The execution is marked as "REQUIRED".
4.  The service also generates an `authenticatorConfig` associated with the script execution.
5.  The `authenticatorConfig` contains a JavaScript snippet that checks the user's email domain against a list. For this story, the list can be hardcoded (e.g., `['example.com']`).
6.  The unit tests for `FlowService` are updated to verify the presence of the script authenticator execution and its associated configuration.

**Technical Notes:**
*   **Integration Approach:** This story involves adding a script authenticator, which requires creating two linked resources via the API: the execution itself and the authenticator configuration containing the script. The `FlowService` will need to be updated to handle this.
*   **Key Constraints:** The generated script must be valid JavaScript for Keycloak's Nashorn or GraalVM engine. The link between the execution and the config must be correct.

**Status:** Completed

---
## Dev Agent Record

### File List
- `src/services/flow.js` (modified)
- `src/services/__tests__/flow.service.test.js` (modified)

### Completion Notes
- Added a "Script Authenticator" execution to the `FlowService` to enforce email domain validation.
- The script is hardcoded with a default domain list as per the acceptance criteria.
- The new execution is marked as "REQUIRED" and placed correctly within the flow.
- Updated the `FlowService` unit test to verify the new script execution and its associated `authenticationConfig`.
- All acceptance criteria have been met.