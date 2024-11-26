import express from 'express';
import {engine, create} from 'express-handlebars';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {router} from './routes/index.js';
import {registerFlatPartials} from './utils/handelbars.js';

// fs
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app
const app = express();
const {PORT, NODE_ENV} = process.env;
const port = PORT || 8080;
const env = NODE_ENV || 'development';

// hbs
const {handlebars} = create();

await registerFlatPartials(join(__dirname, '/views/partials'), handlebars);

app.engine('hbs', engine({
	extname: '.hbs',
	defaultLayout: 'main',
	layoutsDir: join(__dirname, '/views/layouts')
}))

app.set('view engine', 'hbs');
app.set('views', join(__dirname, '/views'));

app.use('/', express.static(`${__dirname}/public`));
app.use(router);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port} (${env})`)
});