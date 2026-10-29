import { readArchive } from "./archiveReader";

export function reconstructArchiveFromFile(filename) {
  return reconstructArchiveFromLines(readArchive(filename));
}

// accepts an array of strings
// returns a single string containing reconstructed message
export function reconstructArchiveFromLines(lines) {
  if (lines.length === 0) return {};

  let allFragments = {};

  for (let line of lines) {
    let splitLine = line.split("|");
    let fragment = splitLine.at(-1);
    let index = parseInt(splitLine.at(2));
    let transmissionId = splitLine.at(1);

    if( !Object.hasOwn(allFragments, transmissionId)) {
        allFragments[transmissionId] = [];
    }

    let fragments = allFragments[transmissionId];

    let oldLength = fragments.length;
    if (fragments.length < index) {
      fragments.length = index;
    }
    for (let i = oldLength; i < index; i++) {
      fragments[i] = `[MISSING ${String(i + 1).padStart(3, "0")}]`;
    }
    fragments[index - 1] = fragment;
  }

  for( let [k,v] of Object.entries(allFragments) ) {
    allFragments[k] = v.join(" ");
  }
  console.log(allFragments);
  return allFragments;
}
