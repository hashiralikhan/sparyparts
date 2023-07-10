const { itemModel } = require('../models/shop-items');

async function createItem(req, res) {
    const { _primary_id, item_name, item_discription, item_image, cloudinary_id, item_price, number } = req.body;
    console.log("id in server: ", _primary_id)
    try {
        const itemData = {
            primary_id: _primary_id,
            item_name: item_name,
            item_discription: item_discription,
            item_image: item_image,
            cloudinary_id: cloudinary_id,
            item_price: item_price,
            number: number
        }
        const item = new itemModel(itemData)
        item.save()
            .then(() => {
                res.status(200).json({ message: "Item created sucessfully!" })
                console.log("item created!")
            })
            .catch((e) => {
                res.status(400).json({ message: "bad request!" })
                console.error({ message: "cannot create item" })
            })
    } catch (e) {
        console.log(e)
    }
}

async function getItems(req, res) {
    try {
        const response = await itemModel.find()
        res.status(200).json({ response })
    } catch (err) {
        res.status(400).json({ message: "cannot find records!" });
    }
}


async function deleteItem(req, res) {
    const { id } = req.params;
    const uid = id.substring(1)
    try {
        await itemModel.findByIdAndDelete(uid, (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Deleted : ", docs);
                // res.status(200).json({ message: "product delete sucessfully" });
                res.end("item deleted");
            }
        })
    } catch (e) {
        res.status(400).json({ message: "bad request!" })
    }
}


module.exports = {
    createItem,
    getItems,
    deleteItem
}

