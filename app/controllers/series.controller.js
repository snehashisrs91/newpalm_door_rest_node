const { series } = require("../models");
const db = require("../models");



const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.series_create = (req, res) =>{
  var seriesList = req.body.series;
  let count = 0;
  seriesList.forEach(ser => {
    var insertSeriesSql = `INSERT INTO series
                             (user_id, series_name, is_active, created_by, modified_by, bom)
                             VALUES(${req.userId}, '${ser.series_name}', 1, ${req.userId}, ${req.userId}, ${ser?.bom || 0.0})`;
       
       sequelize.query(insertSeriesSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == seriesList.length){             
                res.status(200).send({ message: 'Series Successfully Created!' }); 
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

exports.update_series = (req, res) =>{
  var reqBody = req.body;
  if(!reqBody.series_id){
    res.status(500).send({ message: 'Please provide Series id!' });
  }
  if(!reqBody.series_name){
    res.status(500).send({ message: 'Please provide Series Name!' });
  }
  
  var updateSql = `UPDATE series SET series_name='${reqBody?.series_name || 'NULL'}', modified_by=${req.userId},
                   modified_date=${'CURRENT_TIMESTAMP'}, bom=${reqBody?.bom || 0.0}
                   WHERE series_id=${reqBody.series_id}`;                         
       
       sequelize.query(updateSql)
          .then(function (result) {              
            if(result && result.length> 0){
                res.status(200).send({ message: 'Series Updated Successfully!' });
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });      
      
};

exports.series_list = (req, res) =>{

  var selectSql = `SELECT series_id, user_id, series_name, is_active, created_date, created_by, modified_by, modified_date, bom
  FROM series where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (serieses) {      
    res.status(200).send(serieses);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
