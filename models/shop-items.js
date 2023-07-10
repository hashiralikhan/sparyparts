
const { Schema, model } = require('mongoose');

const shopItemSchema = new Schema({
    primary_id: {
        type: String,
    },
    item_name: {
        type: String,
    },
    item_discription: {
        type: String
    },
    item_image: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
    item_price: {
        type: String
    },
    number: {
        type: String
    }
})

const itemModel = model("items", shopItemSchema);

module.exports = { itemModel }