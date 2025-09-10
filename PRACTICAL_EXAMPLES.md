# Practical Examples: BMAD-METHOD + Claude Task Master Integration

## Example 1: Setting Up Google OAuth Integration

### Step 1: Planning with BMAD-METHOD

#### Analyst Brief
```
/analyst
I need to integrate Google OAuth with Keycloak for a web application. 
The application needs to support user registration and login through Google accounts.
Please create a comprehensive brief covering security, user experience, and technical requirements.
```

**Output**: Detailed brief covering:
- Security considerations for OAuth integration
- User experience flow for Google login
- Technical requirements and constraints
- Risk assessment and mitigation strategies

#### PRD Creation
```
/pm
Based on the analyst brief, create a detailed PRD for Google OAuth integration with Keycloak.
Include user stories, acceptance criteria, and technical specifications.
```

**Output**: Comprehensive PRD with:
- User stories for Google login flow
- Acceptance criteria for each story
- Technical specifications
- Security requirements
- Testing scenarios

#### Architecture Design
```
/architect
Design the technical architecture for Google OAuth integration with Keycloak.
Include system components, data flow, and security considerations.
```

**Output**: Technical architecture including:
- System component diagram
- OAuth flow sequence diagram
- Security architecture
- Data flow specifications
- Deployment considerations

### Step 2: Task Management with Claude Task Master

#### Initialize Task Master
```
Initialize taskmaster-ai in my project
```

#### Parse PRD
```
Parse my PRD at .taskmaster/docs/prd.txt and generate tasks
```

**Generated Tasks**:
1. Set up Google Cloud Console project
2. Configure OAuth consent screen
3. Create OAuth client credentials
4. Configure Keycloak Google identity provider
5. Set up attribute mapping
6. Test Google login flow
7. Implement error handling
8. Create documentation

#### Task Execution
```
What's the next task I should work on?
Show me task 1 in detail
```

### Step 3: Development with BMAD-METHOD

#### Story Creation
```
/sm
Create a detailed development story for implementing Google OAuth integration in Keycloak.
Include step-by-step implementation instructions and code examples.
```

**Output**: Detailed development story with:
- Complete implementation context
- Step-by-step instructions
- Code examples and configurations
- Testing scenarios
- Troubleshooting guide

#### Implementation
```
/dev
Help me implement the Google OAuth integration based on the story.
Start with the Google Cloud Console setup.
```

**Output**: Complete implementation including:
- Google Cloud Console configuration
- Keycloak identity provider setup
- Attribute mapping configuration
- Testing scripts
- Documentation

## Example 2: Custom User Attributes Management

### Step 1: Research with Task Master
```
Research the latest Keycloak v26 best practices for custom user attributes management
```

**Output**: Fresh research including:
- New features in Keycloak v26
- Best practices for custom attributes
- Performance considerations
- Security implications

### Step 2: Planning with BMAD-METHOD
```
/analyst
Based on the research findings, create a brief for implementing custom user attributes in Keycloak.
Focus on user profile management and attribute validation.
```

**Output**: Comprehensive brief covering:
- User attribute requirements
- Validation rules
- User interface considerations
- Data migration strategies

### Step 3: Architecture with BMAD-METHOD
```
/architect
Design the architecture for custom user attributes management in Keycloak.
Include user profile configuration, validation, and API integration.
```

**Output**: Technical architecture with:
- User profile configuration
- Attribute validation framework
- API integration design
- Database schema considerations

### Step 4: Task Generation with Task Master
```
Parse my updated PRD and generate tasks for custom user attributes implementation
```

**Generated Tasks**:
1. Configure user profile in Keycloak
2. Create custom attribute definitions
3. Implement attribute validation
4. Create user management API
5. Build user interface components
6. Implement data migration
7. Create comprehensive tests
8. Update documentation

## Example 3: JWT Token Validation System

### Step 1: Planning with BMAD-METHOD
```
/pm
Create a PRD for implementing JWT token validation in a Node.js API.
The system should validate tokens from Keycloak and provide role-based access control.
```

**Output**: Detailed PRD with:
- JWT validation requirements
- Role-based access control specifications
- API endpoint definitions
- Security considerations
- Performance requirements

### Step 2: Research with Task Master
```
Research the latest JWT validation best practices for Node.js with Keycloak integration
```

**Output**: Current best practices including:
- JWT validation libraries
- Security considerations
- Performance optimizations
- Error handling strategies

### Step 3: Development with BMAD-METHOD
```
/sm
Create a development story for implementing JWT token validation in Node.js.
Include middleware setup, role checking, and error handling.
```

**Output**: Detailed development story with:
- Middleware implementation
- Role-based access control
- Error handling strategies
- Testing scenarios
- Performance considerations

### Step 4: Implementation with BMAD-METHOD
```
/dev
Help me implement the JWT token validation middleware based on the story.
Start with the basic middleware setup.
```

