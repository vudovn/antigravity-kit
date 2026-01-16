#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { downloadTemplate } from 'giget';
import path from 'path';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get package.json for version
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));

// ============================================================================
// CONSTANTS
// ============================================================================

const REPO = 'github:vudovn/antigravity-kit';
const TEMPLATES_FOLDER = 'templates';
const AGENT_FOLDER = '.agent';
const TEMP_FOLDER = '.temp_ag_kit';

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Display ASCII banner
 */
const showBanner = () => {
    console.log(chalk.blueBright(`
    ╔══════════════════════════════════════╗
    ║      🚀 ANTIGRAVITY KIT CLI 🚀       ║
    ╚══════════════════════════════════════╝
    `));
};

/**
 * Ask user for confirmation
 * @param {string} question - Question to ask
 * @returns {Promise<boolean>}
 */
const confirm = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(chalk.yellow(`${question} (y/N): `), (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
    });
};

/**
 * Clean up temporary directory
 * @param {string} tempDir - Temp directory path
 */
const cleanup = (tempDir) => {
    if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
};

/**
 * Copy .agent folder from temp to destination
 * @param {string} tempDir - Temp directory
 * @param {string} destDir - Destination directory
 */
const copyAgentFolder = (tempDir, destDir) => {
    const sourceAgent = path.join(tempDir, TEMPLATES_FOLDER, AGENT_FOLDER);

    if (!fs.existsSync(sourceAgent)) {
        throw new Error(`Could not find ${TEMPLATES_FOLDER}/${AGENT_FOLDER} folder in source repository!`);
    }

    fs.cpSync(sourceAgent, destDir, { recursive: true });
};

/**
 * Update .gitignore to include .agent folder
 * @param {string} targetDir - Target project directory
 * @returns {boolean} - True if .gitignore was updated
 */
const updateGitignore = (targetDir) => {
    const gitignorePath = path.join(targetDir, '.gitignore');
    const entryToAdd = AGENT_FOLDER;

    // Check if .gitignore exists
    if (fs.existsSync(gitignorePath)) {
        const content = fs.readFileSync(gitignorePath, 'utf-8');
        const lines = content.split(/\r?\n/);

        // Check if .agent is already in .gitignore
        const hasEntry = lines.some(line =>
            line.trim() === entryToAdd ||
            line.trim() === `${entryToAdd}/` ||
            line.trim() === `/${entryToAdd}` ||
            line.trim() === `/${entryToAdd}/`
        );

        if (!hasEntry) {
            // Add .agent to .gitignore
            const newContent = content.endsWith('\n')
                ? `${content}${entryToAdd}\n`
                : `${content}\n${entryToAdd}\n`;
            fs.writeFileSync(gitignorePath, newContent);
            return true;
        }
    } else {
        // Create new .gitignore with .agent
        fs.writeFileSync(gitignorePath, `${entryToAdd}\n`);
        return true;
    }

    return false;
};

// ============================================================================
// COMMANDS
// ============================================================================

/**
 * Initialize .agent folder in project
 */
const initCommand = async (options) => {
    showBanner();

    const targetDir = path.resolve(options.path || process.cwd());
    const tempDir = path.join(targetDir, TEMP_FOLDER);
    const agentDir = path.join(targetDir, AGENT_FOLDER);

    // Check if .agent already exists
    if (fs.existsSync(agentDir)) {
        if (!options.force) {
            console.log(chalk.yellow(`⚠️  Folder ${AGENT_FOLDER} already exists at: ${agentDir}`));
            const shouldOverwrite = await confirm('Do you want to overwrite it?');

            if (!shouldOverwrite) {
                console.log(chalk.gray('Operation cancelled.'));
                process.exit(0);
            }
        }
        console.log(chalk.gray(`Overwriting ${AGENT_FOLDER} folder...`));
    }

    const spinner = ora({
        text: 'Downloading...',
        color: 'cyan',
    }).start();

    try {
        // Download repository using giget
        const repoSource = options.branch ? `${REPO}#${options.branch}` : REPO;
        await downloadTemplate(repoSource, {
            dir: tempDir,
            force: true,
        });

        spinner.text = 'Installing...';

        // Delete old .agent folder if exists (always clean install)
        if (fs.existsSync(agentDir)) {
            fs.rmSync(agentDir, { recursive: true, force: true });
        }

        // Copy .agent folder
        copyAgentFolder(tempDir, agentDir);

        // Update .gitignore
        const gitignoreUpdated = updateGitignore(targetDir);

        // Cleanup
        cleanup(tempDir);

        spinner.succeed(chalk.green('Installation successful!'));

        // Success message
        console.log(chalk.gray('\n────────────────────────────────────────'));
        console.log(chalk.white('📁 Result:'));
        console.log(`   ${chalk.cyan(AGENT_FOLDER)} → ${chalk.gray(agentDir)}`);
        if (gitignoreUpdated) {
            console.log(`   ${chalk.cyan('.gitignore')} → Added ${chalk.yellow(AGENT_FOLDER)}`);
        }
        console.log(chalk.gray('────────────────────────────────────────'));
        console.log(chalk.green('\n🎉 Happy coding!\n'));
    } catch (error) {
        spinner.fail(chalk.red(`❌ Error: ${error.message}`));
        cleanup(tempDir);
        process.exit(1);
    }
};

