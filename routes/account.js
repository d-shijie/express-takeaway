var express = require('express');
var router = express.Router();
const {register,login,logout} =require('../controller/accountController')

router.post('/register', function(req, res, next) {
  register(req,res)
});
router.post('/login', function(req, res, next) {
  login(req,res)
});
router.post('/logout', function(req, res, next) {
  logout(req,res)
});

module.exports = router;
