module.exports = (sequelize, Sequelize) => {
    const RsoGap = sequelize.define("rsoGap", {
      rso_gap_id: {
        type: Sequelize.INTEGER
      },
      rso_gap: {
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
  
    return RsoGap;
  };
  