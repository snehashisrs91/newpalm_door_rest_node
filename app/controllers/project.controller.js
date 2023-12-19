const db = require("../models");
const Projects = db.project;
//const Projectt = require('../models/project.model');

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;


exports.project_create = (req, res) =>{

    var upsertsql = `INSERT INTO projects
              (project_name, project_for_user_id,created_by,modified_by,is_active)
               VALUES ('${req.body.project_name}',${req.userId},${req.userId},${req.userId},1)`;
       
       sequelize.query(upsertsql)
          .then(function () {
            res.status(200).send({ message: 'Projects Successfully Created!' });
          })
          .catch(err => {
            res.status(400).send({ message: err.message });
          });

};

exports.project_list = (req, res) => {

  var whereStatement = {};
  

  //res.status(400).send({ message: "404 Wrong parameter!!!" });

  if (req.userId){
    whereStatement.project_for_user_id  = req.userId;
  }
    whereStatement.is_active  = 1;
  /* if (req.query.email)
    whereStatement.email = req.query.email;
   */


  if (whereStatement) {
    Projects.findAll({
      attributes: ['project_id', 'project_name', 'created_date'],
      where: whereStatement
    })
      .then(project => {
        res.status(200).send(project);
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(400).send({ message: "Wrong parameter!!!" });
  }

};

