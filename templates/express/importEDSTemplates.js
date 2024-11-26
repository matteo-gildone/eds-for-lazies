import {join} from 'node:path';
import fs from "fs-extra";
import path from "node:path";
import {fileURLToPath} from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const ELEMENTS_PACKAGE_PATH = join(__dirname, 'node_modules', '@springernature', 'elements', 'components');
const VIEWS_PATH = join(__dirname, 'views', 'partials', 'elements-components-templates');

async function copyHbsFilesRecursively(srcDir, destDir) {
	try {
		// Ensure destination directory exists
		await fs.ensureDir(destDir);

		// Recursive function to find and copy .hbs files
		async function copyFiles(dir) {
			const entries = await fs.readdir(dir, { withFileTypes: true });

			for (const entry of entries) {
				const entryPath = path.join(dir, entry.name);

				if (entry.isDirectory()) {
					// If entry is a directory, recurse into it
					await copyFiles(entryPath);
				} else if (entry.isFile() && path.extname(entry.name) === '.hbs') {
					// If entry is a .hbs file, copy it
					const relativePath = path.relative(srcDir, entryPath);
					const destPath = path.join(destDir, relativePath);

					await fs.ensureDir(path.dirname(destPath)); // Ensure destination folder exists
					await fs.copy(entryPath, destPath);
					console.log(`Copied: ${relativePath}`);
				}
			}
		}

		await copyFiles(srcDir);

		console.log('All .hbs files copied successfully!');
	} catch (err) {
		console.error('Error copying files:', err);
	}
}

await copyHbsFilesRecursively(ELEMENTS_PACKAGE_PATH, VIEWS_PATH);
