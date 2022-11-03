import express from 'express';
import checker from '../utilities/checker';
import imageAPI from '../imageAPI';
import fs from 'fs';

const router = express.Router();

//Resizing End Point, it uses Checker MiddleWare to search Cached Images and ImageAPI For Resizing Images.
router.get(
  '/:fileName/:width/:height',
  checker,
  async (req, res): Promise<void> => {
    const fileName: string = req.params.fileName;
    const width: number = parseInt(req.params.width);
    const height: number = parseInt(req.params.height);

    const alteredImage: string = await imageAPI(fileName, width, height);

    if (alteredImage == 'false') {
      res
        .status(404)
        .send(
          '<h2>Error</h2><h3>Could not Find Image File : ' + fileName + ' </h3>'
        );
    } else {
      const img: Buffer = fs.readFileSync(alteredImage);
      res.writeHead(200, { 'Content-Type': 'image/gif' });
      res.end(img);
    }
  }
);

router.get('/showImages', async (req, res): Promise<void> => {
  let fileNames = '<h2>Available image files</h2>';

  fs.readdir('./images/', (err, files): void => {
    if (err) console.log(err);
    else {
      files.forEach((file): void => {
        fileNames += '<br>' + file;
      });
    }
    res.send(fileNames);
  });
});

router.get('*', (req, res): void => {
  res.send(
    '<h1>Welcome</h1><br><h3>You Can Find My EndPoint Following This URL: <br>http://localhost:3030/image/ImageName/Width/Hight </h3>' +
      '<br><br>' +
      '<strong>Discover the Available Images From <a href="http://localhost:3030/image/showImages">Here</a></strong>'
  );
});

export default router;
