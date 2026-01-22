# Changelog

All notable changes to the Antigravity Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Intelligent Agent Routing**: Automatic agent selection system that analyzes user requests and routes them to the appropriate specialist(s) without requiring explicit agent mentions
    - Adds new `intelligent-routing` skill in `.agent/skills/intelligent-routing/`
    - Integrates automatic routing into GEMINI.md TIER 0 rules
    - Provides transparent agent selection with user notification (e.g., "🤖 Applying @security-auditor...")
    - Maintains compatibility with explicit agent mentions and slash commands
    - Includes comprehensive documentation in `.agent/docs/intelligent-routing-guide.md`
- Updated README.md with new "Intelligent Routing" section showcasing the automatic agent selection feature
- Added User Guide for Intelligent Routing with examples and FAQ

### Changed

- Enhanced GEMINI.md with new STEP 3 (Intelligent Agent Routing) in the request processing pipeline
- Updated agent orchestration workflow to work seamlessly with automatic routing

## [1.0.0] - Unreleased

### Initial Release

- Initial release of Antigravity Kit
- 19 specialized AI agents
- 36 domain-specific skills
- 11 workflow slash commands
- CLI tool for easy installation and updates
- Comprehensive documentation and architecture guide

[Unreleased]: https://github.com/vudovn/antigravity-kit/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/vudovn/antigravity-kit/releases/tag/v1.0.0
