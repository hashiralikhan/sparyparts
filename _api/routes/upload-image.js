const router = require('express').Router();
const cloudinary = require('../../utils/cloudInary');

router.post('/', (req, res) => {
  const tempFilePath = req.files.file?.tempFilePath
  cloudinary.uploader.upload(tempFilePath, (err, photoData) => {
    if (err) {
      res.status(400).send(err);
    } else {    
      res.status(200).send(photoData);
      res.end()
    }
  })
});

module.exports = router