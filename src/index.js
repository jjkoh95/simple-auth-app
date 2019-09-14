import express from 'express';
import bodyParser from 'body-parser';
import user from './controllers/user';

const app = express();

// middleware
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8080);
app.set('env', process.env.ENV || 'development');

app.post('/api/login', user.login);
app.post('/api/createuser', user.createUser);
app.post('/api/deleteuser');
app.get('/api/getusers', user.getUsers);

const server = app.listen(app.get('port'), () => {
  console.log(`port: ${app.get('port')} env: ${app.get('env')}`);
  console.log('Press CTRL-C to stop');
});
