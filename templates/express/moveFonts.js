import {join} from 'node:path';
import fs from "fs-extra";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ELEMENTS_FONTS_PATH = join(__dirname, 'node_modules', '@springernature', 'elements', 'themes', 'springernature', 'fonts');
const FONTS_PATH = join(__dirname, 'public', 'fonts');

await fs.copy(ELEMENTS_FONTS_PATH, FONTS_PATH, {overwrite: false});