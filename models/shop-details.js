const { Schema, model } = require('mongoose');


const shopDetailsSchema = new Schema({
    primary_id: {
        type: String,
        required: true,
        unique: true,
    },
    shop_name: {
        type: String
    },
    shop_discription: {
        type: String
    },
    shop_profile_picture: {
        type: String
    },
    shop_cover_photo: {
        type: String
    },
    location : {
        type: String,
    },
    shop_type : {
        type: String,
    },
})

const shopDetailsModel = model("shop_details", shopDetailsSchema)

module.exports = {
    shopDetailsModel
}