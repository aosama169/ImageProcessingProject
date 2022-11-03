import app from './app';

const port = 3030;

app.listen(port, () => {
  console.log('The Server is Listening on Port ' + port + ' on Local Host.');
});
