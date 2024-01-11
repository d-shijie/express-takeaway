const config={
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'123456',
  db:'takeaway',
  dialect:'mysql',
  pool:{
    max:10,
    min:0,
    acquire:30000,
    idle:10000
  }
}
module.exports=config