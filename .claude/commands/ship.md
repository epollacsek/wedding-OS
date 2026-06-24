Run the full feature pipeline for: $ARGUMENTS

You are the orchestrator. The pipeline is fully autonomous — it self-corrects at every stage. Only stop for human input when something is genuinely unresolvable without a new decision.

---

## Setup

1. Clean any stale pipeline files from a previous run:
   - Delete `.pipeline/brief.md`, `.pipeline/spec.md`, `.pipeline/changes.md`, `.pipeline/test-results.md`, `.pipeline/security.md`, `.pipeline/review.md` if they exist
2. Create a new git branch `feature/[short-slug-of-the-request]` and switch to it
3. Set retry counter to 0 (max 3 retries across the full pipeline)

---

## Stage 1 — Plan

Delegate to the **planner** subagent with the feature request.

Wait for `.pipeline/brief.md`.

- If confidence is **LOW**: stop and show me the brief. Wait for my input — this is the one moment where human alignment matters most, because a wrong plan wastes everything downstream.
- If confidence is **MEDIUM or HIGH**: continue automatically.

Wait for `.pipeline/spec.md`. If it has OPEN QUESTIONS: stop and show me. Wait for my answers.

---

## Stage 2 — Test (RED, test-first)

Delegate to the **tester** subagent in its **RED pass**: write tests from the spec's acceptance criteria *before* any code exists.

Wait for `.pipeline/test-results.md`.

- The result should be `RED — tests written, failing as expected`. That is correct, not a failure — the feature isn't built yet.
- If the tester reports a criterion it **could not turn into a test** (vague spec): stop and show me. A criterion with no testable definition of "done" should be clarified before Build.

---

## Stage 3 — Build

Delegate to the **coder** subagent. Its job is to make the RED-pass tests pass (go green) by implementing the spec.

Wait for `.pipeline/changes.md`.

---

## Stage 4 — Test (GREEN, verify)

Delegate to the **tester** subagent in its **GREEN pass**: run the existing tests plus any edge-case/empty/error tests, confirm everything passes.

Wait for `.pipeline/test-results.md`.

**If tests fail:**
- Increment retry counter
- If retry counter ≤ 3: send the test failures to the **coder** subagent with instruction to fix them (it must write a root-cause line first), then re-run Stage 4. Repeat until tests pass or retry limit is hit.
- If retry counter > 3: stop. Show me the test failures and what was attempted. Wait for my instruction.

---

## Stage 5 — Security

Delegate to the **security** subagent.

Wait for `.pipeline/security.md`.

**If security fails:**
- Increment retry counter
- If retry counter ≤ 3: send the security failures to the **coder** subagent with instruction to fix them, then re-run Stage 4 (test) and Stage 5 (security). Repeat until both pass or retry limit is hit.
- If retry counter > 3: stop. Show me the security report and what was attempted. Wait for my instruction.

---

## Stage 6 — Review

Delegate to the **reviewer** subagent.

Wait for `.pipeline/review.md`.

**SHIP** → done. Show me the plain English summary and verdict. Branch is ready for my review and merge.

**NEEDS WORK:**
- Increment retry counter
- If retry counter ≤ 3: send the Critical Issues section to the **coder** subagent, then re-run Stage 4 (test), Stage 5 (security), and Stage 6 (review). Repeat until SHIP or retry limit is hit.
- If retry counter > 3: stop. Show me the full review and a summary of what was attempted across all retries.

**BLOCK:**
- Stop immediately. Show me `.pipeline/review.md`.
- Explain in plain English why this needs a human decision (not just a code fix).
- Wait for my instruction. BLOCK is only issued when the approach itself is wrong — no amount of retrying will fix it.

---

## Retry counter rule

The counter is shared across all stages. A test fix, a security fix, and a review fix each cost 1 retry. Total budget: 3. This prevents infinite loops while still allowing the pipeline to recover from multiple issues in a single run.

---

Do not merge anything. Leave the branch for my review and sign-off.
