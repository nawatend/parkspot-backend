/*
Import the internal libraries:
- AuthController
*/
import { AuthController } from '../controller';

// Create instance of AuthController otherwise you can't use it
const authController = new AuthController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.post('/login/local', (req, res, next) => authController.loginLocal(authService, req, res, next));
};

export default initializeEndpoints;
