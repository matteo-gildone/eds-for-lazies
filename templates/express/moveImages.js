import {join} from 'node:path';
import fs from "fs-extra";


const ELEMENTS_PACKAGE_PATH = join(__dirname, 'assets', 'img');
const VIEWS_PATH = join(__dirname, 'public', 'img');

await fs.copy(ELEMENTS_PACKAGE_PATH, VIEWS_PATH, {overwrite: false});