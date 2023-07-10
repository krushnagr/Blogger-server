const express = require('express');
const { getAlluser, registercontroller, logincontroller } = require('../controller/usercontroller');

const router = express.Router();

router.get('/getuser',getAlluser)

router.post('/signup',registercontroller)

router.post('/login',logincontroller)

module.exports = router