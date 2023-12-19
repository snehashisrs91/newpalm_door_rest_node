const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.hardware_type_create = (req, res) =>{
  var hardwareTypeList = req.body.hardwareType;
  let count = 0;
  hardwareTypeList.forEach(cust => {
    console.log(cust.hardware_type_name +" - " + cust.price);

    var inserthardware_typeSql = `INSERT INTO hardware_type_master
                             (user_id, hardware_type_name, is_active, created_by, modified_by, price, bom)
                             VALUES(${req.userId}, '${cust.hardware_type_name}', 1, ${req.userId}, ${req.userId}, ${cust?.price || 0.0}, ${cust?.bom || 0.0})`;
       
       sequelize.query(inserthardware_typeSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == hardwareTypeList.length){             
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
    res.status(500).send({ message: 'Please provide Hardware Type id!' });
  }
  if(!reqBody.hardware_type_name){
    res.status(500).send({ message: 'Please provide Hardware Type Name!' });
  }
  
  var updateSql = `UPDATE hardware_type_master SET hardware_type_name='${reqBody?.hardware_type_name || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}, price = ${reqBody?.price || 0.0}
                   WHERE hardware_type_id=${reqBody.hardware_type_id}`;                         
       
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

exports.hardware_type_list = (req, res) =>{

  var selectSql = `SELECT hardware_type_id, user_id, hardware_type_name, is_active, created_date, created_by, modified_by, modified_date, price, bom
  FROM hardware_type_master where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (hardware_types) {      
    res.status(200).send(hardware_types);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
