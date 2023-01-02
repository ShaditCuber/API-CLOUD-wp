const express = require('express');
const router = express.Router();
const wpController = require('../controllers/wp-controllers')



router
    .get("/", wpController.verifyToken)
    .post("/", wpController.receivedMessage)


module.exports = router;