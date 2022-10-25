import express from 'express';
import fs from 'fs';

const checker = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const imageName: string = req.params.fileName;

  let match = false;
  let imageFile = '';

  fs.readdir('./thumbs/', (err, files): void => {
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
        res.writeHead(200, { 'Content-Type': 'image/gif' });
        res.send(imageFile);
      }
    }
  });
};

export default checker;
