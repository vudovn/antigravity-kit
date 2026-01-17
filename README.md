# Antigravity Kit

> **Version 2.0** - AI Agent templates with Skills, Agents, and Workflows

## Quick Install

```bash
npx @vudovn/ag-kit init
```

Or install globally:

```bash
npm install -g @vudovn/ag-kit
ag-kit init
```

This installs the `.agent` folder containing all templates into your project.

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

## CLI Tool

| Command | Description |
|---------|-------------|
| `ag-kit init` | Install `.agent` folder into your project |
| `ag-kit update` | Update to the latest version |
| `ag-kit status` | Check installation status |

### Options

```bash
ag-kit init --force        # Overwrite existing .agent folder
ag-kit init --path ./myapp # Install in specific directory
ag-kit init --branch dev   # Use specific branch
ag-kit init --quiet        # Suppress output (for CI/CD)
ag-kit init --dry-run      # Preview actions without executing
```

## Documentation

See [ARCHITECTURE.md](.agent/ARCHITECTURE.md) for full documentation on agents, skills, and workflows.

## Buy me coffee

<p align="center">
  <a href="https://buymeacoffee.com/vudovn">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee" />
  </a>
</p>

## License

MIT © Vudovn
