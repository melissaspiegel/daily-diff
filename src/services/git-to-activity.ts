import type { Activity, DiffKind, GitActivity } from '../types';


/**
 * Converts the two-character Git status code into
 * the terminology Daily Diff uses.
 *
 * Examples:
 *
 * ?? file.ts  → untracked
 * M  file.ts  → staged
 *  M file.ts  → modified
 * A  file.ts  → added
 * UU file.ts  → conflict
 */
function getDiffKind(status: string): DiffKind {
  // New file Git isn't tracking yet.
  if (status === '??') {
    return 'untracked';
  }

  // Merge conflict.
  if (status.includes('U')) {
    return 'conflict';
  }

  /**
   * Git porcelain status has TWO positions:
   *
   * XY
   *
   * X = index/staged status
   * Y = working-tree status
   *
   * Example:
   *
   * M  file.ts
   * ↑
   * staged
   *
   *  M file.ts
   *  ↑
   * modified but NOT staged
   */
  const indexStatus = status[0];
  const workingTreeStatus = status[1];

  if (indexStatus === 'A') {
    return 'added';
  }

  if (indexStatus !== ' ') {
    return 'staged';
  }

  if (workingTreeStatus === 'M') {
    return 'modified';
  }

  return 'modified';
}

/**
 * Converts raw Git output into the Activity model
 * understood by <activity-item>.
 */
export function gitActivityToActivities(
  gitActivity: GitActivity,
): Activity[] {
  return gitActivity.changedFiles.map((line, index) => {
    /**
     * git status --short gives us lines like:
     *
     * " M src/daily-diff-app.ts"
     * "?? vite.config.ts"
     *
     * Characters 0–1 are the status.
     * Everything after character 3 is the filename.
     *
     * Note: we do NOT trim the line first — the
     * leading space in " M" is meaningful.
     */
    const status = line.slice(0, 2);
    const file = line.slice(3);

    return {
      id: `git-${index}-${file}`,
      kind: getDiffKind(status),
      text: file,
      source: 'git',
      included: true,
    };
  });
}
