import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filename = path.join(__dirname, "files", "fileToRead.txt");

  try {
    try {
      await fs.access(filename);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    const content = await fs.readFile(filename, "utf8");

    console.log(content);
  } catch (error) {
    throw error;
  }
};

await read();
