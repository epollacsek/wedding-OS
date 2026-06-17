Run the full feature pipeline for: $ARGUMENTS

You are the orchestrator. Execute stages in strict order. Never skip ahead. Confirm each handoff file exists before starting the next stage.

---

## Setup

1. Clean any stale pipeline files from a previous run:
   - Delete `.pipeline/brief.md`, `.pipeline/spec.md`, `.pipeline/changes.md`, `.pipeline/test-results.md`, `.pipeline/security.md`, `.pipeline/review.md` if they exist
2. Create a new git branch: `feature/[short-slug-of-the-request]` and switch to it

---

## Stage 1 — Plan

Delegate to the **planner** subagent with the feature request above.

Wait for `.pipeline/brief.md` to exist.

**Read `.pipeline/brief.md`.**

- If confidence is **LOW or MEDIUM**: stop here. Show me the brief and wait for my confirmation before continuing.
- If confidence is **HIGH**: continue to Stage 2 automatically.

Wait for `.pipeline/spec.md` to exist.

If the spec contains an **OPEN QUESTIONS** section: stop and show me the questions. Wait for my answers before continuing.

---

## Stage 2 — Build

Delegate to the **coder** subagent.

Wait for `.pipeline/changes.md` to exist.

---

## Stage 3 — Test

Delegate to the **tester** subagent.

Wait for `.pipeline/test-results.md` to exist.

If test results contain **FAILURES**: stop. Show me the failures. Do not proceed to Security or Review. Wait for my instruction.

---

## Stage 4 — Security

Delegate to the **security** subagent.

Wait for `.pipeline/security.md` to exist.

If security result is **FAIL — BLOCK**: stop immediately. Show me `.pipeline/security.md`. Do not proceed to Review. This always requires my attention — security failures are never auto-retried.

---

## Stage 5 — Review

Delegate to the **reviewer** subagent.

Wait for `.pipeline/review.md` to exist.

---

## Final verdict

Read `.pipeline/review.md` and act on the verdict:

**SHIP** → Show me the plain English summary and verdict. Done. Branch is ready for my review and merge.

**NEEDS WORK** → Send the reviewer's feedback (the Critical Issues section) back to the **coder** subagent as a new instruction. Then re-run Stage 3 (tester), Stage 4 (security), and Stage 5 (reviewer). Repeat up to **2 times total**. If still NEEDS WORK after 2 retries, stop and show me everything — do not retry further.

**BLOCK** → Stop immediately. Show me the full `.pipeline/review.md`. Explain in one sentence why this needs my decision, not an automatic fix. Wait for my instruction.

---

Do not merge anything. Leave the branch for my review.
