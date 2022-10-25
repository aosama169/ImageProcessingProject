import express from 'express';
import checker from '../utilities/checker';
import imageAPI from '../imageAPI';
import fs from 'fs';

const router = express.Router();

router.get('/:fileName/:width/:height', checker, async (req, res) => {
  const fileName: string = req.params.fileName;

  const width = parseInt(req.params.width);
  const height = parseInt(req.params.height);

  if (width <= 0 || height <= 0 || isNaN(width) || isNaN(height)) {
    return res.status(404).send('Please Enter Valid Width And Hight');
  }

  const alteredImage = await imageAPI(fileName, width, height);

  //const parentPath = path.resolve(alteredImage);
  const img = fs.readFileSync(alteredImage);
  res.writeHead(200, { 'Content-Type': 'image/gif' });
  res.end(img);
});

router.get('*', (req, res) => {
  res.send(
    'Welcome, You Can Find My EndPoint Following This URL: http://localhost:3030/image/ImageName/Width/Hight'
  );
});

export default router;
