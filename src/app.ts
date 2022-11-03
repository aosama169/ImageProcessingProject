import express from 'express';
import router from './routes/router';

const app = express();

app.use('/image', router);

export default app;
