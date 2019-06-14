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
    loginLocal = async (authService, req, res, next) => {
        authService.passport.authenticate('local', config.jwtSession, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('Eeeekkj'));
            }
            req.auth = {
                id: user.id,
            };
            const token = createToken(req.auth);
            return res.status(200).json({
                email: user.email,
                token: `${token}`,
                strategy: 'local',
            });
        })(req, res, next);
    };
}

export default AuthController;
