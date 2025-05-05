import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, "files");

  try {
    try {
      await fs.access(folderPath);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    const files = await fs.readdir(folderPath);

    console.log(files);
  } catch (error) {
    throw error;
  }
};

await list();
