import { defineConfig, type Plugin } from 'vite';
import { collectGitActivity } from './src/services/git-activity';

function gitActivityPlugin(): Plugin {
  return {
    name: 'daily-diff-git-activity',

    configureServer(server) {
      server.middlewares.use('/api/git-activity', async (_req, res) => {
        try {
          const activity = await collectGitActivity();

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(activity));
        } catch (error) {
          console.error(error);

          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: 'Unable to collect Git activity',
            }),
          );
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [gitActivityPlugin()],
});