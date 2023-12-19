module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      customer_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      customer_name: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      created_date: {
        type: Sequelize.STRING
      },
      modified_by: {
        type: Sequelize.INTEGER
      },
      modified_date: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Customer;
  };
  