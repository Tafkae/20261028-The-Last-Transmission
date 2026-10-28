# The Last Transmission — JavaScript starter

The mission briefing is in [`../README.md`](../README.md).

**Requires:** Node.js 20 or later. **Test framework:** Vitest.

```bash
npm install
npm test              # run once
npm run test:watch    # rerun on every save
```

- File-reading helper: `readArchive(path)` in `src/archiveReader.js` returns the raw lines as an array of strings.
- File-writing helper: `writeArchive(path, lines)` in the same file writes each string as one line. Use it if you want to save output to a file.
- Tests live in `tests/`. Read the archive relative to the test file with `fileURLToPath(new URL("../data/act1.txt", import.meta.url))`.
- `tests/reconstruction.test.js` contains one intentionally failing placeholder. Replace it with your first real test.
