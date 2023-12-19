const db = require("../models");
const Quotes = db.quotes;

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;


exports.global_colour_create_update = async (req, res) =>{      
    
    console.log(req.body);

    if (!req.body){
      res.status(400).send({ message: 'Please provide colour master details' });
    }
    var list = req.body;

    if(list[0].id){                
       var updateColourMasterSql = `UPDATE global_colour
           SET name='${req.body.name?req.body.name:'NULL'}', description='${req.body.description?req.body.description:'NULL'}',
           colour_code='${req.body.colour_code?req.body.colour_code:'NULL'}', hex_value='${req.body.hex_value?req.body.hex_value:'NULL'}',
           colour_type = '${req.body.colour_type?req.body.colour_type:'NULL'}'
           modified_by = ${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}
           WHERE id=${req.body.id}`;
       
       sequelize.query(updateColourMasterSql)
        .then(function (result) {            
          if(result && result.length> 0){
            res.status(200).send({ message: 'Successfully Updated!' });                   
          }else{
               res.status(400).send({ message: 'Failed to Update Quote' });
              }             
          })
          .catch(() => {
            res.status(400).send({ message: 'Unable to save data' });
          });  

    } else {
       let count = 0;
       list.forEach(data => {
        var insertGlobalColourSql = `INSERT INTO global_colour (name, description, colour_code, hex_value, colour_type,created_by, modified_by) VALUES
                                     ('${data.name?data.name:'NULL'}', '${data.description?data.description:'NULL'}', '${data.colour_code?data.colour_code:'NULL'}',
                                     '${data.hex_value?data.hex_value:'NULL'}','${data.colour_type?data.colour_type:'NULL'}',
                                     '${req.userId}', '${req.userId}')`;
     
      sequelize.query(insertGlobalColourSql)
        .then(function (result) {              
          if(result && result.length> 0){
            count = count + 1;
            if(count == list.length){             
              res.status(200).send({ message: 'Global Colour Successfully Created!' }); 
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
                    
    }
};

exports.getList = (req, res) =>{

  if (!req.param('userId')){
    res.status(400).send({ message: 'Please provide user details'});
  }
  var userId = req.param('userId');
  console.log(userId);

  var selectSql = `SELECT id, name, description, colour_code, hex_value, colour_type, is_active, created_date, created_by, modified_by, modified_date
                   FROM global_colour where created_by = ${userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getListByColourType = (req, res) =>{
  
  if (!req.param('colourType')){
     res.status(400).send({ message: 'Please provide colour type'});
  }
  var colourType = req.param('colourType');
  console.log(colourType);

  var selectSql = `SELECT id, name, description, colour_code, hex_value, colour_type, is_active, created_date, created_by, modified_by, modified_date
                   FROM global_colour where colour_type in ('both', '${colourType}') and  created_by = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getListByColourOption = (req, res) =>{
  
  if (!req.param('colourOption')){
     res.status(400).send({ message: 'Please provide colour option'});
  }
  var colourOption = req.param('colourOption');
  console.log(colourOption);

  var selectSql = `SELECT id, name, description, colour_code, hex_value, colour_type, is_active, created_date, created_by, modified_by, modified_date
                   FROM global_colour where colour_type in ('both', '${colourOption}') and  created_by = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};



