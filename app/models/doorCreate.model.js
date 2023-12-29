module.exports = (sequelize, Sequelize) => {
    const DoorCreate = sequelize.define("doorCreate", {
      
      id :{
        type: Sequelize.STRING
      },
      framesize_hight:{
        type: Sequelize.STRING
      },       
      framesize_width :{
        type: Sequelize.STRING
      },
      brickmodulesize_width :{
        type: Sequelize.STRING
      },

      brickmodulesize_hight:{
        type: Sequelize.STRING
      },
      roughopenning_hight :{
        type: Sequelize.STRING
      },
      roughopenning_width :{
        type: Sequelize.STRING
      },
      location :{
        type: Sequelize.STRING
      },
      door_swing :{
        type: Sequelize.STRING
      },
      door_handing :{
        type: Sequelize.STRING
      },
      screen_type :{
        type: Sequelize.STRING
      },
      jamb_type :{
        type: Sequelize.STRING
      },
      frame_depth :{
        type: Sequelize.STRING
      },
      sill_type :{
        type: Sequelize.STRING
      },
      sill_depth :{
        type: Sequelize.STRING
      },
      brick_mould :{
        type: Sequelize.STRING
      },
      strom_door_prep :{
        type: Sequelize.STRING
      },
      system_height :{
        type: Sequelize.STRING
      },
      panel_width :{
        type: Sequelize.STRING
      },
      panel_type :{
        type: Sequelize.STRING
      },
      system_options :{
        type: Sequelize.STRING
      },
      transom :{
        type: Sequelize.STRING
      },
      panel_config :{
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
  
    return DoorCreate;
  };
  