/**
 * Update existing .agent folder
 */
const updateCommand = async (options) => {
    showBanner();

    const targetDir = path.resolve(options.path || process.cwd());
    const agentDir = path.join(targetDir, AGENT_FOLDER);

    // Check if .agent exists
    if (!fs.existsSync(agentDir)) {
        console.log(chalk.red(`❌ Could not find ${AGENT_FOLDER} folder at: ${targetDir}`));
        console.log(chalk.yellow(`💡 Tip: Run ${chalk.cyan('ag-kit init')} to install first.`));
        process.exit(1);
    }

    if (!options.force) {
        console.log(chalk.yellow(`⚠️  Update will overwrite the entire ${AGENT_FOLDER} folder`));
        const shouldUpdate = await confirm('Are you sure you want to continue?');

        if (!shouldUpdate) {
            console.log(chalk.gray('Operation cancelled.'));
            process.exit(0);
        }
    }

    // Call init with force option
    await initCommand({ ...options, force: true });
};

/**
 * Show status of .agent folder
 */
const statusCommand = (options) => {
    const targetDir = path.resolve(options.path || process.cwd());
    const agentDir = path.join(targetDir, AGENT_FOLDER);

    console.log(chalk.blueBright('\n📊 Antigravity Kit Status\n'));

    if (fs.existsSync(agentDir)) {
        const stats = fs.statSync(agentDir);
        const files = fs.readdirSync(agentDir, { recursive: true });

        console.log(chalk.green('✅ Installed'));
        console.log(chalk.gray('────────────────────────────────────────'));
        console.log(`📁 Path:     ${chalk.cyan(agentDir)}`);
        console.log(`📅 Modified: ${chalk.gray(stats.mtime.toLocaleString('en-US'))}`);
        console.log(`📄 Files:    ${chalk.yellow(files.length)} items`);
        console.log(chalk.gray('────────────────────────────────────────\n'));
    } else {
        console.log(chalk.red('❌ Not installed'));
        console.log(chalk.yellow(`💡 Run ${chalk.cyan('ag-kit init')} to install.\n`));
    }
};

// ============================================================================
// CLI DEFINITION
// ============================================================================

const program = new Command();

program
    .name('ag-kit')
    .description('CLI tool to install and manage Antigravity Kit')
    .version(pkg.version, '-v, --version', 'Display version number');

// Command: init
program
    .command('init')
    .description('Install .agent folder into your project')
    .option('-f, --force', 'Overwrite if folder already exists', false)
    .option('-p, --path <dir>', 'Path to the project directory', process.cwd())
    .option('-b, --branch <name>', 'Select repository branch')
    .action(initCommand);

// Command: update
program
    .command('update')
    .description('Update .agent folder to the latest version')
    .option('-f, --force', 'Skip confirmation prompt', false)
    .option('-p, --path <dir>', 'Path to the project directory', process.cwd())
    .option('-b, --branch <name>', 'Select repository branch')
    .action(updateCommand);

// Command: status
program
    .command('status')
    .description('Check installation status')
    .option('-p, --path <dir>', 'Path to the project directory', process.cwd())
    .action(statusCommand);

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}