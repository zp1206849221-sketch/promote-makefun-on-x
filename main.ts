// Entry program for make.fun's "Promote make.fun's make-your-own-bounty
// post on X" bounty. The entry itself is the X post; this program only
// hands in its address by copying POST.json from the repository into
// the output directory, where the grader reads it.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Where this repository sits. The grader points MAKEFUN_BOT_DIR at it;
// otherwise resolve POST.json relative to this script's own directory,
// so the program works no matter where it is invoked from.
const repoDir =
  process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(repoDir, "POST.json");
if (!existsSync(source)) {
  console.error(`POST.json not found in ${repoDir}; nothing to hand in.`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "POST.json"));
