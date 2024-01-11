const Sequelize=require('sequelize')
const config=require('../config/sequelize')

const sequelize=new Sequelize(config.db,config.user,config.password,{
  host:config.host,
  dialect:config.dialect,
  pool:config.pool
})

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize

db.accountModel=require('../models/account.js')(sequelize,Sequelize)
db.userModel=require('../models/user.js')(sequelize,Sequelize)
module.exports=db