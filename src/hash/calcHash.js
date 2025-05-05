import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";

const calculateHash = async () => {
  try {
    const hash = createHash("sha256");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filenameToCalculateHashFor = path.join(
      __dirname,
      "files",
      "fileToCalculateHashFor.txt"
    );

    const fileStream = createReadStream(filenameToCalculateHashFor);

    await pipeline(fileStream, hash);

    const hashDigest = hash.digest("hex");

    console.log(hashDigest);
  } catch (error) {
    console.error("Error calculating hash:", error.message);
    throw error;
  }
};

await calculateHash();
