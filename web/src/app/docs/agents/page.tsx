import Link from "next/link";
import { Lightbulb } from "lucide-react";
import agentsData from "@/services/agents.json";

export default function AgentsPage() {
    const agents = agentsData;

    return (
        <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-50">Docs</Link>
                <span>/</span>
                <span className="text-zinc-900 dark:text-zinc-50">Agents</span>
            </nav>

            {/* Page Header */}
            <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    Agents
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Specialist AI personas with deep expertise in specific domains.
                </p>
            </div>

            {/* What are Agents */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    What are Agents?
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
                    Agents are specialist AI personas configured with domain-specific expertise, tools, and behavioral patterns. Each agent is designed to excel in a particular area of software development.
                </p>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
                    When you make a request, Antigravity Kit's <strong>Intelligent Routing</strong> system automatically detects which agents are needed and activates them for you. You can also mention them by name to force a specific perspective.
                </p>
            </section>

            {/* How to Use */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    How to Use Agents
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
                    <strong>No need to mention agents explicitly!</strong> The system automatically detects and applies the right specialist(s) based on your request.
                </p>

                <div className="relative group mb-6">
                    <pre className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 overflow-x-auto border border-zinc-800 font-mono text-sm">
                        <code className="text-zinc-100">{`You: "Add JWT authentication"
AI: 🤖 Applying @security-auditor + @backend-specialist...

You: "Fix the dark mode button"
AI: 🤖 Using @frontend-specialist...

You: "Login returns 500 error"
AI: 🤖 Using @debugger for systematic analysis...`}</code>
                    </pre>
                </div>

                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
                    However, you <strong>can still override</strong> this behavior by explicitly mentioning an agent name:
                </p>

                <div className="relative group mb-6">
                    <pre className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 overflow-x-auto border border-zinc-800 font-mono text-sm">
                        <code className="text-zinc-100">{`Use the security-auditor agent to review authentication...`}</code>
                    </pre>
                </div>

                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 mb-6">
                    <p className="text-sm text-blue-900 dark:text-blue-200">
                        <Lightbulb className="w-4 h-4 inline" />
                        <strong className="font-semibold">Tip:</strong> Agents can work together! Use the <code className="px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 font-mono text-xs">orchestrator</code> agent to coordinate multiple specialists on complex tasks.
                    </p>
                </div>
            </section>

            {/* Available Agents */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    Available Agents
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
                    Antigravity Kit includes {agents.length} specialist agents:
                </p>

                <div className="space-y-4">
                    {agents.map((agent) => (
                        <div
                            key={agent.name}
                            className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                        >
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <code className="text-base font-mono font-semibold text-zinc-900 dark:text-zinc-50">
                                    {agent.name}
                                </code>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {agent.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Agent Structure */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    Agent Structure
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
                    Each agent is defined by a markdown file with YAML frontmatter:
                </p>

                <div className="relative group mb-6">
                    <pre className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 overflow-x-auto border border-zinc-800 font-mono text-sm">
                        <code className="text-zinc-100">{`---
name: frontend-specialist
description: Frontend architect expert
tools: Read, Edit, Write, Bash
skills: react-patterns, nextjs-best-practices
---

# Frontend Specialist

You are a senior frontend architect...`}</code>
                    </pre>
                </div>

                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    The <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono">skills</code> field determines which domain knowledge modules the agent can access.
                </p>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    Next Steps
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                        href="/docs/skills"
                        className="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                    >
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Skills →</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Learn about domain-specific knowledge modules
                        </p>
                    </Link>
                    <Link
                        href="/docs/workflows"
                        className="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                    >
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Workflows →</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Explore slash command procedures
                        </p>
                    </Link>
                </div>
            </section>

            {/* Footer Navigation */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <Link
                    href="/docs/installation"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Installation
                </Link>
                <Link
                    href="/docs/skills"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline flex items-center gap-1"
                >
                    Skills
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
