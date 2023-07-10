const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dr71fu2xl',
    api_key: '331522488323838',
    api_secret: 'GXVBpeEgDoS07ZiPOVnWHbsRekg'
})

module.exports = cloudinary;