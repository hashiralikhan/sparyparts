const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../utils/cloudInary')
const express = require('express');
const multer = require('multer');
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'items',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});
 
const upload = multer({ storage: storage });
 
module.exports = {
    upload
}
