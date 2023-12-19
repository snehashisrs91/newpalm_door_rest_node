module.exports = (sequelize, Sequelize) => {
    const manufac_interioraccessories_master = sequelize.define("manufac_interioraccessories_master", {
      interior_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      interior_name: {
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
  
    return manufac_interioraccessories_master;
  };
  