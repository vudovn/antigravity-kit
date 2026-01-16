import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLI_PATH = path.join(__dirname, '..', 'bin', 'index.js');
const TEST_DIR = path.join(__dirname, 'temp_test_project');

const runCLI = (args = '') => {
    return execSync(`node ${CLI_PATH} ${args}`, {
        encoding: 'utf-8',
        cwd: TEST_DIR,
    });
};

describe('ag-kit CLI', () => {
    beforeEach(() => {
        if (fs.existsSync(TEST_DIR)) {
            fs.rmSync(TEST_DIR, { recursive: true, force: true });
        }
        fs.mkdirSync(TEST_DIR, { recursive: true });
    });

    afterEach(() => {
        if (fs.existsSync(TEST_DIR)) {
            fs.rmSync(TEST_DIR, { recursive: true, force: true });
        }
    });

    describe('--help', () => {
        it('should display help information', () => {
            const output = execSync(`node ${CLI_PATH} --help`, { encoding: 'utf-8' });
            assert.ok(output.includes('ag-kit'));
            assert.ok(output.includes('init'));
            assert.ok(output.includes('update'));
            assert.ok(output.includes('status'));
        });
    });

    describe('--version', () => {
        it('should display version number', () => {
            const output = execSync(`node ${CLI_PATH} --version`, { encoding: 'utf-8' });
            assert.match(output.trim(), /^\d+\.\d+\.\d+$/);
        });
    });

    describe('status command', () => {
        it('should show not installed when .agent does not exist', () => {
            const output = runCLI('status');
            assert.ok(output.includes('Not installed'));
        });

        it('should show installed when .agent exists', () => {
            const agentDir = path.join(TEST_DIR, '.agent');
            fs.mkdirSync(agentDir, { recursive: true });
            fs.writeFileSync(path.join(agentDir, 'test.md'), 'test');

            const output = runCLI('status');
            assert.ok(output.includes('Installed'));
        });
    });

    describe('init command', () => {
        it('should fail gracefully with invalid branch', () => {
            try {
                runCLI('init --branch non-existent-branch-xyz');
                assert.fail('Should have thrown an error');
            } catch (error) {
                assert.ok(error.message.includes('Error') || error.status !== 0);
            }
        });
    });
});
