import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";

const decompress = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filenameToRead = path.join(__dirname, "archive.gz");
    const filenameToCompress = path.join(__dirname, "fileToCompress.txt");

    const readStream = fs.createReadStream(filenameToRead);

    const writeStream = fs.createWriteStream(filenameToCompress);

    const gunzip = zlib.createGunzip();

    await pipeline(readStream, gunzip, writeStream);

    console.log("File successfully decompressed to fileToCompress.txt");
  } catch (error) {
    console.error("An error occurred during decompression:", error);
    throw error;
  }
};

await decompress();
