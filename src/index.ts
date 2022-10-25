import express from 'express';
import router from './routes/router';

const app = express();

const port = 3030;

app.use('/image', router);

app.listen(port, () => {
  console.log('The Server is Listening on Port ' + port + ' on Local Host.');
});
