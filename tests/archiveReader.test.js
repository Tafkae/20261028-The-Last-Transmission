import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { readArchive, writeArchive } from "../src/archiveReader.js";

test("supplied archive contains three recovered fragments", () => {
  const path = fileURLToPath(new URL("../data/act1.txt", import.meta.url));

  const lines = readArchive(path);

  expect(lines).toHaveLength(3);
  expect(lines[0]).toBe("########|########|001|###|WE");
});

test("written lines read back unchanged", () => {
  const folder = mkdtempSync(join(tmpdir(), "last-transmission-"));
  const path = join(folder, "written.txt");
  const lines = ["FIRST LINE", "SECOND LINE"];

  try {
    writeArchive(path, lines);

    expect(readArchive(path)).toEqual(lines);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});
