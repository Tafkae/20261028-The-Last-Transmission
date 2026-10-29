import { assert, test } from "vitest";
import * as recon from "../src/reconstruction";

test("empty archive produces empty message", () => {
  // RED: Design a public API for your reconstruction component,
  // call it here, and replace this placeholder assertion.
  assert.deepEqual(recon.reconstructArchiveFromLines([]), {});
});

test("one fragment", () => {
  assert.equal(
    recon.reconstructArchiveFromLines(["########|########|001|###|HELLO"])[
      "########"
    ],
    "HELLO",
  );
});

test("two fragments", () => {
  assert.equal(
    recon.reconstructArchiveFromLines([
      "########|########|001|###|HELLO",
      "########|########|002|###|EARTH",
    ])["########"],
    "HELLO EARTH",
  );
});

test("with spaces", () => {
  assert.equal(
    recon.reconstructArchiveFromLines([
      "########|########|001|###|GOOD MORNING",
    ])["########"],
    "GOOD MORNING",
  );
});

test("three fragments from file", () => {
  assert.equal(
    recon.reconstructArchiveFromFile("data/act1.txt")["########"],
    "WE ARE NOT",
  );
});

test("out of order records", () => {
  assert.equal(
    recon.reconstructArchiveFromLines([
      `########|########|002|###|EARTH`,
      `########|########|001|###|HELLO`,
    ])["########"],
    "HELLO EARTH",
  );
});

test("identical duplicate", () => {
  assert.equal(
    recon.reconstructArchiveFromLines([
      "########|########|001|###|HELLO",
      "########|########|001|###|HELLO",
    ])["########"],
    "HELLO",
  );
});

test("gap in the middle", () => {
  assert.equal(
    recon.reconstructArchiveFromLines([
      "########|########|001|###|WE",
      "########|########|003|###|HERE",
    ])["########"],
    "WE [MISSING 002] HERE",
  );
});

test("first fragment missing", () => {
  assert.equal(
    recon.reconstructArchiveFromLines(["########|########|002|###|HERE"])["########"],
    "[MISSING 001] HERE",
  );
});

test("act 2 fragments from file", () => {
  assert.equal(
    recon.reconstructArchiveFromFile("data/act2.txt")["########"],
    "WE ARE NOT ALONE [MISSING 005] HERE",
  );
});
