const router = require('express').Router();
const { getShopsDetails, updateShopNameAndDescription, updateShopDp, updateShopCover } = require("../../controllers/shop-details");

router.get('/', getShopsDetails);
router.post('/update', updateShopNameAndDescription);
router.post('/update_dp', updateShopDp);
router.post('/update_cover', updateShopCover);

module.exports = router;