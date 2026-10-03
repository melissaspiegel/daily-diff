import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

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