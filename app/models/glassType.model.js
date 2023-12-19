module.exports = (sequelize, Sequelize) => {
    const GlassType = sequelize.define("glassType", {
      glass_type_id: {
        type: Sequelize.INTEGER
      },
      glass_type: {
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
  
    return GlassType;
  };
  