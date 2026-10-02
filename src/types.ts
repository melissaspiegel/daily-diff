export type DiffKind = 'added' | 'modified' | 'conflict' | 'staged' | 'untracked';
export interface Activity { id: string; kind: DiffKind; text: string; source: 'git'|'test'|'manual'; included: boolean; }
export interface Standup { yesterday: string[]; today: string[]; blockers: string[]; }
