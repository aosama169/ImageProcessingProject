import sharp from 'sharp';

const imageAPI = async (
  fileName: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    await sharp('./images/' + fileName + '.jpg')
      .resize(width, height)
      .toFile('./thumbs/' + fileName + '_' + width + 'x' + height + '.jpg');
  } catch (err) {
    console.log('Error Happened in Resizing Image: ' + err);
  }

  return 'thumbs/' + fileName + '_' + width + 'x' + height + '.jpg';
};

export default imageAPI;
