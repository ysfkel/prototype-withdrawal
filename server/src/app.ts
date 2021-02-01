import * as express from 'express';
import { Application } from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as cors from 'cors'

import { WithdrawalRoutes } from './routes/withdrawal';

const app: Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;

app.use(bodyparser.json());
app.use(cors());

new WithdrawalRoutes(app)
 
server.listen(port, () => {

});