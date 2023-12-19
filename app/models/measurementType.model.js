module.exports = (sequelize, Sequelize) => {
    const MeasurementType = sequelize.define("measurementType", {
        measurement_type_id: {
        type: Sequelize.INTEGER
      },
      measurement_type_name: {
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
  
    return MeasurementType;
  };
  