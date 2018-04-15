import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import config from './config';
import routes from './routes';
import * as dbProvider from './utils/db.provider';

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

dbProvider.init();

app.get('/', (req, res) => res.send('OK'));

// Init routes;
routes(app);

const port = config.port || 8081;
app.listen(port, () => console.log(`Server has been started on port ${port}`));
