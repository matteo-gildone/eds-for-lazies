import {extname, join, basename} from 'node:path';
import fs from 'fs-extra';

const registerFlatPartials = async (dir, handlebars) => {
	const readPartialsRecursively = async (dir, basePath = '') => {
		const files = await fs.readdir(dir);

		for (const file of files) {
			const filePath = join(dir, file);
			const stat = await fs.stat(filePath);

			if (stat.isDirectory()) {
				await readPartialsRecursively(filePath, join(basePath, file));
			} else if(extname(filePath) === '.hbs') {
				const partialName = basename(file, '.hbs');
				const content = await fs.readFile(filePath, 'utf8');

				handlebars.registerPartial(partialName, content);
			}
		}
	};

	await readPartialsRecursively(dir);
};

export {registerFlatPartials};