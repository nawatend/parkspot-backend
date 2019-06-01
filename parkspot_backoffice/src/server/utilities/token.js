import jwt from 'jsonwebtoken';
import config from '../config';

export const createToken = auth => jwt.sign(
    {
        id: auth.id,
    },
    config.auth.jwtSecret,
    {
        expiresIn: 60 * 120,
    },
);

export const generateToken = (req, res, next) => {
    req.token = createToken(req.auth);
    return next();
};

export const getToken = (headers) => {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        return null;
    }
    return null;
};

export const sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};
