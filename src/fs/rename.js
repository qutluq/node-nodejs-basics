import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const oldFilename = path.join(__dirname, "files", "wrongFilename.txt");
  const newFilename = path.join(__dirname, "files", "properFilename.md");

  try {
    try {
      await fs.access(oldFilename);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    try {
      await fs.access(newFilename);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await fs.rename(oldFilename, newFilename);
  } catch (error) {
    throw error;
  }
};

await rename();
