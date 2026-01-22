# Intelligent Agent Routing - User Guide

## 🎯 What Is It?

**Intelligent Routing** is an automatic agent selection system that analyzes your requests and automatically chooses the most appropriate specialist(s) **without you needing to explicitly mention** which agent to use.

## ✨ Benefits

### Before (Without Intelligent Routing)

```
You: "Add JWT authentication to the backend"
AI: *Generic response, without specialized expertise*

Or you needed to know:
You: "Use @security-auditor and @backend-specialist to add JWT"
```

### After (With Intelligent Routing)

```
You: "Add JWT authentication to the backend"
AI: 🤖 Applying @security-auditor + @backend-specialist...
     *Response with combined security and backend expertise*
```

**Result**: You always get specialized responses, automatically.

## 🚀 How to Use

### Basic Usage (Zero Configuration)

Simply ask your questions normally. The system automatically detects:

```markdown
You: "Create a dark mode button"
→ AI detects: Frontend
→ Auto-selects: @frontend-specialist
→ Responds: "🤖 Using @frontend-specialist..."

You: "Login is failing with 401 error"
→ AI detects: Debug
→ Auto-selects: @debugger
→ Responds: "🤖 Applying @debugger for systematic analysis..."

You: "Optimize database queries"
→ AI detects: Database + Performance
→ Auto-selects: @database-architect + @performance-optimizer
→ Responds: "🤖 Orchestrating @database-architect and @performance-optimizer..."
```

## 📊 Automatic Detection Matrix

| Your Intent | Keywords | Selected Agent(s) |
|-------------|----------|-------------------|
| **Authentication** | "login", "auth", "signup", "JWT" | `security-auditor` + `backend-specialist` |
| **UI Component** | "button", "component", "layout", "style" | `frontend-specialist` |
| **Mobile Screen** | "screen", "navigation", "touch", "gesture" | `mobile-developer` |
| **API** | "endpoint", "route", "API", "POST", "GET" | `backend-specialist` |
| **Database** | "schema", "migration", "query", "table" | `database-architect` |
| **Bug** | "error", "bug", "not working", "broken" | `debugger` |
| **Testing** | "test", "coverage", "unit", "e2e" | `test-engineer` |
| **Deploy** | "deploy", "production", "CI/CD", "docker" | `devops-engineer` |
| **Security** | "security", "vulnerability", "exploit" | `security-auditor` + `penetration-tester` |
| **Performance** | "slow", "optimize", "performance" | `performance-optimizer` |
| **Complex New Feature** | "build", "create app" | `orchestrator` (multi-agent) |

## 🎛️ Complexity Levels

### ✅ SIMPLE → Direct Agent

```
You: "Fix the login button style"
→ Simple task, 1 domain (Frontend)
→ Action: Invokes @frontend-specialist directly
```

### ⚠️ MODERATE → 2-3 Agents

```
You: "Add user profile endpoint"
→ 2 domains (Backend + Testing)
→ Action: Invokes @backend-specialist and @test-engineer
```

### 🔴 COMPLEX → Orchestrator

```
You: "Build a real-time chat app"
→ Multiple domains (Backend, Frontend, Real-time, Security)
→ Action: Invokes @orchestrator (coordinates multiple specialists)
→ First asks Socratic questions, then coordinates implementation
```

## 🎨 Common Use Cases

### 1. Frontend Development

```
"Create a landing page with dark theme"
→ @frontend-specialist

"Add scroll animations"
→ @frontend-specialist + @performance-optimizer
```

### 2. Backend Development

```
"Create image upload endpoint"
→ @backend-specialist

"Add rate limiting to API"
→ @backend-specialist + @security-auditor
```

### 3. Mobile

```
"Create onboarding screen in React Native app"
→ @mobile-developer

"Add gesture navigation"
→ @mobile-developer
```

### 4. Debugging

```
"App crashing on login"
→ @debugger

"Users reporting slowness"
→ @debugger + @performance-optimizer
```

### 5. Security

```
"Review auth system security"
→ @security-auditor

"Perform a full pentest"
→ @security-auditor + @penetration-tester
```

## 🔧 Advanced Features

### Manual Override

You can still explicitly mention agents:

```
You: "Use @backend-specialist to review this"
→ AI respects your explicit choice
→ Uses @backend-specialist (automatic override)
```

### Integration with /orchestrate

Intelligent routing **does not replace** the `/orchestrate` command, but makes it optional:

```bash
# Before (mandatory for complex tasks):
/orchestrate "Build a full e-commerce"

# After (optional, system detects automatically):
"Build a full e-commerce"
→ AI detects complexity automatically
→ Invokes orchestrator automatically
```

### Socratic Gate Still Active

Intelligent Routing **does not skip** the Socratic Gate:

```
You: "Build an app"
→ AI detects: Vague request
→ Action: First asks questions (Socratic Gate)
→ Then routes to appropriate agent
```

## 📈 Transparency

The AI always informs which expertise is being applied:

```markdown
🤖 **Applying `@security-auditor` expertise...**
[continues with specialized analysis]

or

🤖 **Orchestrating `@frontend-specialist` + `@backend-specialist`...**
[continues with multi-agent coordination]
```

**Why is this good?**

- ✅ You know what expertise is being used
- ✅ Decision-making transparency
- ✅ You can learn which agents exist
- ✅ Facilitates manual override if needed

## ❓ FAQ

### Q: Does this use more tokens?

**A:** Yes, but minimally (~50-100 tokens per request). The gain in accuracy outweighs it, and reduces tokens wasted on back-and-forth.

### Q: Can I disable it?

**A:** Yes! Just remove the "INTELLIGENT AGENT ROUTING" section from `GEMINI.md`. But we don't recommend it.

### Q: What if the AI chooses wrong?

**A:** You can explicitly override by mentioning the agent you prefer: "Use @[agent-name]..."

### Q: Does it work with `/` commands?

**A:** Yes! Commands like `/orchestrate`, `/debug`, etc. still work. Intelligent Routing is an additional layer that makes these commands optional for simple cases.

### Q: Do I need to memorize agent names?

**A:** No! That's exactly the advantage. You write in natural language and the system chooses automatically. If you want to know which agents exist, check `ARCHITECTURE.md`.

## 🔍 Debug Mode

If you want to see how the system is making decisions:

```markdown
# Temporarily add to GEMINI.md:

## DEBUG: Intelligent Routing

Show selection reasoning:
- Detected domains: [list]
- Selected agent: [name]
- Reasoning: [why]
```

## 🎯 Best Practices

1. **Be specific, but natural**: "Add JWT authentication" is better than just "auth"
2. **No need to mention agents**: The system detects automatically
3. **Use override when necessary**: If you know exactly which agent you want, mention explicitly
4. **Trust the system**: For 90% of cases, automatic routing chooses correctly

## 📚 References

- **Full Skill**: `.agent/skills/intelligent-routing/SKILL.md`
- **Configuration**: `.agent/rules/GEMINI.md` (TIER 0 section)
- **Available Agents**: `.agent/ARCHITECTURE.md`

---

**Summary**: Intelligent Routing transforms the Antigravity Kit from "you need to know which agents to use" to "just describe what you need and let the AI choose the right specialist".
