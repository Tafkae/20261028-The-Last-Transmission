import { assert, test } from "vitest";
import * as recon from "../src/reconstruction";

test("empty archive produces empty message", () => {
  // RED: Design a public API for your reconstruction component,
  // call it here, and replace this placeholder assertion.
  assert.equal(
    recon.reconstructArchiveFromLines([]),
    ""
  );
});

test("one fragment", () => {

  assert.equal(
    recon.reconstructArchiveFromLines(
      ["########|########|001|###|HELLO"]
    ),
    "HELLO"
  );
});

test("two fragments", () => {
  assert.equal(
    recon.reconstructArchiveFromLines([
    "########|########|001|###|HELLO",
    "########|########|002|###|EARTH"
    ]),
    "HELLO EARTH",
  );
});

test("with spaces", () => {
  assert.equal(
    recon.reconstructArchiveFromLines([
    "########|########|001|###|GOOD MORNING",
    ]),
    "GOOD MORNING",
  );
});

test("three fragments from file", () => {
  assert.equal(recon.reconstructArchiveFromFile("data/act1.txt"), "WE ARE NOT");
});