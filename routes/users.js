var express = require('express');
var router = express.Router();
const {create,getUserInfo,update} =require('../controller/userController')

router.post('/user/create', function(req, res, next) {
  create(req,res)
});
router.get('/user/userInfo', function(req, res, next) {
  getUserInfo(req,res)
});
router.post('/user/update', function(req, res, next) {
  update(req,res)
});

module.exports = router;
