import express from 'express';
import {edsCHeaderData} from '../data/eds-c-header.js';
import {edsCFooterData} from '../data/eds-c-footer.js';

const router = new express.Router();
const environment = process.env.NODE_ENV || 'production';

const data = {
	production: environment === 'production',
	'eds-c-header': edsCHeaderData,
	'eds-c-footer': edsCFooterData,
	language: 'en'
};

router.get('/', (request, res) => {
	res.render('index', {
		...data,
		title: 'Hi from DS for lazies team'
	});
});

export {router};