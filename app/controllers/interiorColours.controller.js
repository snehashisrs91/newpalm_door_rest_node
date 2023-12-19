const db = require("../models");



const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
  var list = req.body.interior;
  let count = 0;
  list.forEach(data => {
    var insertSql = `INSERT INTO interior_colours
                             (interior_colour,user_id, is_active, created_by, modified_by)
                             VALUES('${data.interior_name}', ${req.userId}, 1, ${req.userId}, ${req.userId})`;
       
       sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == list.length){             
                res.status(200).send({ message: 'Interior Colour Successfully Created!' }); 
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

  var selectSql = `SELECT interior_colours_id,interior_colour, user_id, is_active, created_date, created_by, modified_by, modified_date
  FROM interior_colours where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
