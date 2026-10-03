import {
  getCurrentBranch,
  getRecentCommits,
  getChangedFiles,
} from '../src/services/git-activity.js';

/**independent asynchronous operations can run concurrently rather than sequentially. */
async function main() {
  const branch = await getCurrentBranch();
  const commits = await getRecentCommits();
  const changedFiles = await getChangedFiles();

  console.log('Current branch:', branch);
  console.log('Recent commits:', commits);
  console.log('Changed files:', changedFiles);
}

main();