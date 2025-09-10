# Keycloak Authentication System with AI-Driven Development

A comprehensive Keycloak-based authentication system developed using **BMAD-METHOD** and **Claude Task Master** - demonstrating the power of AI-driven development workflows.

## 🚀 Project Overview

This project showcases how to combine two powerful AI development tools:
- **[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)**: Breakthrough Method for Agile AI-Driven Development
- **[Claude Task Master](https://github.com/eyaltoledano/claude-task-master)**: Task management system for AI-driven development

## 📋 Features

- **Multi-Provider OAuth**: Google, GitHub, and Microsoft authentication
- **JWT Token Management**: Secure API authentication
- **User Profile Management**: Custom attributes and avatar support
- **Role-Based Access Control**: Admin, User, and Guest roles
- **Docker Deployment**: Easy containerized setup
- **Export/Import**: Realm configuration management
- **Comprehensive Testing**: Unit, integration, and E2E tests

## 🛠️ AI Development Tools Integration

### BMAD-METHOD Agents
- **Analyst** (`/analyst`): Project planning and requirements analysis
- **Product Manager** (`/pm`): PRD creation and product strategy
- **Architect** (`/architect`): Technical architecture design
- **Scrum Master** (`/sm`): Development story creation
- **Developer** (`/dev`): Code implementation with full context
- **QA** (`/qa`): Quality assurance and testing

### Claude Task Master
- **Task Management**: Parse PRDs and generate actionable tasks
- **Progress Tracking**: Manage task lifecycle and dependencies
- **Research Integration**: Fresh information gathering
- **MCP Integration**: Seamless Cursor IDE integration

## 📚 Documentation

- **[Integration Guide](BMAD_TASKMASTER_INTEGRATION.md)**: How to use both tools together
- **[Medium Article](MEDIUM_ARTICLE.md)**: Comprehensive article about the integration
- **[Practical Examples](PRACTICAL_EXAMPLES.md)**: Real-world usage examples
- **[PRD](.taskmaster/docs/prd.txt)**: Complete Product Requirements Document

## 🚀 Quick Start

### Prerequisites
- Docker installed
- Node.js v20+
- Cursor IDE (or VS Code/Windsurf)
- API keys for OAuth providers

### 1. Clone and Setup
```bash
git clone <your-repo>
cd keycloak-config
npm install
```

### 2. Configure AI Tools

#### BMAD-METHOD (Already Installed)
```bash
# BMAD-METHOD is already configured
# Available agents: /analyst, /pm, /architect, /sm, /dev, /qa
```

#### Claude Task Master
Update `.cursor/mcp.json` with your API keys:
```json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "your-key-here",
        "PERPLEXITY_API_KEY": "your-key-here"
      }
    }
  }
}
```

### 3. Initialize Task Master
In Cursor AI chat:
```
Initialize taskmaster-ai in my project
```

### 4. Start Keycloak
```bash
npm run keycloak:start
```

Open admin console: `http://localhost:8099/admin`

## 🔧 Development Workflow

### Phase 1: Planning with BMAD-METHOD
1. **Analyst Brief**: `/analyst` - Create comprehensive project brief
2. **PRD Creation**: `/pm` - Develop detailed Product Requirements Document
3. **Architecture Design**: `/architect` - Design technical architecture

### Phase 2: Task Management with Claude Task Master
1. **Parse PRD**: Convert requirements into actionable tasks
2. **Generate Tasks**: Create detailed, implementable development stories
3. **Track Progress**: Manage task lifecycle and dependencies

### Phase 3: Development with BMAD-METHOD
1. **Story Creation**: `/sm` - Create detailed development stories
2. **Implementation**: `/dev` - Implement features with full context
3. **Quality Assurance**: `/qa` - Ensure quality and testing

## 📖 Keycloak Configuration

### Basic Setup
```bash
# Run Keycloak locally
docker run --name keycloak -p 8099:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.3.2 \
  start-dev
```

### OAuth Provider Setup

#### Google OAuth
1. Create OAuth client in Google Cloud Console
2. Add OpenID Connect provider in Keycloak
3. Configure attribute mapping

#### GitHub OAuth
1. Create OAuth app in GitHub
2. Add GitHub provider in Keycloak
3. Set up username and email mapping

#### Microsoft OAuth
1. Register app in Azure
2. Add OpenID Connect provider in Keycloak
3. Configure user attribute mapping

### JWT Token Validation
```javascript
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'http://localhost:8099/realms/myrealm/protocol/openid-connect/certs',
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  }),
  audience: 'node-api-client',
  issuer: 'http://localhost:8099/realms/myrealm',
  algorithms: ['RS256'],
});
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:integration
```

### End-to-End Tests
```bash
npm run test:e2e
```

## 📊 Project Structure

```
keycloak-config/
├── .bmad-core/                 # BMAD-METHOD framework
├── .claude-task-master/        # Task Master framework
├── .cursor/                    # Cursor configuration
│   └── mcp.json               # MCP server configuration
├── .taskmaster/               # Task Master project files
│   └── docs/
│       └── prd.txt           # Product Requirements Document
├── exports/                   # Keycloak realm exports
├── data/                      # Keycloak data
├── mock_service/              # Mock API service
├── package.json              # Project dependencies
├── README.md                 # This file
├── BMAD_TASKMASTER_INTEGRATION.md
├── MEDIUM_ARTICLE.md
└── PRACTICAL_EXAMPLES.md
```

## 🔑 API Keys Configuration

### Required API Keys
- **Anthropic API Key**: For Claude models
- **Perplexity API Key**: For research capabilities
- **Google OAuth**: For Google login
- **GitHub OAuth**: For GitHub login
- **Microsoft OAuth**: For Microsoft login

### Environment Variables
```bash
# OAuth Provider Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

## 🚀 Deployment

### Docker Compose
```bash
docker-compose up -d
```

### Kubernetes
```bash
kubectl apply -f k8s/
```

### Production Considerations
- Use environment-specific configurations
- Implement proper secret management
- Set up monitoring and logging
- Configure backup procedures

## 📈 Performance Metrics

- **Login Response Time**: < 2 seconds
- **API Response Time**: < 500ms
- **Token Validation**: < 100ms
- **System Uptime**: > 99.9%

## 🔒 Security Features

- **HTTPS Enforcement**: All communications encrypted
- **JWT Token Security**: Secure token generation and validation
- **OAuth Security**: Best practices implementation
- **Account Lockout**: Protection against brute force attacks
- **Session Management**: Secure session handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Use BMAD-METHOD for planning and development
4. Use Claude Task Master for task management
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) for the comprehensive AI development framework
- [Claude Task Master](https://github.com/eyaltoledano/claude-task-master) for intelligent task management
- [Keycloak](https://www.keycloak.org/) for the robust authentication platform

## 📞 Support

- **BMAD-METHOD**: [Discord Community](https://discord.gg/bmad)
- **Claude Task Master**: [Discord Community](https://discord.gg/taskmasterai)
- **Keycloak**: [Community Forum](https://keycloak.discourse.group/)

---

*This project demonstrates the power of combining AI-driven development tools for creating robust, scalable authentication systems. The integration of BMAD-METHOD and Claude Task Master provides a comprehensive development experience that accelerates project delivery while maintaining high quality standards.*
