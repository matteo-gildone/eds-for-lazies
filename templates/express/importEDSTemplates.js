import {join} from 'node:path';
import fs from "fs-extra";


const ELEMENTS_PACKAGE_PATH = join(__dirname, 'node_modules', '@springernature', 'elements', 'components');
const VIEWS_PATH = join(__dirname, 'views', 'partials', 'eds-templates');

await fs.copy(ELEMENTS_PACKAGE_PATH, VIEWS_PATH, {overwrite: false});