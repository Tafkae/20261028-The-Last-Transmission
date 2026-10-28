import { readArchive } from "./archiveReader";

export function reconstructArchiveFromFile(filename) {
  return reconstructArchiveFromLines(readArchive(filename));
}

export function reconstructArchiveFromLines(lines) {
  if (lines.length === 0) return "";

  let fragments = [];

  for (let line of lines) {
    let splitLine = line.split("|");
    fragments.push(splitLine.at(-1));
  }

  return fragments.join(" ");
}
