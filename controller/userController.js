const db = require('../db/index')
const User = db.userModel
const Op = db.Sequelize.Op


exports.create = (req, res) => {
  const { name, userId, address, phone, email } = req.body
  if (!name || !userId || !address || !phone || !email) {
    res.status(400).send({
      message: "缺少参数"
    });
    return;
  }
  const user = {
    name: req.body.name,
    gender: req.body.gender,
    address: req.body.address,
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email,
    age: req.body.age,
    userId: req.body.userId,
  };
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "创建失败"
      });
    });
};

exports.getUserInfo = (req, res) => {
  const { userId } = req.query
  if (!userId) {
    res.status(400).send({
      message: '缺少用户ID'
    })
  }
  var condition = { userId: { [Op.like]: userId } } 
  User.findOne(condition)
  .then(result => {
   
    res.status(200).send({
      data:result
    })
  })
  .catch(err => {
    res.status(500).send({
      message: err.messa || "出错了"
    })
  })


}
