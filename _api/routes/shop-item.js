const express = require('express');
const router = express.Router();
const { createItem, getItems, deleteItem } = require('../../controllers/shop-item');

router.post('/create-item', createItem);
router.get('/get-items', getItems);
router.get('/delete-item:id', deleteItem);

module.exports = router;