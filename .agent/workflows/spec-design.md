---
description: Create comprehensive technical design for a specification
allowed-tools: Glob, Grep, Read, Write, Edit, WebSearch, WebFetch
argument-hint: <feature-name> [-y]
---

# Technical Design Generator

<background_information>
- **Mission**: Generate comprehensive technical design document that translates requirements (WHAT) into architectural design (HOW)
- **Success Criteria**:
  - All requirements mapped to technical components with clear interfaces
  - Appropriate architecture discovery and research completed
  - Design aligns with steering context and existing patterns
  - Visual diagrams included for complex architectures
</background_information>

<instructions>
## Core Task
Generate technical design document for feature **$ARGUMENTS** based on approved requirements.

## Execution Steps

### Step 1: Load Context

**Read all necessary context**:
- `.specs/$ARGUMENTS/spec.json`, `requirements.md`, `design.md` (if exists)
- **Entire `.specs/steering/` directory** for complete project memory (if exists)
- `.agent/skills/spec-driven-development/templates/design.md` for document structure
- `.agent/skills/spec-driven-development/rules/design-principles.md` for design principles
- `.agent/skills/spec-driven-development/templates/research.md` for discovery log structure

**Validate requirements approval**:
- If `-y` flag provided: Auto-approve requirements in spec.json
- Otherwise: Verify approval status (stop if unapproved, see Safety & Fallback)

### Step 2: Discovery & Analysis

**Critical: This phase ensures design is based on complete, accurate information.**

1. **Classify Feature Type**:
   - **New Feature** (greenfield) → Full discovery required
   - **Extension** (existing system) → Integration-focused discovery
   - **Simple Addition** (CRUD/UI) → Minimal or no discovery
   - **Complex Integration** → Comprehensive analysis required

2. **Execute Appropriate Discovery Process**:
   
   **For Complex/New Features**:
   - Read and execute `.agent/skills/spec-driven-development/rules/design-discovery-full.md`
   - Conduct thorough research using WebSearch/WebFetch:
     - Latest architectural patterns and best practices
     - External dependency verification (APIs, libraries, versions, compatibility)
     - Official documentation, migration guides, known issues
     - Performance benchmarks and security considerations
   
   **For Extensions**:
   - Read and execute `.agent/skills/spec-driven-development/rules/design-discovery-light.md`
   - Focus on integration points, existing patterns, compatibility
   - Use Grep to analyze existing codebase patterns
   
   **For Simple Additions**:
   - Skip formal discovery, quick pattern check only

3. **Retain Discovery Findings for Step 3**:
   - External API contracts and constraints
   - Technology decisions with rationale
   - Existing patterns to follow or extend
   - Integration points and dependencies
   - Identified risks and mitigation strategies
   - Potential architecture patterns and boundary options
   - Parallelization considerations for future tasks

4. **Persist Findings to Research Log**:
   - Create or update `.specs/$ARGUMENTS/research.md` using the shared template
   - Summarize discovery scope and key findings (Summary section)
   - Record investigations in Research Log topics with sources and implications
   - Document architecture pattern evaluation, design decisions, and risks
   - Use the language specified in spec.json

### Step 3: Generate Design Document

1. **Load Design Template and Rules**:
   - Read `.agent/skills/spec-driven-development/templates/design.md` for structure
   - Read `.agent/skills/spec-driven-development/rules/design-principles.md` for principles

2. **Generate Design Document**:
   - **Follow template structure strictly**
   - **Integrate all discovery findings**: Use researched information throughout component definitions
   - If existing design.md found, use it as reference context (merge mode)
   - Apply design rules: Type Safety, Visual Communication, Formal Tone
   - Use language specified in spec.json
   - Include Mermaid diagrams for architecture visualization

