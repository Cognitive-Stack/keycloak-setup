# A Pro Dev’s AI Weapons: BMAD-METHOD + Claude Task Master on Any Coding Agent

This guide mirrors my exact workflow for combining BMAD‑METHOD agents with Task Master to plan, generate, and implement a full Keycloak configuration. It uses an “ask → confirm by number” flow so you can blaze through decisions even when you don’t feel like typing.

References: [BMAD‑METHOD repo](https://github.com/bmad-code-org/BMAD-METHOD), [Claude Task Master repo](https://github.com/eyaltoledano/claude-task-master)

---

## Setup I used

- [BMAD‑METHOD](https://github.com/bmad-code-org/BMAD-METHOD) installed as command bundle with agent commands. Quick install:
```bash
npx bmad-method install
```
  For full instructions, see the BMAD User Guide in the repo’s docs.
- Gemini CLI using model `gemini-2.5-pro` for all agent interactions (you can use any coding agent; I happen to use Gemini CLI)
- Task Master enabled as an MCP server (not CLI) to parse PRDs, manage tasks, and perform research from the agent chat
- My repo context: `keycloak-config` that helps generate complex Keycloak configs. Readers do not need to care about Keycloak specifics—the workflow applies to any project.
- Model note: You can tell Task Master (from the agent tool) to use whichever AI model you have API keys for; configure models accordingly in your MCP setup.

---

## Step 1 — Analyst Mary (Mind Mapping + 10‑Step Numbered Confirmations)

Goal: Brainstorm how to enhance Keycloak config generation, fast.

Invoke Mary using the BMAD command in your coding agent (Gemini CLI in my case):
```
/analyst
```

Follow her guidance patiently to explore the problem space. Feed baseline assets so Mary understands the context (paste or attach files):
- `README.md` (current how‑to)
- `exports/myrealm-realm.json` (realm export if available)
- Any `docker run`/compose scripts you rely on

Example of how Mary proceeds each step:
1. “Choose focus area: (1) IdP setup, (2) Mappers, (3) User Profile, (4) Export/Import)”
2. “For IdP, pick providers to prioritize: (1) Google, (2) GitHub, (3) Microsoft, (4) All)”
3–10. Continue with mind‑map branches, always giving 3–6 numbered choices, confirming after each.

Deliverable: `brainstorming-session-results.md` — a summary of scope, priorities, risks, decisions, and gaps.

---

## Step 2 — Product Owner (PO) creates a PRD with 20+ sections

Invoke the Product Owner using the BMAD command:
```
/po
*create-prd based on brainstorming-session-results.md
```

The PO will ask you more than 20 questions covering assumptions, constraints, personas, IdP scope, RBAC model, data flows, SLAs, NFRs, risks, test strategy, rollout, etc. Follow his guidance and answer each question. If you're in a hurry, you can provide brief answers and let the PO fill in reasonable defaults.

Deliverable: A long, structured PRD (20+ sections), saved to the docs folder (e.g., `./docs/prd.txt`).

---

## Step 3 — Quick PRD self‑review

Skim the PRD to ensure it matches your vision. Adjust scope (e.g., turn off LinkedIn, keep Google/GitHub/Microsoft), confirm ports, env naming, and export/import expectations.

---

## Step 4 — Parse PRD into tasks with Task Master (MCP)

From your coding agent chat (with Task Master MCP available):
```
Initialize task-master-ai in my project
Parse my PRD at ./docs/prd.txt and generate tasks
```

Model setup note (Task Master via MCP): ask the agent to set the main/research/fallback models to providers for which you have valid API keys. You can change models any time.

Useful actions you can ask in chat:
```
What’s the next task I should work on?
Show me tasks 1, 3, and 5
Show task 2.1 in detail
```

---

## Step 5 — Architect: full‑stack architecture + project docs

Ask the Architect to generate system design and supporting docs:
```
/architect *create-full-stack-architecture
/architect *document-project
```

Expect: diagrams, components, interfaces, trust boundaries, NFRs, and deployment views aligned to your PRD.

---

## Step 6 — PM creates user stories

Prompt:
```
/pm *create-story
Generate user stories aligned with the PRD and architecture. Use numbered confirmations for each epic.
```

Deliverable: A clean set of user stories with acceptance criteria and test notes, cross‑referenced to tasks.

---

## Step 7 — Development with BMAD Dev + Task Master tasks

Switch to Dev:
```
/dev
*develop-story for next task
```

Typical outcomes:
- Keycloak Docker command or compose
- IdP entries (Google/GitHub/Microsoft) with correct discovery endpoints
- Mappers for email, names, avatar; user profile attributes (e.g., `avatar`)
- JWT validation sample API and RBAC guard examples
- Export/import scripts for realms

As you complete a story/task:
- BMAD updates the development record and story status
- Task Master updates the task it manages

---

## Step 8 — Manage progress with Task Master (MCP)

Drive the flow from your agent chat:
```
What’s the next task?
Set task 2.1 status to in‑progress
Generate task files for the current plan
```

Research when needed:
```
Research: Keycloak v26 mapper best practices for GitHub email
```

---

## Why this combo works

- Fast decisioning with numbered confirmations (great in low‑energy moments)
- Zero context loss: PRD → architecture → stories → tasks stay aligned
- Task Master’s parsing and research keeps docs and live work in sync

---

## Minimal setup notes

BMAD install (one‑command installer in project root):
```bash
npx bmad-method install
```

Use Gemini CLI with `gemini-2.5-pro` for agents, e.g.:
```bash
gemini --model gemini-2.5-pro
# Then run agent prompts like /analyst, /po, /architect, /pm, /dev in the session
```

Task Master via MCP: enable it in your agent environment, add your API keys, and instruct the agent to configure main/research/fallback models to match your keys.

Repos cited: [BMAD‑METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [Claude Task Master](https://github.com/eyaltoledano/claude-task-master)

---

## Ready to Transform Your Development Workflow?

This isn't just another AI tool tutorial—it's a complete paradigm shift in how we approach software development. By combining BMAD-METHOD's structured planning with Task Master's intelligent task management, you're not just coding faster; you're building better software with less cognitive overhead.

**What you've learned:**
- How to use AI agents for comprehensive project planning
- The power of numbered confirmations for rapid decision-making
- A workflow that eliminates context loss between planning and execution
- Real-world application with a complete Keycloak authentication system

**Your next steps:**
1. **Install both tools** using the setup instructions above
2. **Start with a simple project** to get familiar with the workflow
3. **Try the 8-step process** on your own project
4. **Share your results** with the community

**Have you tried this workflow?** I'd love to hear about your experience! Drop a comment below with:
- Which project you applied it to
- How much time it saved you
- Any challenges you faced
- Tips for other developers

The future of AI-assisted development is here, and it's more powerful than ever. Don't just read about it—experience it for yourself.

**Ready to revolutionize your development process?** Start with Step 1 and let Mary guide you through your first mind mapping session. Your future self will thank you.
