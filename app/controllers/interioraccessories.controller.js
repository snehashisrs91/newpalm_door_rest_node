const { manufac_interioraccessories_master } = require("../models");
const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.interior_create = (req, res) =>{
  var interiorList = req.body.interior;
  let count = 0;
  interiorList.forEach(cust => {
    console.log(cust.interior_name +" - " + cust.price);

    var insertInteriorSql = `INSERT INTO manufac_interioraccessories_master
                             (user_id, interior_name, is_active, created_by, modified_by, price, bom)
                             VALUES(${req.userId}, '${cust.interior_name}', 1, ${req.userId}, ${req.userId}, ${cust?.price || 0.0}, ${cust?.bom || 0.0})`;
       
       sequelize.query(insertInteriorSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == interiorList.length){             
                res.status(200).send({ message: 'Interior Successfully Created!' }); 
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

exports.interior_update = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.interior_id){
    res.status(500).send({ message: 'Please provide Interior Accessories Id!' });
  }
  if(!reqBody.interior_name){
    res.status(500).send({ message: 'Please provide Interior Accessories Name!' });
  }
  
  var updateSql = `UPDATE manufac_interioraccessories_master SET interior_name='${reqBody?.interior_name || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}, price=${reqBody?.price || 0.0}
                   WHERE interior_id=${reqBody.interior_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Interior Accessories Updated Successfully!' });
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });      
      
};

exports.interior_list = (req, res) =>{

  var selectSql = `SELECT interior_id, user_id, interior_name, is_active, created_date, created_by, modified_by, modified_date, price, bom
  FROM manufac_interioraccessories_master where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (interiors) {      
    res.status(200).send(interiors);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
