module.exports = (sequelize, Sequelize) => {
    const InteriorColours = sequelize.define("interiorColours", {
      interior_colours_id: {
        type: Sequelize.INTEGER
      },
      interior_colour: {
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
  
    return InteriorColours;
  };
  