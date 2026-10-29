# The Last Transmission — Act IV: The Full Transmission

## MISSION CONTROL — FINAL RECOVERY UPDATE

> **DEEP SPACE COMMUNICATIONS CENTER**  
> **MISSION FILE: ODYSSEY**  
> **STATUS: SIGNAL RECOVERY COMPLETE**
>
> It's done. After forty years, the Signal Recovery Team has recovered every fragment of the *Odyssey*'s final recording. Nothing is missing. For the first time since contact was lost in 2098, the whole transmission is in our hands.
>
> We know only what you have already reconstructed: the *Odyssey* reported that we are not alone, and a second, unknown voice told us not to answer. Everything else has been waiting in the noise.
>
> The engineers at this center have spent the last three acts building the software that can put the recording back together. Now it's time to find out what it says.

## Your assignment

**No new requirements. No new production code.** The only code you add in this act is one test.

Mission Control has supplied `act4.txt`, the complete recovered archive. It uses exactly the same format as `act3.txt`:

- Field 2 is the transmission identifier.
- Field 3 is the sequence number within that transmission.
- Field 5 is the recovered text.
- Fields 1 and 4 remain unreadable.

As before, the line order is scrambled and some records were observed more than once. This time, though, the recording is complete, and the transmission is far longer than anything you have handled so far.

Your Act III solution should already be able to handle it. Your job is to prove it.

1. Put `act4.txt` in your starter's `data/` folder, next to the earlier archives.
2. Add one test, next to your Act III archive test, that:
   - reads `act4.txt` with your starter's file-reading helper,
   - reconstructs it with your existing solution,
   - asserts that no transmission contains `[MISSING`,
   - writes each transmission identifier with its reconstructed message, **sorted by identifier**, to a file named `act4-transcript.txt` using your starter's file-writing helper, with a blank line between transmissions, and
   - prints the full path of the file it wrote.
3. Run your tests, open `act4-transcript.txt` in your editor, and read every reconstructed transmission, in full, in identifier order. Turn on word wrap: each transmission is one long line.

In Act III, the order of the transmissions was up to you. This time it matters: sort by identifier using your language's ordinary string sort, and read the transmissions in that order.

You can't assert the exact text, because you don't know it yet. That's the point. The only thing you know in advance is that the recording is complete.

The transcript is far too long to read comfortably in test output, which is why it goes to a file. Write it wherever is easiest to find. Next to `act4.txt` works for most languages; C# tests run from the build output folder, so the printed path tells you where it went.

Most test runners hide printed output by default. Use the command for your language to see the path:

| Language | Write with | Print with | Run the tests and show printed output |
| --- | --- | --- | --- |
| C# | `ArchiveReader.Write(path, lines)` | `Console.WriteLine` | `dotnet test --logger "console;verbosity=detailed"` |
| Java | `ArchiveReader.write(path, lines)` | `System.out.println` | `./gradlew test` (Windows: `gradlew.bat test`); the starter already shows printed output |
| JavaScript | `writeArchive(path, lines)` | `console.log` | `npm test` |
| Kotlin | `ArchiveReader.write(path, lines)` | `println` | `./gradlew test` (Windows: `gradlew.bat test`); the starter already shows printed output |
| Python | `write_archive(path, lines)` | `print` | `python -m pytest -s` |
| TypeScript | `writeArchive(path, lines)` | `console.log` | `npm test` |

If your reconstruction contains a repeated word, words out of order, or text that doesn't read as English, something in your earlier work isn't as solid as your tests suggested. Find out why, and add a test that would have caught it. A full recording has no gaps.

## Mission Control is listening

When your team has the full transmission, **don't share it with the other teams yet.** Mission Control will ask each team to read its reconstruction aloud, in turn, in identifier order. If every team's software is correct, every team will tell the same story.

## Debrief

The recording never changed. Only our understanding of it did. Before you close the mission file, talk through these questions with your partner:

- **Act I** asked you to handle only what was in front of you. Did you resist building for situations you hadn't been asked to handle? Where was that hard?
- **Act II** changed the rules: out-of-order records, duplicates, gaps. How much of your Act I design survived? Did your tests make the change safer?
- **Act III** revealed that one field you had been told to ignore actually mattered. How did your design absorb a new concept? What would you have done differently if you had known from the start?
- **Act IV** needed no new production code. What does that say about the design you ended up with?
- Your Act IV test couldn't check the exact message. How much did you trust its result, and why?
- Which test gave you the most confidence? Which test turned out to be unnecessary?
- If Mission Control recovered field 1 or field 4 tomorrow, how hard would your code be to change?

## Completion checklist

- [ ] A new test reconstructs `act4.txt` and asserts that it contains no `[MISSING NNN]` markers.
- [ ] Every transmission in the archive is reconstructed and identified.
- [ ] The test writes the transcript to `act4-transcript.txt`, sorted by identifier, and prints where it went.
- [ ] All tests from Acts I, II, III and IV pass, and no production code changed in this act (unless you found and fixed a bug).
- [ ] Your team has read the full transmission aloud to Mission Control.
- [ ] You and your partner have talked through the debrief questions.

---

> **Mission Control:** Recovery complete. The fate of the *Odyssey* is no longer unknown.
>
> *End of mission file.*
