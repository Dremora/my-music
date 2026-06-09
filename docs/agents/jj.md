# Jujutsu Workflow

Use these instructions only when `jj` is installed.

I use `jj` on top of `git` (jj uses git as its backend). Prefer `jj` commands over `git` commands. `git` is still available, but we do not use a Git-style staging area in this workflow.

My jj workflow uses two revisions: the working copy (`@`) and its parent (`@-`). Changes are produced in `@` and squashed into `@-` during review. At the end of a task, `@-` contains all changes and `@` is empty.

Create a dedicated revision only when you are about to make the first write
for a task (editing files or running commands that modify the workspace). Do
not create a revision for read-only investigation, analysis, or Q&A:

```bash
jj new --insert-before @ --no-edit -m "WIP: <task description>"
```

While you are actively working, the revision description must stay prefixed with `WIP:`.
Use sentence case for revision descriptions: start the first word after `WIP: ` (or at the beginning if there is no `WIP:` prefix) with an uppercase letter.

When you stop actively working on that revision (handoff, pause, or task complete), remove the `WIP:` prefix:

```bash
jj describe -r <change_id> -m "<description without WIP:>"
```

If work on that revision resumes later, add the `WIP:` prefix back before continuing:

```bash
jj describe -r <change_id> -m "WIP: <task description>"
```

**If any `jj` command fails:** retry the same command once after a short delay. If the failure is only due to an invocation mistake (for example: quoting, fileset/path syntax, or incorrect flags), fix the command and continue. Stop and tell the user before doing any other work only when a correctly formed `jj` command fails twice due to repository/runtime state (for example: lock contention or immutable/checkout errors). If the failure is specifically due to immutability and the user confirms, it is allowed to rerun the needed command with `--ignore-immutable`.

**If `jj new --insert-before @ --no-edit` fails because `@-` is immutable:** use `--ignore-immutable` to insert the revision. Never fall back to `jj new -m "..."` (without `--insert-before`), as that places changes directly in `@` instead of `@-`, breaking the two-revision workflow.

**CRITICAL — Before the first write action in a task (Edit, Write, NotebookEdit tools, or any command that modifies files):** never continue without a successfully created task revision. Create the `jj new` revision BEFORE calling the edit tool, not after.

**CRITICAL — One revision per task, not per request.** A new revision is created only for (a) principally new work unrelated to the active task, or (b) when the user explicitly asks for a new revision. Follow-up messages in the same thread — bug fixes to the work you just did, refinements, iterations, tweaks to the same feature, addressing review feedback, polish, adjustments — all go into the existing task revision via `jj squash --into <change_id> <paths...>`. Do NOT create a new revision just because the user sent another message. If in doubt, squash into the existing revision; splitting can be done later if needed.

Examples:

- User asks to "rework X using pattern Y" → create revision A.
- User reports a bug in the reworked X → squash fix into A (same task, not new work).
- User asks to tweak styling of X → squash into A.
- User asks to add a close button to X → squash into A.
- User pivots to "now let's refactor Z" (unrelated) → create revision B.
- User says "put this in a separate commit" → create revision B.

**Never switch the working revision manually.** Do not use commands like `jj edit` to move `@` between changes. Keep working in the current `@` and move only your files with `jj squash --into <change_id> <paths...>`.

**Never use `jj rebase`.** It can unexpectedly change the working copy revision. Use `jj squash --from <source> --into <destination>` to move changes between revisions instead.

Record the **change ID** from the output (e.g., `Created new commit qvntpyow ...` → change ID is `qvntpyow`). Always use the change ID, never the commit ID — change IDs are stable across rebases. Track every file you create or modify during the task.

**If `@` or `@-` changes unexpectedly while you work:** do not block on parent mismatch. Continue the task by targeting your recorded change ID and squashing only your files into that change ID.

Recovery steps:

1. Confirm your task change still exists: `jj log -r <change_id>`.
2. If you lost track of it, recover it via `jj log --limit 20` by matching your `WIP:` description.
3. Keep working in `@`, but always squash explicitly into your task change: `jj squash --into <change_id> path/to/file1 path/to/file2`.
4. Only stop and ask the user if your change ID no longer exists or files overlap with another agent.

**At logical stops** (after completing a function, finishing a file, etc.), squash your tracked files into your task revision:

```bash
jj squash --into <change_id> path/to/file1.ts path/to/file2.ts ...
```

**Fileset escaping:** `jj` treats parentheses and brackets as fileset syntax operators. File paths containing `(`, `)`, `[`, or `]` (e.g. expo-router routes like `apps/mobile/src/app/(app)/users/[id]/index.tsx`) must be wrapped in `file:"..."`:

```bash
jj squash --into <change_id> 'file:"apps/mobile/src/app/(app)/users/[id]/index.tsx"'
```

This moves only the specified files' changes — other agents' changes in `@` are untouched.

**Avoid opening the editor during squash.** When `jj squash` merges two commits that both have descriptions, it opens an interactive editor. To prevent this, either omit `-m` on temporary/resolution commits or pass `--use-destination-message` (or `-u`) to `jj squash` to keep the destination's description.

**When the task is complete:**

1. Squash any remaining changes into the task revision.
2. Describe it: `jj describe -r <change_id> -m "<final description>"`
   Keep `jj describe` messages at 72 characters or fewer and sentence case.
3. Verify with `jj diff -r <change_id>` and `jj log --limit 5`.

**Subagents inherit jj instructions.** When launching Agent subprocesses, pass along the current jj context (task revision change ID, any custom jj instructions from the user). Subagents must follow the same jj workflow as the parent agent — they do not create their own revisions.

**Rules for parallel work** (multiple agents sharing the working copy):

- **Non-overlapping files only.** Two agents must never edit the same file. Coordinate with the user first if needed.
- **Expect unrelated working-copy changes.** Multiple agents work in this repository simultaneously; do not treat other agents' changes as a blocker unless they overlap with files you need to edit.
- **Always squash with explicit file paths.** Never use `jj squash --into <id>` without file paths — that would move ALL `@` changes, including other agents' work.
- **Checkpoint frequently** to minimize changes sitting in the shared `@`.
- **Generated schema files** (`schema.graphql`, `schema-admin.graphql`) may contain changes from multiple agents. Before squashing these files, review the diff and edit the file to contain only your own additions (revert other agents' changes). After squashing, re-generate the schema to restore the full version on `@`.
