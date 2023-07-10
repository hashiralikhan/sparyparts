const { authModel } = require('../models/auth');
const { shopDetailsModel } = require('../models/shop-details')
const { itemModel } = require('../models/shop-items');
const { v4 } = require('uuid');

async function registrationController(req, res) {
    const { name, phone_number, location, market_type, password } = req.body;
    const unique_id = v4();
    const uid = unique_id.slice(0, 8);

    const userData = {
        primary_id: uid,
        owner_name: name,
        phonenumber: phone_number,
        password: password

    }

    const shopDetailsData = {
        primary_id: uid,
        shop_name: "",
        shop_discription: "",
        shop_profile_picture: "",
        shop_cover_photo: "",
        location: location,
        shop_type: market_type,
    }

    const registerNewUser = new authModel(userData)
    const shopDetails = new shopDetailsModel(shopDetailsData)

    const response = await authModel.findOne({
        'phonenumber': phone_number
    })

    if(response?.phonenumber !== phone_number){
        registerNewUser.save()
            .then(newuser => {
                shopDetails.save()
                    .then(() => {
                        console.log("shop-created")
                    })
                    .catch((e) => {
                        res.json({ message: "cannot create shop!" })
                    })
                res.json({ token: newuser["primary_id"] })
            })
            .catch(err => {
                res.send('bad request can not create user!')
                console.error({ message: `cannot craeta user! ${err.message}` })
            })

    }else {
        res.end("cannot craeted!")
    }
}

async function signInController(req, res) {
    const { phone_number, password } = req.body;
    const query = {
        'phonenumber': phone_number,
        'password': password
    }
    try {
        authModel.findOne(query, (err, doc) => {
            if (err) {
                res.status(400).json({ message: 'bad request!' })
            }
            if (doc && (doc.phonenumber === phone_number && doc.password === password)) {
                res.status(200).json({ token: doc["primary_id"] })
            } else {
                res.status(404).json({ message: "user not fonud!" })
            }
        })
    } catch (e) {
        res.status(400).json({ message: 'bad request!' })
    }
}


async function findShop(query, res) {
    try {
        await authModel.findOneAndDelete(query, (err, doc) => {
            if (err) {
                console.error("not found!")
                res.end()
            }
            console.log("shop found!: ", doc)
            res.end()
        })
    } catch (e) {
        console.error("not found!")
        res.end()
    }
}


async function findShopDetails(query, res) {
    try {
        await shopDetailsModel.findOneAndDelete(query, (err, doc) => {
            if (err) {
              console.error("not found!")
              res.end()
            }
            console.log("shop_details: ", doc)
            res.end()
        })
    } catch (e) {
        console.error("not found!")
        res.end()
    }

}

async function findItems(query, res) {
    try {
        await itemModel.deleteMany(query, (err, doc) => {
            if (err) {
                console.error("not found!")
                res.end()
            }
            console.log("items: ", doc)
            res.end()
        })
    } catch (e) {
        console.error("not found!")
        res.end()
    }
}

async function deleteShop(req, res) {
    const { id } = req.body;
    const query = {
        'primary_id': id
    }
    await Promise.all([findShop(query, res), findShopDetails(query, res), findItems(query, res)])
}

module.exports = { registrationController, signInController, deleteShop }


