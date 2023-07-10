const express = require('express');
const router = express.Router();
const { registrationController, signInController, deleteShop } = require('../../controllers/auth');

router.post('/register', registrationController);
router.post('/sign-in', signInController);
router.post('/delete-shop', deleteShop);

module.exports = router;
