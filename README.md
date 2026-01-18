# Antigravity Kit (Private Fork)

> **Version 2.0** - AI Agent templates with Skills, Agents, and Workflows

This is a private fork for personal use. Not intended for public distribution.

## What's Included

| Component | Count | Description |
|-----------|-------|-------------|
| **Agents** | 16 | Specialist AI personas (frontend, backend, security, etc.) |
| **Skills** | 40 | Domain-specific knowledge modules |
| **Workflows** | 11 | Slash command procedures |

## Structure

```
.agent/
├── agents/          # 16 Specialist Agents
├── skills/          # 40 Skills
├── workflows/       # 11 Slash Commands
├── rules/           # Workspace Rules
└── ARCHITECTURE.md  # Full documentation
```

## Usage

### Using Agents

Mention an agent by name to invoke specialized expertise:

```
Use the security-auditor agent to review authentication
Use the frontend-specialist to analyze React components
```

### Using Skills

Skills are loaded automatically based on task context. The AI reads skill descriptions and applies relevant knowledge.

### Using Workflows

Invoke workflows with slash commands:

| Command | Description |
|---------|-------------|
| `/brainstorm` | Explore options before implementation |
| `/create` | Create new features or apps |
| `/debug` | Systematic debugging |
| `/deploy` | Deploy application |
| `/enhance` | Improve existing code |
| `/orchestrate` | Multi-agent coordination |
| `/plan` | Create task breakdown |
| `/preview` | Preview changes locally |
| `/status` | Check project status |
| `/test` | Generate and run tests |
| `/ui-ux-pro-max` | Design with 50 styles |

Example:
```
/brainstorm authentication system
/create landing page with hero section
/debug why login fails
```

### Using Rules

Rules in `.agent/rules/` are automatically applied. The main configuration file is `GEMINI.md`.

## Documentation

See [ARCHITECTURE.md](.agent/ARCHITECTURE.md) for full documentation on agents, skills, and workflows.

## License

MIT - Originally by [Vudovn](https://github.com/vudovn)
