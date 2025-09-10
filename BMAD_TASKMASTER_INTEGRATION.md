# BMAD-METHOD + Claude Task Master Integration Guide

## Overview

This project demonstrates how to combine **BMAD-METHOD** (Breakthrough Method for Agile AI-Driven Development) with **Claude Task Master** to create a powerful AI-driven development workflow for Keycloak configuration and management.

## What is BMAD-METHOD?

BMAD-METHOD™ is a comprehensive AI-driven development framework that provides:

- **Agentic Planning**: Dedicated AI agents (Analyst, PM, Architect) collaborate to create detailed PRDs and Architecture documents
- **Context-Engineered Development**: Scrum Master agent transforms plans into hyper-detailed development stories
- **Specialized AI Agents**: Pre-built agents for different roles (Dev, QA, UX Expert, etc.)
- **Two-Phase Approach**: Eliminates planning inconsistency and context loss

## What is Claude Task Master?

Claude Task Master is a task management system for AI-driven development that provides:

- **Task Management**: Parse PRDs, generate tasks, and track progress
- **Research Capabilities**: Fresh information gathering with project context
- **MCP Integration**: Works seamlessly with Cursor, Windsurf, and VS Code
- **Multi-Model Support**: Works with various AI providers (Claude, OpenAI, Google, etc.)

## Combined Workflow

### Phase 1: Planning with BMAD-METHOD

1. **Analyst Agent** (`/analyst`): Creates comprehensive project briefs and requirements
2. **Product Manager Agent** (`/pm`): Develops detailed PRDs
3. **Architect Agent** (`/architect`): Creates technical architecture documents
4. **UX Expert Agent** (`/ux-expert`): Designs user experience flows

### Phase 2: Task Management with Claude Task Master

1. **Initialize Task Master**: Set up task management in your project
2. **Parse PRD**: Convert BMAD-generated PRD into actionable tasks
3. **Generate Tasks**: Create detailed, implementable development stories
4. **Track Progress**: Manage task lifecycle and dependencies

### Phase 3: Development with BMAD-METHOD

1. **Scrum Master Agent** (`/sm`): Creates detailed development stories
2. **Developer Agent** (`/dev`): Implements features with full context
3. **QA Agent** (`/qa`): Ensures quality and testing
4. **Task Master**: Tracks progress and manages task flow

## Setup Instructions

### 1. BMAD-METHOD Setup (Already Complete)

```bash
# BMAD-METHOD is already installed and configured
# Available agents: /analyst, /pm, /architect, /ux-expert, /sm, /dev, /qa
# Available tasks: /create-doc, /shard-doc, /create-next-story, etc.
```

### 2. Claude Task Master Setup

#### MCP Configuration (Already Complete)
The `.cursor/mcp.json` file is configured with Task Master MCP server.

#### Initialize Task Master
In Cursor AI chat, run:
```
Initialize taskmaster-ai in my project
```

#### Create PRD
Create a PRD at `.taskmaster/docs/prd.txt` based on your Keycloak project requirements.

### 3. API Keys Configuration

Update `.cursor/mcp.json` with your actual API keys:
- `ANTHROPIC_API_KEY`: For Claude models
- `PERPLEXITY_API_KEY`: For research capabilities
- `OPENAI_API_KEY`: For OpenAI models
- `GOOGLE_API_KEY`: For Google models

## Usage Examples

### Example 1: Planning a New Keycloak Feature

1. **Start with BMAD Analyst**:
   ```
   /analyst
   I need to plan a new Keycloak feature for custom user attributes management. 
   Please create a comprehensive brief.
   ```

2. **Create PRD with BMAD PM**:
   ```
   /pm
   Based on the analyst brief, create a detailed PRD for the custom user attributes feature.
   ```

3. **Generate Architecture with BMAD Architect**:
   ```
   /architect
   Design the technical architecture for the custom user attributes feature.
   ```

4. **Parse PRD with Task Master**:
   ```
   Parse my PRD at .taskmaster/docs/prd.txt and generate tasks
   ```

### Example 2: Implementing a Feature

1. **Create Development Story with BMAD SM**:
   ```
   /sm
   Create a detailed development story for implementing custom user attributes in Keycloak.
   ```

2. **Implement with BMAD Dev**:
   ```
   /dev
   Help me implement the custom user attributes feature based on the story.
   ```

3. **Track Progress with Task Master**:
   ```
   What's the next task I should work on?
   Show me tasks 1, 3, and 5
   ```

### Example 3: Research and Development

1. **Research with Task Master**:
   ```
   Research the latest Keycloak v26 best practices for custom user attributes
   ```

2. **Apply Research with BMAD Dev**:
   ```
   /dev
   Based on the research findings, help me implement the best practices for custom user attributes.
   ```

## Key Benefits of This Integration

### 1. **Comprehensive Planning**
- BMAD-METHOD provides detailed planning and architecture
- Task Master converts plans into actionable tasks

### 2. **Context Preservation**
- BMAD-METHOD maintains context through detailed stories
- Task Master tracks progress and dependencies

### 3. **Quality Assurance**
- BMAD-METHOD QA agent ensures code quality
- Task Master manages testing and validation tasks

### 4. **Research Integration**
- Task Master provides fresh, up-to-date information
- BMAD-METHOD applies research in context-aware development

### 5. **Flexible Workflow**
- Can start with either tool
- Seamless handoff between planning and execution
- Multiple AI models and providers supported

## Project Structure

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
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Next Steps

1. **Configure API Keys**: Update `.cursor/mcp.json` with your actual API keys
2. **Initialize Task Master**: Run the initialization command in Cursor
3. **Create PRD**: Develop a comprehensive PRD for your Keycloak project
4. **Start Planning**: Use BMAD-METHOD agents to plan your features
5. **Generate Tasks**: Use Task Master to convert plans into actionable tasks
6. **Begin Development**: Use BMAD-METHOD development agents to implement features

## Resources

- [BMAD-METHOD Documentation](https://github.com/bmad-code-org/BMAD-METHOD)
- [Claude Task Master Documentation](https://docs.task-master.dev)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Cursor AI Documentation](https://cursor.com/docs)

## Support

- BMAD-METHOD: [Discord Community](https://discord.gg/bmad)
- Claude Task Master: [Discord Community](https://discord.gg/taskmasterai)
- Keycloak: [Community Forum](https://keycloak.discourse.group/)
