module.exports = (sequelize, Sequelize) => {
    const Grilles = sequelize.define("grilles", {
      grilles_id: {
        type: Sequelize.INTEGER
      },
      grill: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
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
      }
    });
  
    return Grilles;
  };
  