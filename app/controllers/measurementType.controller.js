const { measurementType } = require("../models");
const db = require("../models");



const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
  var measurementTypeList = req.body.measurementType;
  let count = 0;
  measurementTypeList.forEach(mes => {
    var insertSql = `INSERT INTO measurement_type
                             (user_id, measurement_type_name, is_active, created_by, modified_by, bom)
                             VALUES(${req.userId}, '${mes.measurement_type_name}', 1, ${req.userId}, ${req.userId}, ${mes?.bom || 0.0})`;
       
       sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == measurementTypeList.length){             
                res.status(200).send({ message: 'Measurement Type Successfully Created!' }); 
              }
            }
            else{
                res.status(400).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(400).send({ message: err.message });
          });    
      });
      
};

exports.update_measurement = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.measurement_type_id){
    res.status(500).send({ message: 'Please Measurement Type id!' });
  }
  if(!reqBody.measurement_type_name){
    res.status(500).send({ message: 'Please Measurement Type Name!' });
  }
  
  var updateSql = `UPDATE measurement_type SET measurement_type_name='${reqBody?.measurement_type_name || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}
                   WHERE series_id=${reqBody.measurement_type_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Measurement Type Updated Successfully!' });
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });      
      
};

exports.getList = (req, res) =>{

  var selectSql = `SELECT measurement_type_id, user_id, measurement_type_name, is_active, created_date, created_by, modified_by, modified_date, bom
  FROM measurement_type where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (mes) {      
    res.status(200).send(mes);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
