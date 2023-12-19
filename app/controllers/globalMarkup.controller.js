const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.global_markup_create_update = async (req, res) =>{      
    
  console.log(req.body);

  if (!req.body){
    res.status(400).send({ message: 'Please provide Customer markup details' });
  }
  

  if(req.body?.id){        
     var updateCustomerMarkup = `UPDATE global_markup
                SET user_id=${req.userId}, windows_markup=${req.body?.windows_markup || 0.0}, windows_markup_type='${req.body?.windows_markup_type || 'NULL'}', screen_markup=${req.body?.screen_markup || 0.0}, screen_markup_type='${req.body?.screen_markup_type || 'NULL' }', exterior_markup=${req.body?.exterior_markup || 0.0}, exterior_markup_type='${req.body?.exterior_markup_type || 'NULL'}',
                interior_markup=${req.body?.interior_markup || 0.0}, interior_markup_type='${req.body?.interior_markup_type || 'NULL'}', hardware_markup=${req.body?.hardware_markup || 0.0}, hardware_markup_type='${req.body?.hardware_markup_type || 'NULL'}', interior_acc_markup=${req.body?.interior_acc_markup || 0.0}, interior_acc_markup_type='${req.body?.interior_acc_markup_type || 'NULL'}',
                exterior_acc_markup=${req.body?.exterior_acc_markup || 0.0}, exterior_acc_markup_type='${req.body?.exterior_acc_markup_type || 'NULL'}', glass_markup=${req.body?.glass_markup || 0.0}, glass_markup_type='${req.body?.glass_markup_type || 'NULL'}', miscellaneous_markup=${req.body?.miscellaneous_markup || 0.0}, miscellaneous_markup_type='${req.body?.miscellaneous_markup_type || 'NULL'}',
                is_active=${1}, modified_by=${req.userId}, series_markup=${req.body?.series_markup || 0.0}, series_markup_type='${req.body?.series_markup_type || 'NULL'}'
                WHERE id=${req.body.id}`;
     
     sequelize.query(updateCustomerMarkup)
      .then(function (result) {            
        if(result && result.length> 0){
          res.status(200).send({ message: 'Successfully Updated!' });                   
        }else{
             res.status(400).send({ message: 'Failed to Update Global Markup' });
            }             
        })
        .catch(() => {
          res.status(400).send({ message: 'Unable to save data' });
        });  

  } else {
     var insertCustomerMarkUpSql = `INSERT into global_markup
                                    (user_id, windows_markup, windows_markup_type, screen_markup, screen_markup_type, exterior_markup, exterior_markup_type,
                                    interior_markup, interior_markup_type, hardware_markup, hardware_markup_type, interior_acc_markup, interior_acc_markup_type,
                                    exterior_acc_markup, exterior_acc_markup_type, glass_markup, glass_markup_type, miscellaneous_markup, miscellaneous_markup_type,
                                    is_active, created_by, modified_by, series_markup, series_markup_type)
                                    VALUES(${req.userId}, ${req.body?.windows_markup || 0.0}, '${req.body?.windows_markup_type || 'NULL'}', ${req.body?.screen_markup || 0.0}, '${req.body?.screen_markup_type || 'NULL' }', ${req.body?.exterior_markup || 0.0}, '${req.body?.exterior_markup_type || 'NULL'}',
                                    ${req.body?.interior_markup || 0.0}, '${req.body?.interior_markup_type || 'NULL'}', ${req.body?.hardware_markup || 0.0}, '${req.body?.hardware_markup_type || 'NULL'}', ${req.body?.interior_acc_markup || 0.0}, '${req.body?.interior_acc_markup_type || 'NULL'}',
                                    ${req.body?.exterior_acc_markup || 0.0}, '${req.body?.exterior_acc_markup_type || 'NULL'}', ${req.body?.glass_markup || 0.0}, '${req.body?.glass_markup_type || 'NULL'}', ${req.body?.miscellaneous_markup || 0.0}, '${req.body?.miscellaneous_markup_type || 'NULL'}', 1, ${req.userId}, ${req.userId},
                                    ${req.body?.series_markup || 0.0}, '${req.body?.series_markup_type || 'NULL'}')`;
   
    sequelize.query(insertCustomerMarkUpSql)
      .then(function (result) {              
        if(result && result.length> 0){
            res.status(200).send({ message: 'Global Markup Successfully Created!' });
        }
        else{
            res.status(400).send({ message: 'Failed' });
        }             
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });        
  }
};

exports.get_global_markup = (req, res) =>{

  var selectSql = `SELECT id, user_id, windows_markup, windows_markup_type, screen_markup, screen_markup_type, exterior_markup, exterior_markup_type, interior_markup, interior_markup_type, hardware_markup, hardware_markup_type, interior_acc_markup, interior_acc_markup_type, exterior_acc_markup, exterior_acc_markup_type, glass_markup, glass_markup_type, miscellaneous_markup, miscellaneous_markup_type, is_active, created_date, created_by, modified_by, modified_date, series_markup, series_markup_type
                   FROM global_markup where user_id = ${req.userId} `;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (customers) {      
    res.status(200).send(customers);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
