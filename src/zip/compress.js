import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";

const compress = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filenameToCompress = path.join(__dirname, "files", "fileToCompress.txt");
    const filenameToWrite = path.join(__dirname, "archive.gz");

    const readStream = fs.createReadStream(filenameToCompress);

    const writeStream = fs.createWriteStream(filenameToWrite);

    const gzip = zlib.createGzip();

    await pipeline(readStream, gzip, writeStream);

    console.log("File successfully compressed to archive.gz");
  } catch (error) {
    console.error("An error occurred during compression:", error);
    throw error;
  }
};

await compress();
