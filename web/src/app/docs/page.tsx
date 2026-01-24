import Link from "next/link";
import agents from '@/services/agents.json';
import skills from '@/services/skills.json';
import workflows from '@/services/workflows.json';

export default function DocsPage() {
    return (
        <div className="max-w-3xl">
            {/* Page Header */}
            <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    Documentation
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Welcome to the <span className="before:-inset-x-1 before:-rotate-1 relative z-4 before:pointer-events-none before:absolute before:inset-y-0 before:z-4 before:bg-linear-to-r before:from-blue-500 before:via-purple-500 before:to-orange-500 before:opacity-16 before:mix-blend-hard-light">
                        Antigravity Kit
                    </span> documentation.
                </p>
            </div>

            {/* What is Antigravity Kit */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    What is <span className="before:-inset-x-1 before:-rotate-1 relative z-4 before:pointer-events-none before:absolute before:inset-y-0 before:z-4 before:bg-linear-to-r before:from-blue-500 before:via-purple-500 before:to-orange-500 before:opacity-16 before:mix-blend-hard-light">
                        Antigravity Kit
                    </span> ?
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
                    <span className="before:-inset-x-1 before:-rotate-1 relative z-4 before:pointer-events-none before:absolute before:inset-y-0 before:z-4 before:bg-linear-to-r before:from-blue-500 before:via-purple-500 before:to-orange-500 before:opacity-16 before:mix-blend-hard-light">
                        Antigravity Kit
                    </span> is a comprehensive collection of AI Agent templates with Skills, Agents, and Workflows designed to supercharge AI coding assistants for{" "}
                    <a
                        href="https://antigravity.google/t"
                        className="text-zinc-900 dark:text-zinc-50 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-900 dark:hover:decoration-zinc-50 transition-colors"
                    >
                        Antigravity
                    </a>.
                </p>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
                    Whether you're an individual developer or part of a larger team, Antigravity Kit helps you build better software faster with 40+ skills, 16 specialist agents, and 11 production-ready workflows.
                </p>
            </section>

            {/* What's Included */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    What's Included
                </h2>
                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{agents.length}+</div>
                        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Specialist Agents</div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                            Domain experts for frontend, backend, security, and more
                        </p>
                    </div>
                    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{skills.length}+</div>
                        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Domain Skills</div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                            Knowledge modules for React, Next.js, testing, and more
                        </p>
                    </div>
                    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{workflows.length}+</div>
                        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Workflows</div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                            Slash command procedures for common dev tasks
                        </p>
                    </div>
                </div>
            </section>

            {/* How to Use the Docs */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    How to Use the Docs
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
                    The docs are organized into 3 main sections:
                </p>
                <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <Link href="/docs/installation" className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline">
                            Getting Started
                        </Link>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Quick installation and setup guide to get you started
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <Link href="/docs/agents" className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline">
                            Core Concepts
                        </Link>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Learn about Agents, Skills, and Workflows
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <Link href="/docs/cli" className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline">
                            CLI Reference
                        </Link>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Detailed command-line interface documentation
                        </p>
                    </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Use the sidebar to navigate through sections, or use <kbd className="px-2 py-1 text-xs font-mono rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">Ctrl+K</kbd> to quickly search.
                </p>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    Next Steps
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                        href="/docs/installation"
                        className="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Installation →</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Get started with Antigravity Kit in under a minute
                        </p>
                    </Link>
                    <Link
                        href="/docs/agents"
                        className="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Learn Core Concepts →</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Understand how Agents, Skills, and Workflows work
                        </p>
                    </Link>
                </div>
            </section>

            {/* Footer Navigation */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="text-sm text-zinc-500 dark:text-zinc-500">
                    Getting Started
                </div>
                <Link
                    href="/docs/installation"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline flex items-center gap-1"
                >
                    Installation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
