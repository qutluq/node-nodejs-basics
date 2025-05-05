import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fileToDelete = path.join(__dirname, "files", "fileToRemove.txt");

  try {
    try {
      await fs.access(fileToDelete);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    await fs.unlink(fileToDelete);
  } catch (error) {
    throw error;
  }
};

await remove();
