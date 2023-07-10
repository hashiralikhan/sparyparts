const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cd(null, "Images")
    }
,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    } 
})

module.exports = multer({ storage });



exports.uploadProfile = async (req, res) => {
    const { user } = req;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'unauthorized access!' });
  
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${user._id}_profile`,
        width: 500,
        height: 500,
        crop: 'fill',
      });
  
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { avatar: result.url },
        { new: true }
      );
      res
        .status(201)
        .json({ success: true, message: 'Your profile has updated!' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'server error, try after some time' });
      console.log('Error while uploading profile image', error.message);
    }
  };



// new GridFsStorage({
//     url: process.env.URI,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"];
//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-any-name-${file.originalname}`;
//             return filename;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-any-name-${file.originalname}`,
//         };
//     },
// });