import * as express from 'express';
import { Application } from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as cors from 'cors'
import WithdrawalService from './services/withdrawal/withdrawal';
import UserService from './services/user/user'
import DenominationRepository from './repository/denomination';
import UserRepository from './repository/user';
import { WithdrawalRoutes } from './api/routes';
import WithdrawalController from './controllers/withdrawal';
import UserController from './controllers/user'

const app: Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 9000;

app.use(bodyparser.json());
app.use(cors());

initServices(app)
 
server.listen(port, () => {
  console.log(`server listening on port ${port}`)
})


function  initServices (app: Application ) {
  const service  = new WithdrawalService(new DenominationRepository(), new UserRepository())
  const withdrawal = new WithdrawalController(service)

  const userService  = new UserService(new UserRepository())
  const user = new UserController(userService)

  new WithdrawalRoutes(app,withdrawal, user)
}