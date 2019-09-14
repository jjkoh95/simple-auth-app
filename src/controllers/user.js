import firestore from '../firestore';

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
      return res.status(200).json({
        response: 'OK',
        message: 'Successfully logged in',
      });
    }
    return res.status(404).json({
      response: 'Not OK',
      message: 'Invalid password',
    });
  } catch (err) {
    return res.status(400).json({
      response: 'Not OK',
      message: 'Error logging in',
    });
  }
};

const logout = (req, res) => {

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

const deleteUser = (req, res) => {};

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
  logout,
  createUser,
  deleteUser,
  getUsers,
};
