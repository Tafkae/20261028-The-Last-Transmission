import { readArchive } from "./archiveReader";

export function reconstructArchiveFromFile(filename) {
  return reconstructArchiveFromLines(readArchive(filename));
}

export function reconstructArchiveFromLines(lines) {
  if (lines.length === 0) return "";

  let fragments = [];

  for (let line of lines) {
    let splitLine = line.split("|");
    let fragment = splitLine.at(-1);
    let index = parseInt(splitLine.at(2));

    let oldLength = fragments.length
    if ( fragments.length < index ) {
        fragments.length = index;
    }
    for( let i = oldLength; i < index; i++) {
        fragments[i] = `[MISSING ${String(i + 1).padStart(3,"0")}]`
    }
    fragments[index - 1] = fragment
  }

  // console.log(fragments);
  return fragments.join(" ");
}
