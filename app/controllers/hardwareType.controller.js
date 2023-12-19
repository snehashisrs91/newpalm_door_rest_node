const { grills } = require("../models");
const db = require("../models");



const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
  var list = req.body.grills;
  let count = 0;
  list.forEach(data => {
    var insertSql = `INSERT INTO hardware_types
                             (hardware_type,user_id, is_active, created_by, modified_by, bom)
                             VALUES('${data.hardware_type}', ${req.userId}, 1, ${req.userId}, ${req.userId}, ${data?.bom || 0.0})`;
       
       sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == seriesList.length){             
                res.status(200).send({ message: 'Hardware Type Successfully Created!' }); 
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

exports.update = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.hardware_type_id){
    res.status(500).send({ message: 'Please provide Series id!' });
  }
  if(!reqBody.hardware_type_name){
    res.status(500).send({ message: 'Please provide Hardware Type Name!' });
  }
  
  var updateSql = `UPDATE hardware_type_master SET hardware_type_name='${reqBody?.hardware_type_name || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}
                   WHERE series_id=${reqBody.hardware_type_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Hardware Type Updated Successfully!' });
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

  var selectSql = `SELECT hardware_types_id, hardware_type, user_id, is_active, created_date, created_by, modified_by, modified_date, bom
  FROM hardware_types where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
