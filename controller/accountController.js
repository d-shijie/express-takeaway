const jwt = require('jsonwebtoken')
const db = require('../db/index')
const Account = db.accountModel
const User = db.userModel
const Op = db.Sequelize.Op
const { JWT_KEY } = require('../config/jwt')
const tokens = require('../config/token')
const client = require('../middleware/redis')
exports.register = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).send({
      message: '用户名和密码不能为空'
    })
    return
  }
  Account.findOne({ username: { [Op.like]: username } }).then(data => {
    if (data) {
      res.status(400).send({
        message: '用户已存在'
      })
      return
    }
    const userId = new Date().getTime()
    const account = {
      username,
      password,
      userId
    }
    Account.create(account)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "注册失败"
        });
      });
  })

}
exports.login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).send('参数缺失')
    return
  }
  Account.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (!user) {
      res.status(400).send('用户不存在')
      return
    }
    if (user.dataValues.username === username && user.dataValues.password === password) {
      const userId = user.dataValues.userId
      const token = jwt.sign({ id: userId }, JWT_KEY, { expiresIn: '2 days' })   
      client.exists(userId).then(reply=>{
        if (reply === 1) {
          res.status(500).send('用户已登录');
          throw new Error('User Already Logged In');
        } else {
          return client.set(userId, token);
        }
      }).then(() => {
        return User.findOne({
          where: {
            userId
          }
        });
      }).then(userInfo => {
        res.status(200).send({
          code: 200,
          data: {
            userInfo,
            token,
          }
        });
      }).catch(err => {
        console.error(err);
        res.status(500);
      });
    } else {
      res.status(400).send('密码错误')
    }
  })
}
exports.logout = (req, res) => {
  const { userId } = req.body
  if (!userId) {
    res.status(400).send({
      message: '缺失参数'
    })
    return
  }
  console.log();
  if(!client.get(userId)){
   
    return
  }
  client.get(userId).then(token=>{
    console.log(token);
    if(!token){
      res.status(500).send({
        message: '用户未登录'
      })
    }else {
      client.del(userId).then(()=>{
        res.status(200).send({
          message: '退出成功'
        })
      }).catch(()=>{
        res.status(500);
      })
    }
  })
 
 
}

