const { grills } = require("../models");
const db = require("../models");



const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
  var list = req.body.fixedWindow;
  let count = 0;
  list.forEach(data => {
    var insertSql = `INSERT INTO fixed_window_profiles
                             (fixed_window_profile,user_id, is_active, created_by, modified_by, bom)
                             VALUES('${data.fixed_window}', ${req.userId}, 1, ${req.userId}, ${req.userId}, ${data?.bom || 0.0})`;
       
       sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == list.length){             
                res.status(200).send({ message: 'Fixed Window Profiles Successfully Created!' }); 
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
  if(!reqBody.fixed_window_profiles_id){
    res.status(500).send({ message: 'Please provide Fixed Window profile id!' });
  }
  if(!reqBody.fixed_window_profile){
    res.status(500).send({ message: 'Please provide Fixed Window profile Name!' });
  }
  
  var updateSql = `UPDATE fixed_window_profiles SET fixed_window_profile='${reqBody?.fixed_window_profile || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}
                   WHERE series_id=${reqBody.fixed_window_profiles_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Fixed Window profile Updated Successfully!' });
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

  var selectSql = `SELECT fixed_window_profiles_id,fixed_window_profile, user_id, is_active, created_date, created_by, modified_by, modified_date, bom
  FROM fixed_window_profiles where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
