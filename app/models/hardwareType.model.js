module.exports = (sequelize, Sequelize) => {
    const HardwareTypes = sequelize.define("hardwareTypes", {
      hardware_types_id: {
        type: Sequelize.INTEGER
      },
      hardware_type: {
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
  
    return HardwareTypes;
  };
  