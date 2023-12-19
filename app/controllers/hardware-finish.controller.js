const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.hardware_finish_create = (req, res) =>{
  var hardwareFinishList = req.body.hardwareFinish;
  let count = 0;
  hardwareFinishList.forEach(cust => {
    console.log(cust.hardware_finish_name +" - " + cust.price);

    var inserthardware_finishSql = `INSERT INTO hardware_finish_master
                             (user_id, hardware_finish_name, is_active, created_by, modified_by, price, bom)
                             VALUES(${req.userId}, '${cust.hardware_finish_name}', 1, ${req.userId}, ${req.userId}, ${cust?.price || 0.0}, ${cust?.bom || 0.0})`;
       
       sequelize.query(inserthardware_finishSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == hardwareFinishList.length){             
                res.status(200).send({ message: 'Hardware Finish Successfully Created!' }); 
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

exports.hardware_finish_update = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.hardware_finish_id){
    res.status(500).send({ message: 'Please provide Hardware Finish Id!' });
  }
  if(!reqBody.hardware_finish_name){
    res.status(500).send({ message: 'Please provide Hardware Finish Name!' });
  }
  
  var updateSql = `UPDATE hardware_finish_master SET hardware_finish_name='${reqBody?.hardware_finish_name || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}, price = ${reqBody?.price || 0.0}
                   WHERE hardware_finish_id=${reqBody.hardware_finish_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Hardware Finish Updated Successfully!' });
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });      
      
};

exports.hardware_finish_list = (req, res) =>{

  var selectSql = `SELECT hardware_finish_id, user_id, hardware_finish_name, is_active, created_date, created_by, modified_by, modified_date, price, bom
  FROM hardware_finish_master where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (hardware_finishs) {      
    res.status(200).send(hardware_finishs);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
