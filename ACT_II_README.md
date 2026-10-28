# The Last Transmission — Act II: Interference

## Mission Control: Recovery update

> **INCOMING REPORT — SIGNAL RECOVERY TEAM**
>
> We've recovered additional fragments from the same recorded communication. The archive was reconstructed from separate portions of the recording, so the physical order of the records may not match the order of the original message. Some records have been observed more than once. Others are still missing.
>
> The three fragments you decoded previously remain intact. Can your reconstruction system make sense of the expanded evidence?

Your mission is to **extend the reconstruction software you built in Act I**. Keep your existing implementation and tests; do not start over.

## Your new evidence

Mission Control has supplied `data/act2.txt`, a new snapshot of the recovered archive. It **replaces** the Act I snapshot for this exercise; do not concatenate the files.

```text
########|########|001|###|WE
########|########|002|###|ARE
########|########|003|###|NOT
########|########|006|###|HERE
########|########|004|###|ALONE
########|########|006|###|HERE
```

The format is unchanged: five pipe-delimited fields, with sequence number in the third field and recovered text in the fifth field. Fields still marked with `#` are unreadable and should not be interpreted.

## Updated requirements

1. **Reconstruct in sequence order.** The order of lines in the file is not necessarily message order. Use the numerical sequence field.
2. **Ignore identical duplicates.** If the same sequence number and text appear more than once, include that fragment only once.
3. **Show missing sequence numbers.** Start at sequence `001` and inspect every sequence through the highest recovered sequence number. For each absent number, insert a marker in the output using the exact format `[MISSING NNN]`, where `NNN` is three digits.
4. **Retain readable text.** Join recovered fragments and missing markers with one space between items.
5. **Preserve Act I behavior.** Ordered input with no duplicates or gaps must still produce the same result as before.

A missing fragment is **unknown text**, not proof that the transmission has ended. Do not guess the missing words or infer fragments beyond the highest recovered sequence number.

## Expected reconstruction of `act2.txt`

```text
WE ARE NOT ALONE [MISSING 005] HERE
```

## Suggested TDD steps

These are examples to guide your tests, not a prescribed implementation or API.

### 1. Out-of-order records

Input:

```text
########|########|002|###|EARTH
########|########|001|###|HELLO
```

Expected:

```text
HELLO EARTH
```

### 2. Identical duplicate

Input:

```text
########|########|001|###|HELLO
########|########|001|###|HELLO
```

Expected:

```text
HELLO
```

### 3. A gap in the middle

Input:

```text
########|########|001|###|WE
########|########|003|###|HERE
```

Expected:

```text
WE [MISSING 002] HERE
```

### 4. The first fragment is missing

Input:

```text
########|########|002|###|HERE
```

Expected:

```text
[MISSING 001] HERE
```

### 5. A gap can be filled

Given the records `001|WE` and `003|HERE` in the familiar five-field format, the result includes `[MISSING 002]`. When fragment `002|ARE` is also included, the result becomes `WE ARE HERE`.

You may choose whether to support incremental `Receive(...)` calls, or to reconstruct from a supplied collection of lines. The externally observable requirements are the same.

## Working agreements

- Practice **Red → Green → Refactor**: write one failing test, make it pass, then consider design improvements.
- Work in pairs and switch driver/navigator roles regularly.
- Keep tests focused on behavior, not the internal collection type.
- Existing Act I tests should keep passing.
- Choose the data structures and APIs that make sense to you. No particular pattern or class hierarchy is required.

## How to run your tests

Put `act2.txt` in your starter's `data/` folder, next to `act1.txt`. Then run your tests from your language's folder with the same command as in Act I:

| Language | Run the tests |
| --- | --- |
| C# | `dotnet test` |
| Java | `./gradlew test` (Windows: `gradlew.bat test`) |
| JavaScript | `npm test` |
| Kotlin | `./gradlew test` (Windows: `gradlew.bat test`) |
| Python | `python -m pytest` |
| TypeScript | `npm test` |

## Completion checklist

- [ ] Act I behavior remains correct.
- [ ] Out-of-order fragments are reconstructed in numerical order.
- [ ] Identical duplicate fragments appear only once.
- [ ] Gaps are represented as `[MISSING NNN]` between `001` and the highest observed sequence.
- [ ] The supplied `act2.txt` produces the expected reconstruction.
- [ ] Tests document the new behaviors.

> **Mission Control:** Preserve what we know. Report what we don't.
