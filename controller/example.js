const db = require('../db/index')
const User = db.userModel
const Op = db.Sequelize.Op

// 创建并保存一条清单
exports.create = (req, res) => {
  const { name, userId, address, phone, email } = req.body
  if (!name || !userId || !address || !phone || !email) {
    res.status(400).send({
      message: "缺少参数"
    });
    return;
  }
  // 创建一条清单
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
  // 将清单保存到数据库
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
// 从数据库中搜索.
exports.findAll = (req, res) => {
  const title = req.query.name;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "搜索时，发生错误。"
      });
    });
};
// 按照条目 ID 搜索
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `没有找到 ${id} 的清单`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `查询第 ${id} 条清单时出错`
      });
    });
};
// 更新指定 ID 清单
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "更新成功"
        });
      } else {
        res.send({
          message: `第 ${id} 条更新失败。`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `更新第 ${id} 条清单时出错`
      });
    });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.query.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "删除成功"
        });
      } else {
        res.send({
          message: `删除第${id}条清单失败。`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "不能删除清单：" + id
      });
    });
};

// 删除数据库中所有清单
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `删除${nums}条清单 ` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "删除所有清单时出错"
      });
    });
};

// 检查所有清单状态
exports.findAllstauts = (req, res) => {
  User.findAll({ where: { stauts: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "搜索清单时出错"
      });
    });
};
