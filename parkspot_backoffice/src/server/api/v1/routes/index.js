/*
Import the external libraries:
- express
*/
import express from 'express';

/*
Import the internal libraries:
- blog.routes.js
- category.routes.js
- post.routes.js
*/
import AuthService from '../service';
import authRouter from './auth.routes';
import blogRouter from './blog.routes';
import categoryRouter from './category.routes';
import postRouter from './post.routes';
import userRouter from './user.routes';
import countryRouter from './country.routes';
import cityRouter from './city.routes';
import zoneRouter from './zone.routes';
import favoriteRouter from './favorite.routes';
import homeAddressRouter from './homeAddress.routes';
import avoidZoneRouter from './avoidZones.routes';
import settingRouter from './setting.routes';
import openDataRouter from './openData.routes';
// Initialize the AuthService
const authService = new AuthService();

// Define and initiate an express router
const apiV1Router = express.Router();
authRouter(apiV1Router, authService);
blogRouter(apiV1Router, authService);
categoryRouter(apiV1Router, authService);
postRouter(apiV1Router, authService);
userRouter(apiV1Router, authService);
countryRouter(apiV1Router, authService);
cityRouter(apiV1Router, authService);
zoneRouter(apiV1Router, authService);
favoriteRouter(apiV1Router, authService);
homeAddressRouter(apiV1Router, authService);
avoidZoneRouter(apiV1Router, authService);
settingRouter(apiV1Router, authService);

openDataRouter(apiV1Router, authService);
export default apiV1Router;
