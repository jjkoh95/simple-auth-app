import jwt from 'jsonwebtoken';

/**
 * generateJWT
 * @param {string} email
 * @return {string} JWT Token
 */
const generateJWT = (email) => jwt.sign(
  { email },
  process.env.SECRET || 'SECRET',
  { expiresIn: '24h' },
);

/**
 * verifyJWT
 * @param {string} token
 * @return {object} decoded token object
 */
const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET || 'SECRET');
  if (decoded.exp < Math.floor(Date.now() / 1000)) throw new Error('JWT expired');
  return decoded;
};

export {
  generateJWT,
  verifyJWT,
};
