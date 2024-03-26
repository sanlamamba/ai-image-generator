import jwt from 'jsonwebtoken';


export const jsonwebtokenConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
};
export function generateToken(payload, secret= jsonwebtokenConfig.secret, expiresIn= jsonwebtokenConfig.expiresIn) {
    return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token, secret= jsonwebtokenConfig.secret) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}
