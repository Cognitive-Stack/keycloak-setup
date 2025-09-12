# Story: Implement JWT Authentication Middleware

**Story Title:** Implement JWT Authentication Middleware - Brownfield Addition

**User Story:**
As a developer,
I want to secure the API endpoints with JWT authentication,
So that only authorized clients can use the service.

**Story Context:**
*   **Existing System Integration:** This is a cross-cutting concern that will affect all API routes. It will involve creating new middleware.
*   **Technology:** Node.js, Express.js, `express-jwt` or a similar library, `jwks-rsa`.
*   **Follows pattern:** Implements standard Express middleware for authentication.
*   **Touch points:** `app.js`, new files in `src/middleware/`, configuration in `.env`.

**Acceptance Criteria:**
1.  A new middleware for JWT validation is created in `src/middleware/auth.js`.
2.  The middleware uses a library like `jwks-rsa` to fetch the public key from the Keycloak instance's JWKS (JSON Web Key Set) URI to verify the token signature.
3.  The Keycloak issuer URL and audience for token validation are configurable via environment variables (e.g., `KEYCLOAK_ISSUER_URL`, `KEYCLOAK_AUDIENCE`).
4.  The authentication middleware is applied to all API routes under `/api/v1`.
5.  Requests with a valid JWT are allowed to proceed.
6.  Requests with no token, an invalid token, or an expired token are rejected with a `401 Unauthorized` error.
7.  The `/healthz` endpoint remains public and is not affected by the authentication middleware.
8.  All existing tests are updated to include a valid JWT in the request headers to pass.

**Technical Notes:**
*   **Integration Approach:** The middleware will be added globally to the Express app before the API router. It needs to be configured to dynamically fetch keys from the running Keycloak instance.
*   **Key Constraints:** The implementation must not rely on a hardcoded public key. It must correctly validate the token's signature, issuer, and audience.

**Status:** Ready for Dev
