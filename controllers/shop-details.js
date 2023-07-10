const { shopDetailsModel } = require('../models/shop-details');

async function getShopsDetails(req, res) {
    try {
        const response = await shopDetailsModel.find();
        res.status(200).json({ shops_details: response });
    } catch (e) {
        console.log("error:", e)
    }
}

async function updateShopNameAndDescription(req, res) {
    const { docId, shopNameValue, shopDescriptionValue } = req.body;
    const query = {'_id': docId}
    try {
        const response = shopDetailsModel.findOneAndUpdate(query, {
            shop_name: shopNameValue,
            shop_discription: shopDescriptionValue && shopDescriptionValue
        }, (err, doc) => {
            if(err){
                res.status(400).json("issue in update")
                console.error("cannot updated!")
            } else {
                res.status(200).json({message: `updated sucessfully!: ${doc}`})
                console.log("updated!")
            }
        })
    } catch (e) {
              res.status(400).json({message: "bad request!"})
              console.error("cannot updated!")
    }
}

async function updateShopDp(req, res) {
    const { docId, url } = req.body;
    const query = {'_id': docId}
    try {
        const response = shopDetailsModel.findOneAndUpdate(query, {
            shop_profile_picture: url,
        }, (err, doc) => {
            if(err){
                res.status(400).json("issue in update")
                console.error("cannot updated!")
            } else {
                res.status(200).json({message: `updated sucessfully!: ${doc}`})
                console.log("updated!")
            }
        })
    } catch (e) {
              res.status(400).json({message: "bad request!"})
              console.error("cannot updated!")
    }
}



async function updateShopCover(req, res) {
    const { docId, url } = req.body;
    const query = {'_id': docId}
    try {
        const response = shopDetailsModel.findOneAndUpdate(query, {
            shop_cover_photo: url,
        }, (err, doc) => {
            if(err){
                res.status(400).json("issue in update")
                console.error("cannot updated!")
            } else {
                res.status(200).json({message: `updated sucessfully!: ${doc}`})
                console.log("updated!")
            }
        })
    } catch (e) {
              res.status(400).json({message: "bad request!"})
              console.error("cannot updated!")
    }
}
module.exports = {
    getShopsDetails,
    updateShopNameAndDescription,
    updateShopDp,
    updateShopCover
}