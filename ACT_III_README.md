# The Last Transmission — Act III: Multiple Voices

## MISSION CONTROL — RECOVERY UPDATE

> The Signal Recovery Team has made a breakthrough. A previously unreadable field identifies individual transmissions. The archive isn't a single continuous message after all: it contains fragments from separate transmissions, mixed together in the recovered recording. An additional missing fragment has also been recovered.
>
> Your reconstruction system must now separate these messages without losing any of the behavior it already supports.

## Your assignment

Extend your **existing Act II solution**, using test-driven development, to reconstruct **each transmission independently** from a recovered archive snapshot.

Do not start a new project or discard your existing tests. All of your Act I and Act II behavior should remain covered by passing tests.

### The recovered archive

Mission Control has supplied `data/act3.txt`. Like the earlier snapshots, it is a UTF-8 text file with one pipe-delimited fragment per line and **five fields in the same positions**:

```text
FIELD_1|FIELD_2|FIELD_3|FIELD_4|FIELD_5
```

The Signal Recovery Team now confirms:

- **Field 2** is the **transmission identifier** (for example, `ALPHA` or `BETA`).
- **Field 3** is the fragment's **sequence number**, starting at `001` *within each transmission*.
- **Field 5** is the recovered message text; spaces within it must be preserved.
- Fields 1 and 4 remain unreadable. Do not infer their meanings.
- `########` and `###` represent unreadable fields, not missing records.

The archive is a **new snapshot** of the same fixed historical recording. Reconstruct it by itself; do not concatenate it with `act1.txt` or `act2.txt`. Previously recovered records have not been rewritten; some fields are now readable and additional records have been recovered.

## Requirements

1. **Group by transmission.** Fragments belong to the transmission named by Field 2. Reconstruct separate messages for separate identifiers.
2. **Sequence independently.** Within each transmission, order fragments by the numeric sequence number, not by their order in the file. Each transmission's numbering begins at `001`.
3. **Detect duplicates independently.** Identical repeated records within one transmission contribute message text only once.
4. **Detect gaps independently.** For each transmission, insert `[MISSING NNN]` for absent sequence numbers between `001` and the highest observed number *for that transmission*. Do not claim to know whether there are fragments after that number.
5. **Preserve established behavior.** The rules from Acts I and II still apply within each reconstructed transmission. An archive with no fragments produces no reconstructed transmissions.
6. **Expose the transmission identity.** The caller must be able to associate each reconstructed message with its transmission identifier. Choose an interface that makes this observable and testable; no particular class or data structure is required.

## Suggested TDD examples

These are **small, independent test inputs**, not excerpts that must be added to the archive file. Use the familiar five-field format.

### 1. One transmission

Input:

```text
########|ALPHA|001|###|HELLO
########|ALPHA|002|###|EARTH
```

Expected: `ALPHA` reconstructs to `HELLO EARTH`.

### 2. Two interleaved transmissions

Input:

```text
########|ALPHA|001|###|WE
########|BETA|001|###|DO
########|ALPHA|002|###|LISTEN
########|BETA|002|###|NOT
```

Expected:

```text
ALPHA: WE LISTEN
BETA:  DO NOT
```

### 3. The same sequence number in different transmissions

Input:

```text
########|ALPHA|001|###|WE
########|BETA|001|###|DO
```

Expected: Both fragments are preserved, in their respective messages. Sequence `001` is **not globally unique**.

### 4. A gap in one transmission does not affect another

Input:

```text
########|ALPHA|001|###|WE
########|ALPHA|003|###|HERE
########|BETA|001|###|DO
########|BETA|002|###|NOT
```

Expected:

```text
ALPHA: WE [MISSING 002] HERE
BETA:  DO NOT
```

### 5. Duplicates and out-of-order fragments remain supported

Input:

```text
########|BETA|002|###|NOT
########|ALPHA|002|###|LISTEN
########|ALPHA|001|###|WE
########|BETA|001|###|DO
########|BETA|002|###|NOT
```

Expected:

```text
ALPHA: WE LISTEN
BETA:  DO NOT
```

### 6. Empty input

Expected: No reconstructed transmissions.

## Using the full Act III archive

Put `act3.txt` in your starter's `data/` folder, then read it with the file-reading helper provided in your starter project. After your focused tests pass, reconstruct the full snapshot.

**Expected recovered messages** (shown alphabetically by identifier for readability; the order in which your API returns groups is your design choice unless you explicitly define it):

```text
ALPHA: WE ARE NOT ALONE OUT HERE
BETA:  DO NOT ANSWER
```

The appearance of a complete `ALPHA` message is intentional: one previously missing fragment has now been recovered.

## Working agreements

- **Red → Green → Refactor.** Introduce one new behavior with a failing test, make it pass, then consider improving the design.
- **Pair deliberately.** Trade driver and navigator roles regularly. Consider ping-pong TDD: one partner writes the next failing test, the other implements it.
- **Work from observable behavior.** Tests should verify messages and identifiers rather than requiring a specific internal collection or set of classes.
- **Refactor rather than restart.** Your Act II implementation may have assumed only one transmission. It's fine to change its interface or internal representation, but preserve prior behavior through your existing tests.
- **Do not implement behavior for unreadable fields.** The recovery team has not identified them.

## Completion checklist

- [ ] All existing Act I and Act II tests still pass (adapt a test's invocation only if your public API changes, without weakening its assertion).
- [ ] Multiple interleaved transmissions reconstruct independently.
- [ ] Sequence `001` in two transmissions does not cause a collision.
- [ ] Ordering, duplication, and missing-sequence handling work independently within each transmission.
- [ ] Empty input has a clear result.
- [ ] `act3.txt` reconstructs to the two expected messages.
- [ ] You and your partner can explain how the new transmission identifier influenced your design.

Run your test suite from your language's folder:

| Language | Run the tests |
| --- | --- |
| C# | `dotnet test` |
| Java | `./gradlew test` (Windows: `gradlew.bat test`) |
| JavaScript | `npm test` |
| Kotlin | `./gradlew test` (Windows: `gradlew.bat test`) |
| Python | `python -m pytest` |
| TypeScript | `npm test` |

**Mission Control awaits your reconstruction.**
