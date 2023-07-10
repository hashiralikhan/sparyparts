const { Schema, model } = require('mongoose');

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const authSchema = new Schema({
    primary_id: {
        type: String,
        required: true,
        unique: true,
    },
    owner_name: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    password: {
        type: String,
    }
}, schemaOptions);

const authModel = model('shops', authSchema);

module.exports = {
    authModel
}