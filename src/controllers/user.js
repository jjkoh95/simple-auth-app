import firestore from '../firestore';
import { generateJWT } from '../auth';

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Invalid body',
    });
  }
  try {
    const isMatched = await firestore.loginUser(req.body.email, req.body.password);
    if (isMatched) {
      const jwt = generateJWT(req.body.email);
      return res.status(200).json({
        response: 'OK',
        message: 'Successfully logged in',
        token: jwt,
      });
    }
    return res.status(400).json({
      response: 'Not OK',
      message: 'Invalid login details',
    });
  } catch (err) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Error logging in',
    });
  }
};

const createUser = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Invalid body',
    });
  }
  try {
    await firestore.createUser(req.body.email, req.body.password, req.body.name);
    return res.status(200).json({
      response: 'OK',
      message: 'Successfully created account',
    });
  } catch (err) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Unable to create user',
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await firestore.getAllUsers();
    return res.status(200).json({
      response: 'OK',
      message: users,
    });
  } catch (err) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Unable to retrieve users',
    });
  }
};

export default {
  login,
  createUser,
  getUsers,
};
