/*
Import the internal libraries:
- * from database
- errorHandler
*/
import {
    APIError,
    handleAPIError,
    createToken,
} from '../../../utilities';
import config from '../../../config';

class AuthController {
    // {        successReturnToOrRedirect: 'http://localhost:3000/admin',    },
    loginLocal = async (authService, req, res, next) => {
        authService.passport.authenticate('local', config.jwtSession, (err, user, info) => {
            if (err) {
                return next(err);
            }
            console.log(user);
            if (!user) {
                return next(new Error(`No user found ${info.message}`));
            }


            req.auth = {
                id: user.id,
            };
            const token = createToken(req.auth);

            // return res.setHeader('Location', 'http://localhost:3000/admin');

            return res.status(200).json({
                email: user.email,
                token: `${token}`,
                strategy: 'local',
            });
        })(req, res, next);
    };
}

export default AuthController;
