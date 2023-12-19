const db = require("../models");
const multer = require('multer');
const sequelize = db.sequelize;
const upload = multer({dest: '././public/images/glass/glazing'});


//let path='././public/images/glass/'+type+'/' + imaheUniqueName;
//let sendPath ='images/glass/'+type+'/'+imaheUniqueName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '././public/images/glass/');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
const uploadImg = multer({storage: storage}).single('image_path');



exports.createGlassMaterials = async (req, res) =>{
  var materialType = req.params['type'];
  console.log(materialType);

  var list = req.body;
  let count = 0;

  if(materialType != null && materialType == 'glazing'){
  list.forEach( async (data) => {
    if(data?.id){
      var imagePath = "";
    if(data?.image_path){       
      //imagePath =   await imageConversion(data.image_path, materialType);
    }    
    var updateSql = `UPDATE glass_glazing_master
                     SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                     modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                     WHERE id=${data.id}`;                 
       
       await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == list.length){             
                res.status(200).send({ message: 'Glazing Type Updated Successfully!' }); 
              }
            }
            else{
                res.status(400).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(400).send({ message: err.message });
          });


    } else {
    var imagePath = null;
    if(data?.image_path){       
      imagePath =   await imageConversion(data.image_path, materialType);
    }
    var insertSql = `INSERT INTO glass_glazing_master
                     (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                     VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
       
       await sequelize.query(insertSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == list.length){             
                res.status(200).send({ message: 'Glazing Type Successfully Created!' }); 
              }
            }
            else{
                res.status(400).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(400).send({ message: err.message });
          });
        }  
      });
    }

    if(materialType != null && materialType == 'lowee'){
      list.forEach( async (data) => {

        if(data?.id) {
          var imagePath = "";
    if(data?.image_path){       
      //imagePath =   await imageConversion(data.image_path, materialType);
    }    
    var updateSql = `UPDATE glass_lowe_types_master
                     SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                     modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                     WHERE id=${data.id}`;                 
       
       await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == list.length){             
                res.status(200).send({ message: 'Lowee Type Updated Successfully!' }); 
              }
            }
            else{
                res.status(400).send({ message: 'Failed' });
            }             
          })
          .catch(err => {
            res.status(400).send({ message: err.message });
          });
        } else {
        
        var imagePath = null;
        if(data?.image_path){        
          imagePath =   await imageConversion(data.image_path, materialType);
        }
        var insertSql = `INSERT INTO glass_lowe_types_master
                         (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                         VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
           
           await sequelize.query(insertSql)
              .then(function (result) {              
                if(result && result.length> 0){
                  count = count + 1;
                  if(count == list.length){             
                    res.status(200).send({ message: 'LowE Successfully Created!' }); 
                  }
                }
                else{
                    res.status(400).send({ message: 'Failed' });
                }             
              })
              .catch(err => {
                res.status(400).send({ message: err.message });
              });
            }   
          });
        }

        if(materialType != null && materialType == 'obscure'){
          list.forEach( async (data) => {

            if(data?.id){
              var imagePath = "";
            if(data?.image_path){       
              //imagePath =   await imageConversion(data.image_path, materialType);
            }    
            var updateSql = `UPDATE glass_obscure_glass_types_master
                             SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                             modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                             WHERE id=${data.id}`;                 
               
               await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                  .then(function (result) {              
                    if(result && result.length> 0){
                      count = count + 1;
                      if(count == list.length){             
                        res.status(200).send({ message: 'Obscure Updated Successfully!' }); 
                      }
                    }
                    else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  })
                  .catch(err => {
                    res.status(400).send({ message: err.message });
                  });
        
        
            } else {

            var imagePath = null;
            if(data?.image_path){        
              imagePath =   await imageConversion(data.image_path, materialType);
            }
            var insertSql = `INSERT INTO glass_obscure_glass_types_master
                             (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                             VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
               
               await sequelize.query(insertSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      count = count + 1;
                      if(count == list.length){             
                        res.status(200).send({ message: 'Obscure Successfully Created!' }); 
                      }
                    }
                    else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  })
                  .catch(err => {
                    res.status(400).send({ message: err.message });
                  });
                }
              });
            }

            if(materialType != null && materialType == 'spacerFinish'){
              list.forEach( async (data) => {

                if(data?.id){
                  var imagePath = "";
                if(data?.image_path){       
                  //imagePath =   await imageConversion(data.image_path, materialType);
                }    
                var updateSql = `UPDATE glass_spacer_finish_types_master
                                 SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                                 modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                                 WHERE id=${data.id}`;                 
                   
                   await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                      .then(function (result) {              
                        if(result && result.length> 0){
                          count = count + 1;
                          if(count == list.length){             
                            res.status(200).send({ message: 'Spacer Finish Updated Successfully!' }); 
                          }
                        }
                        else{
                            res.status(400).send({ message: 'Failed' });
                        }             
                      })
                      .catch(err => {
                        res.status(400).send({ message: err.message });
                      });
            
            
                } else {

                var imagePath = null;
                if(data?.image_path){        
                  imagePath =   await imageConversion(data.image_path, materialType);
                }
                var insertSql = `INSERT INTO glass_spacer_finish_types_master
                                 (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                                 VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
                   
                   await sequelize.query(insertSql)
                      .then(function (result) {              
                        if(result && result.length> 0){
                          count = count + 1;
                          if(count == list.length){             
                            res.status(200).send({ message: 'Spacer Finish Successfully Created!' }); 
                          }
                        }
                        else{
                            res.status(400).send({ message: 'Failed' });
                        }             
                      })
                      .catch(err => {
                        res.status(400).send({ message: err.message });
                      });
                    }
                  });
                }

            if(materialType != null && materialType == 'spacerTypes'){
                  list.forEach( async (data) => {
                    if(data?.id){
                      var imagePath = "";
                    if(data?.image_path){       
                      //imagePath =   await imageConversion(data.image_path, materialType);
                    }    
                    var updateSql = `UPDATE glass_spacer_types_master
                                     SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                                     modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                                     WHERE id=${data.id}`;                 
                       
                       await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                          .then(function (result) {              
                            if(result && result.length> 0){
                              count = count + 1;
                              if(count == list.length){             
                                res.status(200).send({ message: 'Spacer Type Updated Successfully!' }); 
                              }
                            }
                            else{
                                res.status(400).send({ message: 'Failed' });
                            }             
                          })
                          .catch(err => {
                            res.status(400).send({ message: err.message });
                          });
                
                
                    } else {
                    var imagePath = null;
                    if(data?.image_path){        
                      imagePath =   await imageConversion(data.image_path, materialType);
                    }
                    var insertSql = `INSERT INTO glass_spacer_types_master
                                     (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                                     VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
                       
                       await sequelize.query(insertSql)
                          .then(function (result) {              
                            if(result && result.length> 0){
                              count = count + 1;
                              if(count == list.length){             
                                res.status(200).send({ message: 'Spacer Type Successfully Created!' }); 
                              }
                            }
                            else{
                                res.status(400).send({ message: 'Failed' });
                            }             
                          })
                          .catch(err => {
                            res.status(400).send({ message: err.message });
                          });
                        }  
                      });
              }

              if(materialType != null && materialType == 'strengthTypes'){
                list.forEach( async (data) => {
                  if(data?.id){
                    var imagePath = "";
                  if(data?.image_path){       
                    //imagePath =   await imageConversion(data.image_path, materialType);
                  }    
                  var updateSql = `UPDATE glass_strength_types_master
                                   SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                                   modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                                   WHERE id=${data.id}`;                 
                     
                     await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                        .then(function (result) {              
                          if(result && result.length> 0){
                            count = count + 1;
                            if(count == list.length){             
                              res.status(200).send({ message: 'Strength Updated Successfully!' }); 
                            }
                          }
                          else{
                              res.status(400).send({ message: 'Failed' });
                          }             
                        })
                        .catch(err => {
                          res.status(400).send({ message: err.message });
                        });
              
              
                  } else {
                  var imagePath = null;
                  if(data?.image_path){        
                    imagePath =   await imageConversion(data.image_path, materialType);
                  }
                  var insertSql = `INSERT INTO glass_strength_types_master
                                   (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                                   VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
                     
                     await sequelize.query(insertSql)
                        .then(function (result) {              
                          if(result && result.length> 0){
                            count = count + 1;
                            if(count == list.length){             
                              res.status(200).send({ message: 'Strength Type Successfully Created!' }); 
                            }
                          }
                          else{
                              res.status(400).send({ message: 'Failed' });
                          }             
                        })
                        .catch(err => {
                          res.status(400).send({ message: err.message });
                        });
                      }   
                    });
                  }

                  if(materialType != null && materialType == 'thickness'){
                    list.forEach( async (data) => {
                      if(data?.id){
                        var imagePath = "";
                      if(data?.image_path){       
                        //imagePath =   await imageConversion(data.image_path, materialType);
                      }    
                      var updateSql = `UPDATE glass_thickness_types_master
                                       SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                                       modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                                       WHERE id=${data.id}`;                 
                         
                         await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                            .then(function (result) {              
                              if(result && result.length> 0){
                                count = count + 1;
                                if(count == list.length){             
                                  res.status(200).send({ message: 'Thickness Updated Successfully!' }); 
                                }
                              }
                              else{
                                  res.status(400).send({ message: 'Failed' });
                              }             
                            })
                            .catch(err => {
                              res.status(400).send({ message: err.message });
                            });
                  
                  
                      } else {
                      var imagePath = null;
                      if(data?.image_path){        
                        imagePath =   await imageConversion(data.image_path, materialType);
                      }
                      var insertSql = `INSERT INTO glass_thickness_types_master
                                       (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                                       VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
                         
                         await sequelize.query(insertSql)
                            .then(function (result) {              
                              if(result && result.length> 0){
                                count = count + 1;
                                if(count == list.length){             
                                  res.status(200).send({ message: 'Thickness Type Successfully Created!' }); 
                                }
                              }
                              else{
                                  res.status(400).send({ message: 'Failed' });
                              }             
                            })
                            .catch(err => {
                              res.status(400).send({ message: err.message });
                            });
                          }   
                        });
                      }

                      if(materialType != null && materialType == 'tint'){
                        list.forEach( async (data) => {
                          if(data?.id){
                            var imagePath = "";
                          if(data?.image_path){       
                            //imagePath =   await imageConversion(data.image_path, materialType);
                          }    
                          var updateSql = `UPDATE glass_tint_types_master
                                           SET name='${data?.name || 'NULL'}', description='${data?.description || 'NULL'}', is_active=${data?.isActive || 'NULL'},
                                           modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, image_path='${imagePath}', vendor_id=${data?.vendor_id || 'NULL'}
                                           WHERE id=${data.id}`;                 
                             
                             await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                                .then(function (result) {              
                                  if(result && result.length> 0){
                                    count = count + 1;
                                    if(count == list.length){             
                                      res.status(200).send({ message: 'Tint Updated Successfully!' }); 
                                    }
                                  }
                                  else{
                                      res.status(400).send({ message: 'Failed' });
                                  }             
                                })
                                .catch(err => {
                                  res.status(400).send({ message: err.message });
                                });
                      
                      
                          } else {
                          var imagePath = null;
                          if(data?.image_path){        
                            imagePath =   await imageConversion(data.image_path, materialType);
                          }
                          var insertSql = `INSERT INTO glass_tint_types_master
                                           (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
                                           VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                
                             
                             await sequelize.query(insertSql)
                                .then(function (result) {              
                                  if(result && result.length> 0){
                                    count = count + 1;
                                    if(count == list.length){             
                                      res.status(200).send({ message: 'Tint Successfully Created!' }); 
                                    }
                                  }
                                  else{
                                      res.status(400).send({ message: 'Failed' });
                                  }             
                                })
                                .catch(err => {
                                  res.status(400).send({ message: err.message });
                                });
                              } 
                            });
                          }
      
};

exports.getGlassGlazingMasterList = (req, res) =>{

  var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_glazing_master where id not in (select glass_glazing_master_id from glass_types_glazing where glass_types_master_id = ${req.query.glass_type_id})`;
    
  } else {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
    modified_date, image_path, vendor_id FROM glass_glazing_master where user_id = ${req.userId}`;
  }
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getGlassLowEMasterList = (req, res) =>{

  var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_lowe_types_master where id not in (select glass_lowe_types_master_id from glass_types_lowe where glass_types_master_id = ${req.query.glass_type_id})`;
    
  } else {
    var selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
    modified_date, image_path, vendor_id FROM glass_lowe_types_master where user_id = ${req.userId}`;
  }

  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getGlassObscureMasterList = (req, res) =>{

  var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_obscure_glass_types_master where id not in (select glass_obscure_glass_types_master_id from glass_types_obscure_glass where glass_types_master_id = ${req.query.glass_type_id})`;
  } else {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
    modified_date, image_path, vendor_id FROM glass_obscure_glass_types_master where user_id = ${req.userId}`;
  }

  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getGlassSpacerFinishMasterList = (req, res) =>{
  
  var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_spacer_finish_types_master where id not in (select glass_spacer_finish_types_master_id from glass_types_spacer_finish where glass_types_master_id = ${req.query.glass_type_id})`;
  } else {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
  modified_date, image_path, vendor_id FROM glass_spacer_finish_types_master where user_id = ${req.userId}`;
  }

  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getGlassSpacerTypesMasterList = (req, res) =>{

  
  var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_spacer_types_master where id not in (select glass_spacer_types_master_id from glass_types_spacer where glass_types_master_id = ${req.query.glass_type_id})`;
  } else {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
    modified_date, image_path, vendor_id FROM glass_spacer_types_master where user_id = ${req.userId}`;
  }  
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getGlassStrengthTypesMasterList = (req, res) =>{

  
  var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_strength_types_master where id not in (select glass_strength_types_master_id from glass_types_strength where glass_types_master_id = ${req.query.glass_type_id})`;
  } else {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
    modified_date, image_path, vendor_id FROM glass_strength_types_master where user_id = ${req.userId}`;
  }   
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getGlassThicknessMasterList = (req, res) =>{  
  
  var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_thickness_types_master where id not in (select glass_thickness_types_master_id from glass_types_thickness where glass_types_master_id = ${req.query.glass_type_id})`;
  } else {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
    modified_date, image_path, vendor_id FROM glass_thickness_types_master where user_id = ${req.userId}`;
  }
  
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getGlassTintMasterList = (req, res) =>{


var selectSql= null;
  if (req?.query?.glass_type_id) {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date, modified_by, modified_date, image_path, vendor_id
    FROM glass_tint_types_master where id not in (select glass_tint_types_master_id from glass_types_tint where glass_types_master_id = ${req.query.glass_type_id})`;
  } else {
    selectSql = `SELECT id, name, description, is_active, user_id, created_by, created_date,modified_by,
    modified_date, image_path, vendor_id FROM glass_tint_types_master where user_id = ${req.userId}`;
  }
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {      
    res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};

async function imageConversion(baseSixtyFourString, type) {
  let imaheUniqueName=Date.now() + '.png';
let path='././public/images/glass/'+type+'/' + imaheUniqueName;
let sendPath ='images/glass/'+type+'/'+imaheUniqueName;
  let dataString = baseSixtyFourString;
  let base64Image = dataString.split(';base64,').pop();
  var fs = require("fs");


  return new Promise(function(resolve, reject) {
    fs.writeFile(path, base64Image, 'base64', function(err) {
        if (err) reject(err);
        else resolve(sendPath);
    });
});

}

async function imageUpload(image) {
  console.log("image >>> >> > ");
  return new Promise(function(resolve, reject) {
    multer({storage: storage}).single(image)
  });
}


exports.uploadGlazingImage = async (req, res) => {



console.log('---------------');

  var data = req.body;

  //var imagePath = await imageUpload(data.image_path);
  var imagePath = req?.file?.path || null;
  console.log(imagePath);
  console.log(req.body.name);
  console.log(req.body.description); 
  

  res.status(200).send({ message: 'Successfully Created!' });

  // var insertSql = `INSERT INTO glass_glazing_master
  // (name, description, is_active, user_id, created_by, modified_by, image_path, vendor_id)
  // VALUES('${data?.name || "NULL"}', '${data?.description || null}', 1, ${req.userId}, ${req.userId}, ${req.userId}, '${imagePath!= null ? imagePath : null}', ${data.vendor_id});`;                

  //     await sequelize.query(insertSql)
  //     .then(function (result) {              
  //     if(result && result.length> 0){
  //         count = count + 1;
  //         if(count == list.length){         
  //            res.status(200).send({ message: 'Glazing Type Successfully Created!' }); 
  //        }
  //     } else{
  //            res.status(400).send({ message: 'Failed' });
  //     }             
  //     }).catch(err => {
  //           res.status(400).send({ message: err.message });
  //     });



};