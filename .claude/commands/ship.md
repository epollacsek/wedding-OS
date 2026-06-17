Run the full feature pipeline for: $ARGUMENTS

Execute these stages in order. Do not skip ahead. After each stage, confirm the handoff file exists before starting the next.

**Before starting**: delete any stale files from a previous run:
- Remove `.pipeline/spec.md`, `.pipeline/changes.md`, `.pipeline/test-results.md`, `.pipeline/review.md` if they exist.
- Create a new git branch named `feature/[short-slug-of-the-request]` and switch to it.

**Stage 1 — Plan**
Delegate to the planner subagent with the feature request above.
Wait for `.pipeline/spec.md` to exist.
If the spec has OPEN QUESTIONS, stop and show them to me before proceeding.

**Stage 2 — Build**
Delegate to the coder subagent.
Wait for `.pipeline/changes.md` to exist.

**Stage 3 — Test**
Delegate to the tester subagent.
Wait for `.pipeline/test-results.md` to exist.
If it contains failures, stop and show me the failures. Do not proceed to review.

**Stage 4 — Review**
Delegate to the reviewer subagent.
Wait for `.pipeline/review.md` to exist.

**Final report**
Show me the contents of `.pipeline/review.md`.
State the verdict clearly: SHIP, NEEDS WORK, or BLOCK.
Do not merge anything. Leave the branch for my review.
