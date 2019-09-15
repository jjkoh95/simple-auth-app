import { verifyJWT } from '../auth';

const isAuthenticated = (req, res, next) => {
  if (!req.headers.Authentication) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Unauthorized',
    });
  }
  try {
    const decodedToken = verifyJWT(req.headers.jwt);
    if (!decodedToken) {
      return res.status(400).json({
        response: 'Not OK',
        message: 'Invalid JWT',
      });
    }
  } catch (err) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Unable to parse JWT',
    });
  }
  return next();
};

export default {
  isAuthenticated,
};
