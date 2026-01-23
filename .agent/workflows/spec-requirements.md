---
description: Generate comprehensive requirements for a specification
allowed-tools: Glob, Grep, Read, Write, Edit, WebSearch, WebFetch
argument-hint: <feature-name>
---

# Requirements Generation

<background_information>
- **Mission**: Generate comprehensive, testable requirements in EARS format based on the project description from spec initialization
- **Success Criteria**:
  - Create complete requirements document aligned with steering context
  - Follow the project's EARS patterns and constraints for all acceptance criteria
  - Focus on core functionality without implementation details
  - Update metadata to track generation status
</background_information>

<instructions>
## Core Task
Generate complete requirements for feature **$ARGUMENTS** based on the project description in requirements.md.

## Execution Steps

1. **Load Context**:
   - Read `.specs/$ARGUMENTS/spec.json` for language and metadata
   - Read `.specs/$ARGUMENTS/requirements.md` for project description
   - **Load ALL steering context** (if exists): Read entire `.specs/steering/` directory including:
     - Default files: `structure.md`, `tech.md`, `product.md`
     - All custom steering files
     - This provides complete project memory and context

2. **Read Guidelines**:
   - Read `.agent/skills/spec-driven-development/rules/ears-format.md` for EARS syntax rules
   - Read `.agent/skills/spec-driven-development/templates/requirements.md` for document structure

3. **Analyze Existing Codebase** (for Extension/Enhancement features):
   - Search for related files: `**/*.{tsx,jsx,ts,js,vue,py}`
   - Read existing components/modules related to the feature
   - Identify what's already implemented vs what needs to be added
   
   **CRITICAL: DO NOT STOP OR ASK USER.** Instead:
   - Note findings and CONTINUE to Step 4
   - If existing implementation found:
     - Add Introduction section in requirements.md acknowledging existing code
     - Focus requirements on enhancements/additions, not reimplementation
     - Reference existing components (e.g., "The project already has X and Y")
   - If greenfield (no existing code): Skip Introduction, proceed normally

4. **Generate Requirements**:
   - Create initial requirements based on project description
   - Consider existing codebase findings (if any)
   - Group related functionality into logical requirement areas
   - Apply EARS format to all acceptance criteria:
     - Event-Driven: `When [event], the [system] shall [response]`
     - State-Driven: `While [precondition], the [system] shall [response]`
     - Unwanted: `If [trigger], the [system] shall [response]`
     - Optional: `Where [feature], the [system] shall [response]`
     - Ubiquitous: `The [system] shall [response]`
   - Use language specified in spec.json

5. **Update Metadata**:
   - Set `phase: "requirements-generated"`
   - Set `approvals.requirements.generated: true`
   - Update `updated_at` timestamp

## Important Constraints
- Focus on WHAT, not HOW (no implementation details)
- Requirements must be testable and verifiable
- Choose appropriate subject for EARS statements (system/service name for software)
- Generate initial version first, then iterate with user feedback (no sequential questions upfront)
- Requirement headings in requirements.md MUST include a leading numeric ID only (for example: "Requirement 1", "1.", "2 Feature ..."); do not use alphabetic IDs like "Requirement A".
</instructions>

## Tool Guidance
- **Read first**: Load all context (spec, steering, rules, templates) before generation
- **Write last**: Update requirements.md only after complete generation
- Use **WebSearch/WebFetch** only if external domain knowledge needed

## Output Description
Provide output in the language specified in spec.json with:

1. **Generated Requirements Summary**: Brief overview of major requirement areas (3-5 bullets)
2. **Document Status**: Confirm requirements.md updated and spec.json metadata updated
3. **Next Steps**: Guide user on how to proceed (approve and continue, or modify)

**Format Requirements**:
- Use Markdown headings for clarity
- Include file paths in code blocks
- Keep summary concise (under 300 words)

## Safety & Fallback

### Error Scenarios
- **Missing Project Description**: If requirements.md lacks project description, ask user for feature details
- **Ambiguous Requirements**: Propose initial version and iterate with user rather than asking many upfront questions
- **Template Missing**: If template files don't exist, use inline fallback structure with warning
- **Language Undefined**: Default to English (`en`) if spec.json doesn't specify language
- **Incomplete Requirements**: After generation, explicitly ask user if requirements cover all expected functionality
- **Steering Directory Empty**: Warn user that project context is missing and may affect requirement quality
- **Non-numeric Requirement Headings**: If existing headings do not include a leading numeric ID, normalize them to numeric IDs

### Next Phase: Design Generation

**If Requirements Approved**:
- Review generated requirements at `.specs/$ARGUMENTS/requirements.md`
- Then `/spec-design $ARGUMENTS` to proceed to design phase

**If Modifications Needed**:
- Provide feedback and re-run `/spec-requirements $ARGUMENTS`

**Note**: Approval is mandatory before proceeding to design phase.
