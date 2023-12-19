module.exports = (sequelize, Sequelize) => {
    const GlobalProperty = sequelize.define("globalProperty", {
      global_property_id: {
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      project_name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      customer_name: {
        type: Sequelize.STRING
      },
      series_id: {
        type: Sequelize.INTEGER
      },
      series_name: {
        type: Sequelize.STRING
      },
      measurement_type_id: {
        type: Sequelize.INTEGER
      },
      measurement_type_name: {
        type: Sequelize.STRING
      },
      rso_gap_id: {
        type: Sequelize.INTEGER
      },
      rso_gap: {
        type: Sequelize.STRING
      },
      glass_type_id: {
        type: Sequelize.INTEGER
      },
      glass_type: {
        type: Sequelize.STRING
      },
      grilles_id: {
        type: Sequelize.INTEGER
      },
      grill: {
        type: Sequelize.STRING
      },
      fixed_window_profiles_id: {
        type: Sequelize.INTEGER
      },
      fixed_window_profile: {
        type: Sequelize.STRING
      },
      exterior_colours_id: {
        type: Sequelize.INTEGER
      },
      exterior_colour: {
        type: Sequelize.STRING
      },
      interior_colours_id: {
        type: Sequelize.INTEGER
      },
      interior_colour: {
        type: Sequelize.STRING
      },
      hardware_type_id: {
        type: Sequelize.INTEGER
      },
      hardware_type_name: {
        type: Sequelize.STRING
      },
      hardware_finish_id: {
        type: Sequelize.INTEGER
      },
      hardware_finish_name: {
        type: Sequelize.STRING
      },
      exterior_id: {
        type: Sequelize.INTEGER
      },
      exterior_name: {
        type: Sequelize.STRING
      },
      interior_id: {
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
      }
    });
  
    return GlobalProperty;
  };
  