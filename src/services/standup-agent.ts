import type { Activity, Standup } from '../types';

/** Replace this deterministic adapter with Gemini/A2UI. Keeping it behind an interface
 * makes the UI testable and prevents the prototype from depending on an API key. */
export interface StandupAgent { generate(activity: Activity[]): Promise<Standup>; }

export class MockStandupAgent implements StandupAgent {
  async generate(activity: Activity[]): Promise<Standup> {
    const included = activity.filter(a => a.included);
    return {
      yesterday: included.filter(a => ['added','modified'].includes(a.kind)).map(a => a.text),
      today: ['Finish the status workflow and verify tests'],
      blockers: included.filter(a => a.kind === 'conflict').map(a => a.text),
    };
  }
}
