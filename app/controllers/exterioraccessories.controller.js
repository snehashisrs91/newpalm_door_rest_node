const { manufac_exterioraccessories_master } = require("../models");
const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.exterior_create = (req, res) =>{
  var exteriorList = req.body.exterior;
  let count = 0;
  exteriorList.forEach(cust => {
    console.log(cust.exterior_name +" - " + cust.price);

    var insertExteriorSql = `INSERT INTO manufac_exterioraccessories_master
                             (user_id, exterior_name, is_active, created_by, modified_by, price, bom)
                             VALUES(${req.userId}, '${cust.exterior_name}', 1, ${req.userId}, ${req.userId}, ${cust?.price || 0.0}, ${cust?.bom || 0.0})`;
       
       sequelize.query(insertExteriorSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == exteriorList.length){             
                res.status(200).send({ message: 'Exterior Successfully Created!' }); 
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

exports.exterior_update = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.exterior_id){
    res.status(500).send({ message: 'Please provide Series id!' });
  }
  if(!reqBody.exterior_name){
    res.status(500).send({ message: 'Please provide Exterior Accessories Name!' });
  }
  
  var updateSql = `UPDATE manufac_exterioraccessories_master SET exterior_name='${reqBody?.exterior_name || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}, price = ${reqBody?.price || 0.0}
                   WHERE exterior_id=${reqBody.exterior_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Exterior Accessories Updated Successfully!' });
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });      
      
};

exports.exterior_list = (req, res) =>{

  var selectSql = `SELECT exterior_id, user_id, exterior_name, is_active, created_date, created_by, modified_by, modified_date, price, bom
  FROM manufac_exterioraccessories_master where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (exteriors) {      
    res.status(200).send(exteriors);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
