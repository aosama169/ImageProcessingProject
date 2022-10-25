import express from "express"

const image = express.Router();

image.get('/', (req, res) => {
    res.send('My Image Processing API :)');
  });


export default image;