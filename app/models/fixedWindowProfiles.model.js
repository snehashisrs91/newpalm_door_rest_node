module.exports = (sequelize, Sequelize) => {
    const FixedWindowProfiles = sequelize.define("fixedWindowProfiles", {
      fixed_window_profiles_id: {
        type: Sequelize.INTEGER
      },
      fixed_window_profile: {
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
  
    return FixedWindowProfiles;
  };
  