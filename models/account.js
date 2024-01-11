module.exports = (sequelize, Sequelize) => {
  const account = sequelize.define("account", {
    username: {
      type: Sequelize.STRING
    },
    password:{
      type: Sequelize.STRING
    },
    userId:{
      type: Sequelize.STRING
    }
  });

  return account;
};

