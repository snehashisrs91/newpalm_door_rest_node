module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    user_type_id: {
      type: Sequelize.INTEGER
    },
    mobile: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    },
    client_id: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};
