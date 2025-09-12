# Story: Configure Domain List via API Request

**Story Title:** Configure Domain List via API Request - Brownfield Addition

**User Story:**
As a developer,
I want the `POST /api/v1/realms/{realmName}/flows` endpoint to accept a list of approved domains in the request body,
So that the domain validator script can be configured dynamically for each request.

**Story Context:**
*   **Existing System Integration:** Modifies the `FlowController` to accept new data and passes it down to the `FlowService`.
*   **Technology:** Node.js, Express.js.
*   **Follows pattern:** Enhances an existing API endpoint and service method.
*   **Touch points:** `src/controllers/flow.js`, `src/services/flow.js`, `src/__tests__/flow.test.js`, `src/services/__tests__/flow.service.test.js`.

**Acceptance Criteria:**
1.  The `POST /api/v1/realms/{realmName}/flows` endpoint now accepts an optional `approvedDomains` array in the request body (e.g., `{ "approvedDomains": ["example.com", "test.com"] }`).
2.  The `FlowController` passes this array to the `FlowService.createFlow` method.
3.  The `FlowService` uses the `approvedDomains` array to dynamically generate the domain list inside the "Script Authenticator" configuration.
4.  If `approvedDomains` is not provided or is empty, the script authenticator should not be added to the flow.
5.  The integration test for the controller (`src/__tests__/flow.test.js`) is updated to send the `approvedDomains` in the request body and verify the effect on the response.
6.  The unit test for the service (`src/services/__tests__/flow.service.test.js`) is updated to test both cases: with and without the `approvedDomains` array.

**Technical Notes:**
*   **Integration Approach:** This story makes the previously hardcoded domain validation dynamic. It requires changes from the controller down to the service.
*   **Key Constraints:** The API contract must be clearly defined. The logic in `FlowService` must correctly handle the conditional inclusion of the script authenticator.

**Status:** Completed

---
## Dev Agent Record

### File List
- `src/services/flow.js` (modified)
- `src/services/__tests__/flow.service.test.js` (modified)
- `src/__tests__/flow.test.js` (modified)

### Completion Notes
- Updated `FlowService` to conditionally add the domain validation script authenticator based on the `approvedDomains` parameter in the request body.
- The domain list in the script is now dynamically generated from the API request.
- If no domains are provided, the script authenticator is omitted from the flow.
- Updated the service unit tests and the controller integration tests to cover both cases (with and without `approvedDomains`).
- All acceptance criteria have been met.