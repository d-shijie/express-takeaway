module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
    },
    description:{
      type: Sequelize.STRING
    },
    userId:{
      type: Sequelize.STRING
    },
  });

  return user;
};

