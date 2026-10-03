import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import type { GitActivity } from '../types';

const execFileAsync = promisify(execFile);

export async function getCurrentBranch(): Promise<string> {
  const { stdout } = await execFileAsync(
    'git',
    ['branch', '--show-current']
  );

  return stdout.trim();
}

export async function getRecentCommits(): Promise<string[]> {
  const { stdout } = await execFileAsync(
    'git',
    ['log', '--since=yesterday', '--pretty=format:%s']
  );

  return stdout
    .split('\n')
    .filter(Boolean);
}

export async function getChangedFiles(): Promise<string[]> {
  const { stdout } = await execFileAsync(
    'git',
    ['status', '--short']
  );

  return stdout
    .split('\n')
    .filter(Boolean);
}

/**
 * Runs all three collectors and bundles the results
 * into the GitActivity shape served by
 * GET /api/git-activity.
 *
 * Promise.all() runs them concurrently — branch,
 * commits, and changed files are independent.
 */
export async function collectGitActivity(): Promise<GitActivity> {
  const [branch, commits, changedFiles] = await Promise.all([
    getCurrentBranch(),
    getRecentCommits(),
    getChangedFiles(),
  ]);

  return { branch, commits, changedFiles };
}
