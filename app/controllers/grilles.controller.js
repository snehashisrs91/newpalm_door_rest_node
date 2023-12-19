const { grills } = require("../models");
const db = require("../models");



const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
  var list = req.body.grilles;
  let count = 0;
  list.forEach(data => {
    var insertSql = `INSERT INTO grilles
                             (grill,user_id, is_active, created_by, modified_by, bom)
                             VALUES('${data.grilles_name}', ${req.userId}, 1, ${req.userId}, ${req.userId}, ${data?.bom || 0.0})`;
       
       sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == list.length){             
                res.status(200).send({ message: 'Grill Successfully Created!' }); 
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

exports.update_grill = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.grilles_id){
    res.status(500).send({ message: 'Please provide Grill id!' });
  }
  if(!reqBody.grill){
    res.status(500).send({ message: 'Please provide Grill Name!' });
  }
  
  var updateSql = `UPDATE grilles SET grill='${reqBody?.grill || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}
                   WHERE grilles_id=${reqBody.grilles_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Grill Updated Successfully!' });
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

  var selectSql = `SELECT grilles_id,grill, user_id, is_active, created_date, created_by, modified_by, modified_date, bom
  FROM grilles where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records); 
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
