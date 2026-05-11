import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

const SKIP = ["fav.png", "template.png", "augle-template-email.png"];
const MAX_WIDTH = 2560;
const WEBP_QUALITY = 85;

const pngs = fs
  .readdirSync(publicDir)
  .filter((f) => f.endsWith(".png") && !SKIP.includes(f));

if (pngs.length === 0) {
  console.log("compress-images: nothing to compress");
  process.exit(0);
}

let compressed = 0;
let skipped = 0;

for (const file of pngs) {
  const input = path.join(publicDir, file);
  const output = path.join(publicDir, file.replace(".png", ".webp"));

  // Skip if webp already exists and is newer than the png
  if (fs.existsSync(output)) {
    const pngMtime = fs.statSync(input).mtimeMs;
    const webpMtime = fs.statSync(output).mtimeMs;
    if (webpMtime >= pngMtime) {
      skipped++;
      continue;
    }
  }

  try {
    const before = fs.statSync(input).size;
    await sharp(input)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(output);
    const after = fs.statSync(output).size;
    const saved = Math.round((1 - after / before) * 100);
    console.log(
      `compress-images: ${file} → ${file.replace(".png", ".webp")} ` +
        `(${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB, ${saved}% smaller)`
    );
    compressed++;
  } catch (err) {
    // Never fail the build — log and move on
    console.warn(`compress-images: skipped ${file} — ${err.message}`);
    skipped++;
  }
}

console.log(`compress-images: done (${compressed} compressed, ${skipped} skipped)`);
