import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";

const write = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filenameToWrite = path.join(__dirname, "files", "fileToWrite.txt");
    const fileStream = createWriteStream(filenameToWrite);

    await pipeline(process.stdin, fileStream);

    console.log("Data has been written to fileToWrite.txt");
  } catch (error) {
    console.error("Error writing to file:", error.message);
    throw error;
  }
};

await write();
