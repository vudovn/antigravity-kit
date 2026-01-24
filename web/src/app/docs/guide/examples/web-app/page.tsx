import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { Lightbulb, Palette, Settings, Database, FlaskConical, CheckCircle2, XCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Example: Create Web App | Antigravity Kit",
    description: "Step-by-step guide on creating a web application using Antigravity Kit workflows and agents.",
};

export default function WebAppExamplePage() {
    return (
        <article className="prose prose-zinc dark:prose-invert max-w-none">
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                Create a Web Application
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Learn how to build a full-stack web app using Antigravity Kit workflows and agents
            </p>

            {/* Introduction */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Overview
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    This guide demonstrates how to use Antigravity Kit to create a complete web application from scratch.
                    You&apos;ll learn how to leverage workflows like <code>/create</code>, <code>/plan</code>, and <code>/deploy </code>
                    along with specialized agents to build production-ready applications.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-900 dark:text-blue-100 mb-0 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
                        <span><strong>What you&apos;ll build:</strong> A modern blog application with Next.js, featuring posts, categories, authentication, and a beautiful UI.</span>
                    </p>
                </div>
            </section>

            {/* Step 1: Planning */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Step 1: Project Planning
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    Start by using the <code>/plan</code> workflow to create a comprehensive project plan:
                </p>
                <CodeBlock code={`/plan Create a blog application with Next.js

Features needed:
- Prisma SQL Lite
- User authentication
- Post management (CRUD)
- Categories and tags
- Rich text editor
- SEO optimization
- Responsive design`} className="mb-4" />
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    The <strong>project-planner</strong> agent will:
                </p>
                <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-2">
                    <li>Ask clarifying questions through Socratic Gate</li>
                    <li>Analyze requirements and suggest tech stack</li>
                    <li>Create a detailed implementation plan</li>
                    <li>Break down tasks into manageable chunks</li>
                </ul>
            </section>

            {/* Step 2: Creation */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Step 2: Create the Application
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    Once the plan is approved, use the <code>/create</code> workflow:
                </p>
                <CodeBlock code={`/create blog application with the approved plan`} className="mb-4" />
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    The <strong>app-builder</strong> skill will orchestrate multiple specialist agents:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2 flex items-center gap-2">
                            <span className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                                <Palette className="w-4 h-4" />
                            </span>
                            Frontend Specialist
                        </h4>
                        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-0">
                            <li>• UI/UX design with <code>frontend-design</code></li>
                            <li>• React patterns and hooks</li>
                            <li>• Tailwind CSS styling</li>
                            <li>• SEO optimization</li>
                        </ul>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2 flex items-center gap-2">
                            <span className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                                <Settings className="w-4 h-4" />
                            </span>
                            Backend Specialist
                        </h4>
                        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-0">
                            <li>• API design with <code>api-patterns</code></li>
                            <li>• Authentication setup</li>
                            <li>• Business logic implementation</li>
                        </ul>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2 flex items-center gap-2">
                            <span className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                                <Database className="w-4 h-4" />
                            </span>
                            Database Architect
                        </h4>
                        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-0">
                            <li>• Schema design</li>
                            <li>• Prisma setup and migrations</li>
                            <li>• Indexing and optimization</li>
                        </ul>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2 flex items-center gap-2">
                            <span className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                                <FlaskConical className="w-4 h-4" />
                            </span>
                            Test Engineer
                        </h4>
                        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 mb-0">
                            <li>• Unit tests for components</li>
                            <li>• Integration tests for API</li>
                            <li>• E2E tests with Playwright</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Step 3: Testing */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Step 3: Test Your Application
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    Run comprehensive tests before deployment:
                </p>
                <CodeBlock code={`/test Run all tests for the blog application`} className="mb-4" />
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    Or use the final checklist for comprehensive validation:
                </p>
                <CodeBlock code={`final checks`} className="mb-4" />
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    This runs 12 automated scripts checking:
                </p>
                <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1">
                    <li>Security vulnerabilities</li>
                    <li>Code linting and formatting</li>
                    <li>Database schema validation</li>
                    <li>UX and accessibility</li>
                    <li>SEO optimization</li>
                    <li>Performance (Lighthouse)</li>
                </ul>
            </section>

            {/* Step 4: Deployment */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Step 4: Deploy to Production
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    When ready, use the deployment workflow:
                </p>
                <CodeBlock code={`/deploy`} className="mb-4" />
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    The <strong>devops-engineer</strong> agent will:
                </p>
                <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1">
                    <li>Run pre-flight checks</li>
                    <li>Verify environment variables</li>
                    <li>Build production bundle</li>
                    <li>Guide you through deployment to Vercel/other platforms</li>
                </ul>
            </section>

            {/* Best Practices */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Best Practices
                </h2>
                <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            DO: Start with Planning
                        </h4>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-0">
                            Always use <code>/brainstorm</code> or <code>/plan</code> for complex features.
                            This prevents costly refactoring later.
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            DO: Leverage Specialized Agents
                        </h4>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-0">
                            Let the orchestrator route tasks to the right expert (frontend-specialist, backend-specialist, etc.)
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            DO: Run Final Checks
                        </h4>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-0">
                            Use &quot;final checks&quot; before every deployment to catch issues early.
                        </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            DON&apos;T: Skip the Socratic Gate
                        </h4>
                        <p className="text-sm text-red-800 dark:text-red-200 mb-0">
                            Answer clarifying questions thoroughly. They ensure the AI understands your requirements.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Next Steps
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    Now that you understand the workflow, try building your own app:
                </p>
                <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 space-y-2 mb-0">
                    <li>Explore the <a href="/docs/agents" className="text-blue-600 dark:text-blue-400 hover:underline">Agents documentation</a> to learn about each specialist</li>
                    <li>Check <a href="/docs/skills" className="text-blue-600 dark:text-blue-400 hover:underline">Skills</a> to see available knowledge modules</li>
                    <li>Review <a href="/docs/workflows" className="text-blue-600 dark:text-blue-400 hover:underline">Workflows</a> for all slash commands</li>
                </ul>
            </section>
        </article>
    );
}
