import express from 'express';
import routes from './routes/index';

const app = express();

const port = 3030;

app.use("/api",routes);

app.listen(port, () => {
  console.log('The Server is Listening on Port ' + port + ' on Local Host.');
});
