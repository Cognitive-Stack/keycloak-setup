# Story: Enhance Flow Service with Automatic Account Linking

**Story Title:** Enhance Flow Service with Automatic Account Linking - Brownfield Addition

**User Story:**
As a developer,
I want the `FlowService` to include the "Detect Existing Broker User" execution in the generated flow,
So that user accounts are automatically linked based on email.

**Story Context:**
*   **Existing System Integration:** Enhances the `FlowService` modified in the previous story.
*   **Technology:** Node.js.
*   **Follows pattern:** Adds a new execution step to the flow generation logic within the service layer.
*   **Touch points:** `src/services/flow.js`, `src/services/__tests__/flow.service.test.js`.

**Acceptance Criteria:**
1.  The `FlowService`'s `createFlow` method includes a new execution for "Detect Existing Broker User" (authenticator: `idp-auto-link`).
2.  This execution is placed before the "Update Profile" execution.
3.  The execution is marked as "ALTERNATIVE".
4.  The unit tests for `FlowService` are updated to verify the presence and configuration of this new execution.
5.  The `POST` endpoint continues to return the correct, updated JSON object.

**Technical Notes:**
*   **Integration Approach:** This story adds more business logic to `src/services/flow.js`.
*   **Key Constraints:** The authenticator `idp-auto-link` must be configured correctly. The order of executions in the final JSON is critical for the flow to work as intended.

**Status:** Ready for Dev
