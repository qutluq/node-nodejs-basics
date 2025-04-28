import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";

const read = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filenameToRead = path.join(__dirname, "files", "fileToRead.txt");

    const fileStream = createReadStream(filenameToRead, { encoding: "utf8" });

    await pipeline(fileStream, process.stdout);
  } catch (error) {
    console.error("Error reading file:", error.message);
    throw error;
  }
};

await read();
