var express = require('express');
var router = express.Router();
const {create,getUserInfo} =require('../controller/userController')

router.post('/user/create', function(req, res, next) {
  create(req,res)
});
router.get('/user/userInfo', function(req, res, next) {
  getUserInfo(req,res)
});

module.exports = router;
