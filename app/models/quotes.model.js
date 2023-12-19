module.exports = (sequelize, Sequelize) => {
    const Quote = sequelize.define("quotes", {
      quotes_id: {
        type: Sequelize.INTEGER
      },
      quotes_code: {
        type: Sequelize.STRING
      },
      quotes_project_id: {
        type: Sequelize.INTEGER
      },
      quotes_for_user_id: {
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
      },
      quotes_status: {
        type: Sequelize.STRING
      },
      qty : {
        type: Sequelize.INTEGER
      },
      unit_price: {
        type: Sequelize.DOUBLE
      },
      unit_cost: {
        type: Sequelize.DOUBLE
      },
      quotes_info_id: {
        type: Sequelize.INTEGER
      },
      frame_height: {
        type: Sequelize.DOUBLE
      },
      frame_width: {
        type: Sequelize.DOUBLE
      },
      quotes_image_path: {
        type: Sequelize.STRING
      }
    });
  
    return Quote;
  };
  