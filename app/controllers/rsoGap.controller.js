const { rsoGap } = require("../models");
const db = require("../models");



const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
  var rsoGapList = req.body.rsoGap;
  let count = 0;
  rsoGapList.forEach(rg => {
    var insertSql = `INSERT INTO rso_gaps
                             (user_id, rso_gap, is_active, created_by, modified_by, bom)
                             VALUES(${req.userId}, '${rg.rso_gap}', 1, ${req.userId}, ${req.userId}, ${rg?.bom || 0.0})`;
       
       sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == rsoGapList.length){             
                res.status(200).send({ message: 'RSO GAP Successfully Created!' }); 
              }
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });    
      });
      
};

exports.update_rsoGap = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.rso_gap_id){
    res.status(500).send({ message: 'Please provide Rso gap id!' });
  }
  if(!reqBody.rso_gap){
    res.status(500).send({ message: 'Please provide Rso gap Name!' });
  }
  
  var updateSql = `UPDATE rso_gaps SET rso_gap='${reqBody?.rso_gap || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}
                   WHERE series_id=${reqBody.rso_gap_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Rso gap Updated Successfully!' });
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

  var selectSql = `SELECT rso_gap_id,rso_gap, user_id, is_active, created_date, created_by, modified_by, modified_date, bom
  FROM rso_gaps where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