**Output**: Complete implementation including:
- JWT validation middleware
- Role-based access control
- Error handling
- Testing setup
- Documentation

## Example 4: Multi-Provider OAuth Setup

### Step 1: Comprehensive Planning
```
/analyst
Create a comprehensive brief for implementing multi-provider OAuth with Keycloak.
Include Google, GitHub, Microsoft, and LinkedIn integration.
```

**Output**: Detailed brief covering:
- Multi-provider architecture
- User experience considerations
- Security implications
- Performance requirements
- Maintenance considerations

### Step 2: Architecture Design
```
/architect
Design the architecture for multi-provider OAuth integration.
Include provider configuration, user mapping, and conflict resolution.
```

**Output**: Technical architecture with:
- Provider configuration management
- User identity mapping
- Conflict resolution strategies
- Performance optimization
- Monitoring and logging

### Step 3: Task Management
```
Parse my PRD and generate tasks for multi-provider OAuth implementation
```

**Generated Tasks**:
1. Set up Google OAuth provider
2. Configure GitHub OAuth provider
3. Set up Microsoft OAuth provider
4. Configure LinkedIn OAuth provider
5. Implement user identity mapping
6. Create conflict resolution logic
7. Implement provider selection UI
8. Create comprehensive tests
9. Set up monitoring and logging
10. Create deployment documentation

### Step 4: Iterative Development
```
/sm
Create a development story for implementing Google OAuth provider configuration.
```

```
/dev
Help me implement the Google OAuth provider configuration.
```

```
What's the next task I should work on?
```

## Example 5: Automated Testing Suite

### Step 1: Planning with BMAD-METHOD
```
/qa
Create a comprehensive testing strategy for the Keycloak authentication system.
Include unit tests, integration tests, and end-to-end tests.
```

**Output**: Testing strategy with:
- Test coverage requirements
- Testing frameworks and tools
- Test data management
- CI/CD integration
- Performance testing

### Step 2: Task Generation
```
Parse my testing PRD and generate tasks for implementing the testing suite
```

**Generated Tasks**:
1. Set up testing framework
2. Create unit tests for OAuth providers
3. Implement integration tests
4. Create end-to-end tests
5. Set up test data management
6. Implement CI/CD integration
7. Create performance tests
8. Set up test reporting
9. Create test documentation

### Step 3: Implementation
```
/dev
Help me implement the testing framework for the Keycloak system.
Start with the basic test setup.
```

**Output**: Complete testing implementation including:
- Test framework configuration
- Unit test examples
- Integration test setup
- End-to-end test scenarios
- CI/CD configuration
- Test reporting setup

## Best Practices from Examples

### 1. **Start with Research**
Always begin with Task Master research to get the latest information and best practices.

### 2. **Plan Comprehensively**
Use BMAD-METHOD agents to create detailed plans before starting implementation.

### 3. **Generate Actionable Tasks**
Use Task Master to convert plans into specific, implementable tasks.

### 4. **Iterate and Refine**
Use both tools iteratively to refine and improve your implementation.

### 5. **Maintain Context**
Keep your PRD and architecture documents updated as the project evolves.

### 6. **Test Continuously**
Use the QA agent from BMAD-METHOD to ensure comprehensive testing coverage.

## Common Patterns

### Pattern 1: Research → Plan → Implement
1. Research with Task Master
2. Plan with BMAD-METHOD
3. Generate tasks with Task Master
4. Implement with BMAD-METHOD

### Pattern 2: Plan → Research → Refine → Implement
1. Initial planning with BMAD-METHOD
2. Research with Task Master
3. Refine plans with BMAD-METHOD
4. Generate tasks with Task Master
5. Implement with BMAD-METHOD

### Pattern 3: Iterative Development
1. Create story with BMAD-METHOD
2. Implement with BMAD-METHOD
3. Track progress with Task Master
4. Research improvements with Task Master
5. Refine implementation with BMAD-METHOD

## Troubleshooting Common Issues

### Issue 1: Context Loss Between Tools
**Solution**: Maintain detailed PRD and architecture documents that both tools can reference.

### Issue 2: Task Granularity
**Solution**: Use BMAD-METHOD to create detailed stories that Task Master can break down into specific tasks.

### Issue 3: Research Integration
**Solution**: Regularly use Task Master research and integrate findings into BMAD-METHOD planning.

### Issue 4: Quality Assurance
**Solution**: Use the QA agent from BMAD-METHOD in conjunction with Task Master testing tasks.

## Conclusion

These examples demonstrate the power of combining BMAD-METHOD and Claude Task Master for real-world development scenarios. The key is to leverage the strengths of both tools:

- **BMAD-METHOD**: Comprehensive planning and context-rich development
- **Claude Task Master**: Intelligent task management and research capabilities

By following these patterns and best practices, you can achieve faster, higher-quality development with better project outcomes.
