import pkg from 'enquirer';
const {prompt} = pkg;
import chalk from 'chalk';
import ora from 'ora';
import {execa} from 'execa';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initializeProject() {
	console.log(chalk.blue('Welcome to Frontend Tools Setup!'));

	const answers = await prompt([
		{
			type: 'multiselect',
			name: 'features',
			message: 'Select the features you want to set up:',
			choices: [
				{name: 'sass', message: 'Sass compilation'},
				{name: 'javascript', message: 'JavaScript build (Rollup + Babel)'},
				{name: 'eslint', message: 'ESLint configuration'},
				{name: 'express', message: 'Express App configuration'}
			]
		}
	]);

	const spinner = ora('Setting up your project...').start();

	try {
		const selectedFeatures = answers.features;

		// Initialize package.json if it doesn't exist
		if (!fs.existsSync('package.json')) {
			spinner.text = 'Initializing package.json...';
			await execa('npm', ['init', '-y']);
		}

		const projectConfig = {
			scripts: {},
			devDependencies: {}
		};

		// Setup each selected feature
		for (const feature of selectedFeatures) {
			spinner.text = `Setting up ${feature}...`;
			await setupFeature(feature, projectConfig);
		}

		// Update package.json with new scripts and dependencies
		const packageJson = await fs.readJson('package.json');
		const updatedPackageJson = {
			...packageJson,
			scripts: {...packageJson.scripts, ...projectConfig.scripts}
		};

		await fs.writeJson('package.json', updatedPackageJson, {spaces: 2});

		// Install dependencies
		spinner.text = 'Installing dependencies...';
		const devDepsToInstall = Object.keys(projectConfig.devDependencies);
		const depsToInstall = Object.keys(projectConfig.dependencies);
		if (devDepsToInstall.length > 0) {
			await execa('npm', ['install', '-D', ...devDepsToInstall]);
		}


		if (depsToInstall.length > 0) {
			await execa('npm', ['install', ...depsToInstall]);
		}

		spinner.succeed('Project setup completed successfully!');
	} catch (error) {
		spinner.fail('Setup failed!');
		console.error(chalk.red(error));
		process.exit(1);
	}
}

async function setupFeature(feature, projectConfig) {
	const templatePath = path.join(__dirname, '..', 'templates', feature);

	switch (feature) {
		case 'sass':
			projectConfig.scripts['sass:build'] = 'sass --load-path=\'./node_modules\' src/styles:public/css --style compressed';
			projectConfig.scripts['sass:watch'] = 'sass --load-path=\'./node_modules\' src/styles:public/css --watch';
			projectConfig.devDependencies.sass = '^1.81.0';

			// Create styles directory and copy template files
			await fs.ensureDir('assets/styles');
			await fs.copy(templatePath, 'assets/styles', {overwrite: false});
			break;

		case 'javascript':

			// Copy Rollup and Babel config files
			await fs.ensureDir('assets/js');
			await fs.copy(`${templatePath}/.`, 'assets/js', {overwrite: false});
			break;

		case 'rollup':
			projectConfig.scripts.build = 'rollup -c';
			projectConfig.scripts.watch = 'rollup -c -w';
			projectConfig.devDependencies.rollup = '^4.27.4';
			projectConfig.devDependencies['@rollup/plugin-babel'] = '^6.0.4';
			projectConfig.devDependencies['@rollup/plugin-commonjs'] = '^28.0.1';
			projectConfig.devDependencies['@rollup/plugin-node-resolve'] = '^15.3.0';
			projectConfig.devDependencies['@babel/core'] = '^7.26.0';
			projectConfig.devDependencies['@babel/preset-env'] = '^7.26.0';

			// Copy Rollup and Babel config files
			await fs.copy(`${templatePath}`, '.', {overwrite: false});
			break;

		case 'eslint':
			projectConfig.scripts.lint = 'eslint src';
			projectConfig.scripts['lint:fix'] = 'eslint src --fix';
			projectConfig.devDependencies['@eslint/js'] = '^9.15.0';
			projectConfig.devDependencies['eslint'] = '9.15.0';
			projectConfig.devDependencies['eslint-plugin-jest'] = '^28.9.0'
			projectConfig.devDependencies['eslint-plugin-unicorn'] = '^56.0.1';
			projectConfig.devDependencies['globals'] = '^15.12.0';

			// Copy ESLint config
			await fs.copy(templatePath, '.', {overwrite: false});
			break;

		case 'express':
			projectConfig.scripts['dev'] = 'npm run elements:templates && node app.js';
			projectConfig.scripts['elements:templates'] = 'node ./importEDSTemplate.js';
			projectConfig.dependencies['express'] = '^4.21.1';

			// Copy ESLint config
			await fs.copy(templatePath, '.', {overwrite: false});
			break;

		default:
			console.log('default');
	}
}