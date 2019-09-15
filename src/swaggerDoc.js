import swaggerUI from 'swagger-ui-express';
import swaggerJSON from '../swagger.json';

export default (app) => {
  app.use('/swagger.json', (req, res) => res.status(200).json(swaggerJSON));
  app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
};
