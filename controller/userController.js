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
  User.findOne({
    where: { userId }
  }).then(data => {
    if (data) {
      res.status(500).send({
        message: "用户已存在"
      });
      return;
    }
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
  })

};
exports.update = (req, res) => {
  const { userId } = req.body
  if (!userId) {
    res.status(400).send({
      message: '缺少用户ID'
    })
    return
  }
  User.update(req.body, {
    where: { userId }
  }).then((num) => {
    if (num[0] === 1) {
      res.status(200).send({
        message: '更新成功'
      })
      return
    }
    res.status(500).send({
      message: '更新失败'
    })
  })

}

exports.remove = (req, res) => {
  const userId = req.query.userId;
  User.destroy({
    where: { userId }
  })
    .then(num => {
      if (num[0] === 0) {
        res.status(200).send({
          message: "删除成功"
        });
      } else {
        res.status(500).send({
          message: `删除失败。`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err||'服务器错误'
      });
    });
}
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
        data: result
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.messa || "出错了"
      })
    })
}
