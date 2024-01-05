const { rsoGap } = require("../models");
const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
  var list = req.body.doorCreate;
  let count = 0;
  list.forEach(data => {
    var insertSql = `INSERT INTO quotes_master_door
                             (screen_type, is_active, created_by, modified_by)
                             VALUES('${data.screen_type}', ${req.userId}, 1, ${req.userId}, ${req.userId})`;
       
       sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == list.length){             
                res.status(200).send({ message: 'Door type is Successfully Created!' }); 
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

exports.getList = (req, res) =>{

  var selectSql = `SELECT screen_type,is_active, created_date, created_by, modified_by, modified_date
  FROM quotes_master_door where id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.update = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.userId){
    res.status(500).send({ message: 'Please provide Fixed Door profile id!' });
  }
  if(!reqBody.userId){
    res.status(500).send({ message: 'Please provide Fixed Door profile Name!' });
  }
  
  var updateSql = `UPDATE quotes_master_door SET screen_type='${reqBody?.screen_type || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, door_swing=${reqBody?.door_swing || 0.0}
                   WHERE id = ${req.userId}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Fixed door profile Updated Successfully!' });
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });      
      
};

