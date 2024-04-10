const sharp = require("sharp");

module.exports = async (file, width, height, quality) => {
  const resizedFile = await sharp(file.buffer)
    .resize(width, height)
    .toFormat("jpeg")
    .jpeg({ quality: quality })
    .toBuffer();

  return resizedFile;
};
