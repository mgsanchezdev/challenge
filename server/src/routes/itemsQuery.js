const express = require('express');
const router = express.Router();
const itemsQueryController = require('../controllers/itemsQueryController');
const itemsIdController = require('../controllers/itemsIdController');

router.get('/', itemsQueryController.itemsQuery);
router.get('/:id', itemsIdController.itemsId);
module.exports = router;
