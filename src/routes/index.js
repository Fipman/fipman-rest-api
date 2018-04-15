import clients from './clients.route';

export default (app) => {
  app.use('/clients', clients);
};
