# Daily Diff

**Your code changed. Your standup should know why.**

Daily Diff is a privacy-first developer standup assistant built with Lit. It turns developer activity into a human-reviewed standup draft. The starter intentionally uses a deterministic mock agent so you can understand the UI/data flow before adding Gemini, A2UI, MCP, GitHub, or IDE integrations.

## Why this project

The interesting problem is not "ask an LLM to write a standup." It is creating a governed flow where an agent can propose UI and content using trusted components while the developer stays in control of what data is shared and what gets posted.

## Run it

```bash
npm install
npm run dev
```

Tests:

```bash
npm test
```

## Architecture

```text
Developer activity
      ↓
Activity collector (mocked initially)
      ↓
StandupAgent interface
      ↓
Gemini / A2UI (next milestone)
      ↓
Trusted Lit components
      ↓
Human review/edit
      ↓
Standup
```

## Current starter

- Lit + TypeScript + Vite
- Human-in-the-loop activity selection
- Git-inspired activity states: added, modified, conflict, staged, untracked
- Editable generated standup
- Agent interface with deterministic mock implementation
- Vitest
- No screenshots, source-code capture, credentials, or work-system integration

## A2UI learning path

1. Run this starter and understand the Lit state/event flow.
2. Run the official A2UI Lit restaurant quickstart separately.
3. Trace `createSurface`, `updateComponents`, and `updateDataModel`.
4. Define a small Daily Diff component catalog (standup section, activity item, status badge, approve/edit actions).
5. Add an A2UI adapter behind `StandupAgent` rather than coupling protocol code to UI components.
6. Add Gemini only after the deterministic flow works.
7. Optionally expose safe local activity through MCP.

## Privacy model

Default to metadata, not screen capture. A future collector should prefer explicitly approved data such as branch/commit metadata, changed filenames, test summaries, and manually entered notes. Do not send proprietary source code, secrets, screenshots, customer data, or internal communications to an external model unless your employer explicitly permits it.

## TODO

- [ ] Add local Git activity collector
- [ ] Add standup item add/remove controls
- [ ] Persist user edits locally
- [ ] Add A2UI renderer/adapter experiment
- [ ] Define a Daily Diff A2UI catalog
- [ ] Add Gemini-backed `StandupAgent`
- [ ] Add MCP experiment for safe developer metadata
- [ ] Add copy-to-clipboard / Markdown output
- [ ] Add accessible status announcements and keyboard review flow
- [ ] Add component tests

## Interview talking point

> I built a Lit proof of concept where developer activity becomes a human-reviewed standup. I kept the agent behind an interface, then explored A2UI as the declarative layer for mapping agent output onto a constrained catalog of trusted components rather than letting the model generate arbitrary application code.
