import admin from 'firebase-admin';
import bcrypt from 'bcrypt';
import serviceAccount from '../../firebase-service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/**
 * getUser
 * @param {string} email
 * @return {object} user document (firebase)
 */
const getUser = async (email) => {
  const users = await db.collection('users').where('email', '==', email).get();
  if (users.empty) return undefined;
  let user;
  users.forEach((u) => {
    user = u.data();
  });
  return user;
};

/**
 * getAllUsers
 * @return {Array<object>} Array of user objects (firebase)
 */
const getAllUsers = async () => {
  const users = await db.collection('users').get();
  const allUsers = [];
  users.forEach((u) => {
    allUsers.push(u.data());
  });
  return allUsers;
};

/**
 * createUser
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
const createUser = async (email, password, name) => {
  const user = await getUser(email);
  if (user) throw new Error('User account already exists');

  bcrypt.genSalt(10, (salt) => {
    bcrypt.hash(password, salt, (hashedPassword) => {
      db.collection('users')
        .doc(email)
        .set({ name, email, hashedPassword });
    });
  });
};

/**
 * loginUser
 * @param {string} email
 * @param {string} password
 * @return {boolean} if password matches
 */
const loginUser = async (email, password) => {
  const user = await getUser(email);
  let res = false;
  bcrypt.compare(password, user.hashedPassword, (val) => {
    res = val;
  });
  return res;
};

export default {
  createUser,
  loginUser,
  getAllUsers,
};
