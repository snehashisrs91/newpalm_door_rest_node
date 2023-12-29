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
