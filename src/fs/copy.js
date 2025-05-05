import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const sourceDir = path.join(__dirname, "files");
  const targetDir = path.join(__dirname, "files_copy");

  try {
    try {
      await fs.access(sourceDir);
    } catch (error) {
      throw new Error("FS operation failed");
    }

    try {
      await fs.access(targetDir);
      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await fs.mkdir(targetDir);

    await copyRecursive(sourceDir, targetDir);
  } catch (error) {
    if (error.message === "FS operation failed") {
      throw error;
    } else {
      throw new Error("FS operation failed");
    }
  }
};

async function copyRecursive(source, target) {
  const entries = await fs.readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(targetPath);
      await copyRecursive(sourcePath, targetPath);
    } else {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

await copy();
