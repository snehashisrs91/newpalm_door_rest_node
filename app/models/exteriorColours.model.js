module.exports = (sequelize, Sequelize) => {
    const ExteriorColours = sequelize.define("exteriorColours", {
      exterior_colours_id: {
        type: Sequelize.INTEGER
      },
      exterior_colour: {
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
  
    return ExteriorColours;
  };
  