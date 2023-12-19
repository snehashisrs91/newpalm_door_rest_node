module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    
    project_id : {
      type: Sequelize.INTEGER
    },project_name: {
      type: Sequelize.STRING
    },
    project_for_user_id : {
      type: Sequelize.INTEGER
    },
    created_by : {
      type: Sequelize.INTEGER
    },
    created_date : {
      type: Sequelize.STRING
    },
    modified_by : {
      type: Sequelize.INTEGER
    },
    modified_date : {
      type: Sequelize.STRING
    },
    is_active : {
      type: Sequelize.INTEGER
    }
  });

  return Project;
};