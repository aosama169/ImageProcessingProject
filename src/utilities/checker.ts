import express from 'express';
import fs from 'fs';

//Checker searches for cached images not to resize the image multiple times.

function isNumber(n: string): boolean {
  return /^(\d+.)*(\d+)$/.test(n);
}

const checker = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (!isNumber(req.params.width) || !isNumber(req.params.height)) {
    res.status(404).send('Hight And Width required should be in numbers only.');
    return;
  }

  if (req.params.fileName.length <= 0) {
    res.status(404).send('Please Enter Valid Image File');
    return;
  }

  if (parseInt(req.params.width) <= 0 || parseInt(req.params.height) <= 0) {
    res
      .status(404)
      .send('Width and Hight Parameters Should be bigger than Zero!');
    return;
  }

  const imageWidth: number = parseInt(req.params.width);
  const imageHight: number = parseInt(req.params.height);
  const imageName: string =
    req.params.fileName + '_' + imageWidth + 'x' + imageHight;

  let match = false;
  let imageFile = '';

  fs.readdir('./thumbs/', async (err, files): Promise<void> => {
    if (err) console.log(err);
    else {
      files.forEach((file): void => {
        if (file.split('.')[0] == imageName) {
          match = true;
          imageFile = file;
          //break;
        }
      });

      if (!match) {
        next();
      } else {
        const img = await fs.readFileSync('thumbs/' + imageFile);
        res.writeHead(200, { 'Content-Type': 'image/gif' });
        res.end(img);
      }
    }
  });
};

export default checker;