3. **Required Sections & Detail Level** (CRITICAL):

   **Verbosity Guideline**: Aim for high detail. Do not summarize if detail is available. Use full sentences and comprehensive lists. If a section seems simple, expand on *why* it's simple and what alternate options were rejected.

   | Section | Requirement | Instructions |
   |---------|-------------|--------------|
   | **Overview** | ✅ Mandatory | Include detailed Purpose, Users, Impact, Goals (3+), Non-Goals (3+) |
   | **Architecture** | ✅ Mandatory | Detailed visual Analysis, Architecture Pattern (Mermaid), Tech Stack with rationale |
   | **System Flows** | ✅ Mandatory | **MUST include at least one Mermaid sequence diagram showing component interactions** |
   | **Requirements Traceability** | ✅ Mandatory | Map every single requirement ID. Do not skip or group them. |
   | **Components and Interfaces** | ✅ Mandatory | **MUST include full TypeScript interfaces/types for every component**, state models, and explicit contracts. |
   | **Data Models** | ✅ Mandatory | If no new data: Document "No Data Model Changes" and explain why state sufficiency. |
   | **Error Handling** | ✅ Mandatory | Detailed Error Strategy, specific Categories (User/System/Logic), Monitoring plan. |
   | **Testing Strategy** | ✅ Mandatory | Unit (5+), Integration (3+), E2E (3+), Accessibility (3+). Be specific. |
   | **Security Considerations** | ✅ Mandatory | Threat modeling even for UI (e.g., "XSS via inputs"). If none, explicitly state why safe. |
   | **Performance & Scalability** | ✅ Mandatory | Define target metrics (e.g. <100ms render) even for client-side features. |
   | **Supporting References** | 🔶 Optional | Include if TypeScript definitions or logs exceed 20 lines. |

4. **Update Metadata** in spec.json:
   - Set `phase: "design-generated"`
   - Set `approvals.design.generated: true, approved: false`
   - Set `approvals.requirements.approved: true`
   - Update `updated_at` timestamp

## Critical Constraints
- **Type Safety**:
  - Enforce strong typing aligned with the project's technology stack
  - For TypeScript, never use `any`; prefer precise types and generics
  - Document public interfaces and contracts clearly
- **Latest Information**: Use WebSearch/WebFetch for external dependencies and best practices
- **Steering Alignment**: Respect existing architecture patterns from steering context
- **Template Adherence**: Follow template structure strictly
- **Design Focus**: Architecture and interfaces ONLY, no implementation code
- **Requirements Traceability IDs**: Use numeric requirement IDs only (e.g. "1.1", "1.2") as defined in requirements.md
</instructions>

## Tool Guidance
- **Read first**: Load all context before taking action (specs, steering, templates, rules)
- **Research when uncertain**: Use WebSearch/WebFetch for external dependencies, APIs, and latest best practices
- **Analyze existing code**: Use Grep to find patterns and integration points in codebase
- **Write last**: Generate design.md only after all research and analysis complete

## Output Description

**Command execution output** (separate from design.md content):

Provide brief summary in the language specified in spec.json:

1. **Status**: Confirm design document generated at `.specs/$ARGUMENTS/design.md`
2. **Discovery Type**: Which discovery process was executed (full/light/minimal)
3. **Key Findings**: 2-3 critical insights from `research.md` that shaped the design
4. **Next Action**: Approval workflow guidance
5. **Research Log**: Confirm `research.md` updated with latest decisions

**Format**: Concise Markdown (under 200 words)

## Safety & Fallback

### Error Scenarios

**Requirements Not Approved**:
- **Stop Execution**: Cannot proceed without approved requirements
- **User Message**: "Requirements not yet approved. Approval required before design generation."
- **Suggested Action**: "Run `/spec-design $ARGUMENTS -y` to auto-approve requirements and proceed"

**Missing Requirements**:
- **Stop Execution**: Requirements document must exist
- **User Message**: "No requirements.md found at `.specs/$ARGUMENTS/requirements.md`"
- **Suggested Action**: "Run `/spec-requirements $ARGUMENTS` to generate requirements first"

**Template Missing**:
- **User Message**: "Template file missing"
- **Suggested Action**: "Check repository setup or restore template file"
- **Fallback**: Use inline basic structure with warning

**Steering Context Missing**:
- **Warning**: "Steering directory empty or missing - design may not align with project standards"
- **Proceed**: Continue with generation but note limitation in output

**Discovery Complexity Unclear**:
- **Default**: Use full discovery process
- **Rationale**: Better to over-research than miss critical context

**Invalid Requirement IDs**:
- **Stop Execution**: If requirements.md uses non-numeric headings, stop and instruct user to fix

### Next Phase: Task Generation

**If Design Approved**:
- Review generated design at `.specs/$ARGUMENTS/design.md`
- Then `/spec-tasks $ARGUMENTS -y` to generate implementation tasks

**If Modifications Needed**:
- Provide feedback and re-run `/spec-design $ARGUMENTS`
- Existing design used as reference (merge mode)

**Note**: Design approval is mandatory before proceeding to task generation.
