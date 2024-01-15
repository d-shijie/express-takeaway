var express = require('express');
var router = express.Router();
const {create,getUserInfo,update,remove,getCity} =require('../controller/userController')

router.post('/user/create', function(req, res, next) {
  create(req,res)
});
router.get('/user/userInfo', function(req, res, next) {
  getUserInfo(req,res)
});
router.post('/user/update', function(req, res, next) {
  update(req,res)
});
router.post('/user/remove', function(req, res, next) {
  remove(req,res)
});
router.get('/user/city', function(req, res, next) {
  getCity(req,res)
});
module.exports = router;
