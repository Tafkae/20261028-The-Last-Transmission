import { readFileSync, writeFileSync } from "node:fs";

/** Infrastructure supplied for the kata. No reconstruction logic lives here. */
export function readArchive(path) {
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  if (lines.at(-1) === "") {
    lines.pop();
  }
  return lines;
}

export function writeArchive(path, lines) {
  writeFileSync(path, lines.map((line) => `${line}\n`).join(""), "utf8");
}
