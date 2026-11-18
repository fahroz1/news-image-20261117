// News-image entry for 17 November 2026 (make.fun news-image-20261117).
// The graded image lives beside this file as entry.png; the program's only job
// is to place those exact bytes at /output/entry.png so the judge sees them.
// Node 22, standard library only, no network, deterministic: the same bytes
// go out on every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const image = readFileSync(join(here, "entry.png"));

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, image);

// Read it back and confirm the copy is whole: a PNG starts with its
// 8-byte signature and the written length must match the source exactly,
// so both grader runs produce identical bytes.
const written = readFileSync(outPath);
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (written.length !== image.length || !written.subarray(0, 8).equals(pngSignature)) {
  throw new Error("entry.png copy failed verification");
}
console.log(`wrote ${outPath} (${written.length} bytes)`);
