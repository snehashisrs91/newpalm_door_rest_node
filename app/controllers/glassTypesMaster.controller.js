const db = require("../models");
const sequelize = db.sequelize;

/**
 * Save Glass Types Master with all details
 * @param {*} req 
 * @param {*} res 
 */

exports.gtm_create = async (req, res) =>{

    var insertStatus = false;
    let glassTypeMasterId = 0;
    
    var imagePath=null;
      if(req?.body?.glass_types_master?.image_path){
        
          imagePath =   await imageConversion(req?.body?.glass_types_master?.image_path, 'glassTypes');
      } 
      
      var insertgtmSql = `INSERT INTO glass_types_master (name, description, vendor_id, is_active, user_id,
        created_by, modified_by, image_path, bom) VALUES
        ('${req?.body?.glass_types_master?.name || 'NULL'}', '${req?.body?.glass_types_master?.description || 'NULL'}',
          ${req.body.glass_types_master?.vendor_id || 'NULL'}, ${1}, ${req.userId}, ${req.userId},
          ${req.userId}, '${imagePath? imagePath:'NULL'}', ${req?.body?.glass_types_master?.bom || 0.0})`;

      await sequelize.query(insertgtmSql)
        .then(function (result) {            
          if(result && result.length> 0){
            glassTypeMasterId=result[0];
            insertStatus = true;            
          }else{
               res.status(400).send({ message: 'Failed' });
              }             
          }).catch(() => {
              res.status(400).send({ message: 'Unable to save Glass Type Master data' });
          });
        
          if(req?.body?.glass_types_master?.glass_types_glazing_list){
            var list = req.body.glass_types_master.glass_types_glazing_list;
            list.forEach(async (data) => {
              
                var insertGlazingSql = `INSERT INTO glass_types_glazing (glass_types_master_id, glass_glazing_master_id,
                                      user_id, is_active, created_by, modified_by) VALUES
                                      (${glassTypeMasterId}, ${data?.glass_glazing_master_id || 'NULL'}, ${req.userId}, ${1},
                                      ${req.userId},${req.userId})`;
  
                  await sequelize.query(insertGlazingSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      insertStatus = true;
                    } else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  }).catch(() => {
                    res.status(400).send({ message: 'Unable to save glass type glazing' });
                  });
                           
            });
          }

        if(req?.body?.glass_types_master?.glass_types_lowe_list){
          var list = req.body.glass_types_master.glass_types_lowe_list;
          list.forEach(async (data) => {
            
              var insertLoweeSql = `INSERT INTO glass_types_lowe (glass_types_master_id, glass_lowe_types_master_id,
                                    user_id, is_active, created_by, modified_by) VALUES
                                    (${glassTypeMasterId}, ${data?.glass_lowe_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                    ${req.userId},${req.userId})`;

                await sequelize.query(insertLoweeSql)
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  } else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                }).catch(() => {
                  res.status(400).send({ message: 'Unable to save glass type lowee' });
                });
                         
          });
        }

        if(req?.body?.glass_types_master?.glass_types_obscure_glass_list){
            var list = req.body.glass_types_master.glass_types_obscure_glass_list;
            list.forEach(async (data) => {
              
                var insertObscureGlassSql = `INSERT INTO glass_types_obscure_glass (glass_types_master_id, glass_obscure_glass_types_master_id,
                                      user_id, is_active, created_by, modified_by) VALUES
                                      (${glassTypeMasterId}, ${data?.glass_obscure_glass_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                      ${req.userId}, ${req.userId})`;
  
                  await sequelize.query(insertObscureGlassSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      insertStatus = true;
                    } else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  }).catch(() => {
                    res.status(400).send({ message: 'Unable to save glass type Obscure Glass' });
                  });
                           
            });
          }

          if(req?.body?.glass_types_master?.glass_types_spacer_list){
            var list = req.body.glass_types_master.glass_types_spacer_list;
            list.forEach(async (data) => {
              
                var insertSpacerSql = `INSERT INTO glass_types_spacer (glass_types_master_id, glass_spacer_types_master_id,
                                      user_id, is_active, created_by, modified_by) VALUES
                                      (${glassTypeMasterId}, ${data?.glass_spacer_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                      ${req.userId}, ${req.userId})`;
  
                  await sequelize.query(insertSpacerSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      insertStatus = true;
                    } else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  }).catch(() => {
                    res.status(400).send({ message: 'Unable to save glass type Spacer' });
                  });
                           
            });
          }

          if(req?.body?.glass_types_master?.glass_types_spacer_finish_list){
            var list = req.body.glass_types_master.glass_types_spacer_finish_list;
            list.forEach(async (data) => {
              
                var insertSpacerFinishSql = `INSERT INTO glass_types_spacer_finish (glass_types_master_id, glass_spacer_finish_types_master_id,
                                      user_id, is_active, created_by, modified_by) VALUES
                                      (${glassTypeMasterId}, ${data?.glass_spacer_finish_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                      ${req.userId}, ${req.userId})`;
  
                  await sequelize.query(insertSpacerFinishSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      insertStatus = true;
                    } else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  }).catch(() => {
                    res.status(400).send({ message: 'Unable to save glass type Spacer Finish' });
                  });
                           
            });
          }

          if(req?.body?.glass_types_master?.glass_types_strength_list){
            var list = req.body.glass_types_master.glass_types_strength_list;
            list.forEach(async (data) => {
              
                var insertStrengthSql = `INSERT INTO glass_types_strength (glass_types_master_id, glass_strength_types_master_id,
                                      user_id, is_active, created_by, modified_by) VALUES
                                      (${glassTypeMasterId}, ${data?.glass_strength_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                      ${req.userId}, ${req.userId})`;
  
                  await sequelize.query(insertStrengthSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      insertStatus = true;
                    } else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  }).catch(() => {
                    res.status(400).send({ message: 'Unable to save glass type strength' });
                  });
                           
            });
          }

          if(req?.body?.glass_types_master?.glass_types_thickness_list){
            var list = req.body.glass_types_master.glass_types_thickness_list;
            list.forEach(async (data) => {
              
                var insertThicknessSql = `INSERT INTO glass_types_thickness (glass_types_master_id, glass_thickness_types_master_id,
                                      user_id, is_active, created_by, modified_by) VALUES
                                      (${glassTypeMasterId}, ${data?.glass_thickness_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                      ${req.userId}, ${req.userId})`;
  
                  await sequelize.query(insertThicknessSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      insertStatus = true;
                    } else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  }).catch(() => {
                    res.status(400).send({ message: 'Unable to save glass type Thickness' });
                  });
                           
            });
          }

          if(req?.body?.glass_types_master?.glass_types_tint_list){
            var list = req.body.glass_types_master.glass_types_tint_list;
            list.forEach(async (data) => {
              
                var insertTintSql = `INSERT INTO glass_types_tint (glass_types_master_id, glass_tint_types_master_id,
                                      user_id, is_active, created_by, modified_by) VALUES
                                      (${glassTypeMasterId}, ${data?.glass_tint_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                      ${req.userId}, ${req.userId})`;
  
                  await sequelize.query(insertTintSql)
                  .then(function (result) {              
                    if(result && result.length> 0){
                      insertStatus = true;
                    } else{
                        res.status(400).send({ message: 'Failed' });
                    }             
                  }).catch(() => {
                    res.status(400).send({ message: 'Unable to save glass type Tint' });
                  });
                           
            });
          }
          if(insertStatus){
            res.status(200).send({ message: 'Successfully Saved!' });
          }else{
            res.status(400).send({ message:  'Failed!'});
          }            
        
};

/**
 * Update Glass Type Master
 * @param {*} req 
 * @param {*} res 
 */
exports.gtm_update = async (req, res) =>{

  var insertStatus = true;
  let glassTypeMasterId = 0;
  if(req?.body?.glass_types_master?.id) {
    glassTypeMasterId = req.body.glass_types_master.id;
  var imagePath=null;
  var updateSql = null; 
    if(req?.body?.glass_types_master?.image) { 
        imagePath =   await imageConversion(req?.body?.glass_types_master?.image, 'glassTypes');
        updateSql = `UPDATE glass_types_master
                     SET name='${req?.body?.glass_types_master?.name || 'NULL'}', description='${req?.body?.glass_types_master?.description || 'NULL'}',
                     vendor_id= ${req.body.glass_types_master?.vendor_id || 'NULL'}, modified_by= ${req.userId}, image_path='${imagePath? imagePath:'NULL'}', bom = ${req?.body?.glass_types_master?.bom || 0.0}
                     WHERE id= ${req.body.glass_types_master.id}`;
    } else {
        updateSql = `UPDATE glass_types_master
                     SET name='${req?.body?.glass_types_master?.name || 'NULL'}', description='${req?.body?.glass_types_master?.description || 'NULL'}',
                     vendor_id= ${req.body.glass_types_master?.vendor_id || 'NULL'}, modified_by= ${req.userId}, image_path='${req?.body?.glass_types_master?.image_path || 'NULL'}', bom = ${req?.body?.glass_types_master?.bom || 0.0}
                     WHERE id= ${req.body.glass_types_master.id}`;
    }
      await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
      .then(function (result) {            
        if(result && result.length> 0){
          
          insertStatus = true;            
        }else{
             res.status(400).send({ message: 'Failed' });
            }             
        }).catch(() => {
            res.status(400).send({ message: 'Unable to update Glass Type Master data' });
        });
      
        if(req?.body?.glass_types_master?.glass_types_glazing_list){
          var list = req.body.glass_types_master.glass_types_glazing_list;
          list.forEach(async (data) => {

            if(data?.id) {

                var updateGlazingSql =`UPDATE glass_types_glazing set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

                await sequelize.query(updateGlazingSql, { type: sequelize.QueryTypes.UPDATE })
                .then(function (result) {              
                if(result && result.length> 0){
                insertStatus = true;
                } else{
                  res.status(400).send({ message: 'Failed' });
                }             
                }).catch(() => {
                res.status(400).send({ message: 'Unable to update glass type glazing' });
                });

            } else {
              var insertGlazingSql = `INSERT INTO glass_types_glazing (glass_types_master_id, glass_glazing_master_id,
                user_id, is_active, created_by, modified_by) VALUES
                (${glassTypeMasterId}, ${data?.glass_glazing_master_id || 'NULL'}, ${req.userId}, ${1},
                ${req.userId},${req.userId})`;

                await sequelize.query(insertGlazingSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                if(result && result.length> 0){
                insertStatus = true;
                } else{
                  res.status(400).send({ message: 'Failed' });
                }             
                }).catch(() => {
                res.status(400).send({ message: 'Unable to update glass type glazing' });
                });
            }
                         
          });
        }

      if(req?.body?.glass_types_master?.glass_types_lowe_list){
        var list = req.body.glass_types_master.glass_types_lowe_list;
        list.forEach(async (data) => {         
            

              if(data?.id) {
                var updateSql =`UPDATE glass_types_lowe set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

                await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                .then(function (result) {              
                if(result && result.length> 0){
                insertStatus = true;
                } else{
                  res.status(400).send({ message: 'Failed' });
                }             
                }).catch(() => {
                res.status(400).send({ message: 'Unable to update glass type lowee' });
                });
              } else {
                var insertLoweeSql = `INSERT INTO glass_types_lowe (glass_types_master_id, glass_lowe_types_master_id,
                  user_id, is_active, created_by, modified_by) VALUES
                  (${glassTypeMasterId}, ${data?.glass_lowe_types_master_id || 'NULL'}, ${req.userId}, ${1},
                  ${req.userId},${req.userId})`;

                await sequelize.query(insertLoweeSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  } else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                }).catch(() => {
                  res.status(400).send({ message: 'Unable to update glass type lowee' });
                });
              }              
                       
        });
      }

      if(req?.body?.glass_types_master?.glass_types_obscure_glass_list){
          var list = req.body.glass_types_master.glass_types_obscure_glass_list;
          list.forEach(async (data) => {

            if(data?.id) {
              var updateSql =`UPDATE glass_types_obscure_glass set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

                await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
                .then(function (result) {              
                if(result && result.length> 0){
                insertStatus = true;
                } else{
                  res.status(400).send({ message: 'Failed' });
                }             
                }).catch(() => {
                res.status(400).send({ message: 'Unable to update glass type obscure' });
                });

            } else {
              var insertObscureGlassSql = `INSERT INTO glass_types_obscure_glass (glass_types_master_id, glass_obscure_glass_types_master_id,
                user_id, is_active, created_by, modified_by) VALUES
                (${glassTypeMasterId}, ${data?.glass_obscure_glass_types_master_id || 'NULL'}, ${req.userId}, ${1},
                ${req.userId}, ${req.userId})`;
                await sequelize.query(insertObscureGlassSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                if(result && result.length> 0){
                insertStatus = true;
                } else{
                  res.status(400).send({ message: 'Failed' });
                }             
                }).catch(() => {
                res.status(400).send({ message: 'Unable to update glass type Obscure Glass' });
                });
            }
                         
          });
        }

        if(req?.body?.glass_types_master?.glass_types_spacer_list){
          var list = req.body.glass_types_master.glass_types_spacer_list;
          list.forEach(async (data) => {

            if (data?.id) {
              var updateSql =`UPDATE glass_types_spacer set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

              await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
              .then(function (result) {              
              if(result && result.length> 0){
              insertStatus = true;
              } else{
                res.status(400).send({ message: 'Failed' });
              }             
              }).catch(() => {
              res.status(400).send({ message: 'Unable to update glass type spacer' });
              });
            } else {
            
              var insertSpacerSql = `INSERT INTO glass_types_spacer (glass_types_master_id, glass_spacer_types_master_id,
                                    user_id, is_active, created_by, modified_by) VALUES
                                    (${glassTypeMasterId}, ${data?.glass_spacer_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                    ${req.userId}, ${req.userId})`;

                await sequelize.query(insertSpacerSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  } else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                }).catch(() => {
                  res.status(400).send({ message: 'Unable to update glass type Spacer' });
                });
              }
                         
          });
        }

        if(req?.body?.glass_types_master?.glass_types_spacer_finish_list){
          var list = req.body.glass_types_master.glass_types_spacer_finish_list;
          list.forEach(async (data) => {
            
            if(data?.id) {
              var updateSql =`UPDATE glass_types_spacer_finish set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

              await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
              .then(function (result) {              
              if(result && result.length> 0){
              insertStatus = true;
              } else{
                res.status(400).send({ message: 'Failed' });
              }             
              }).catch(() => {
              res.status(400).send({ message: 'Unable to update glass type spacer finish' });
              });
            } else {
              var insertSpacerFinishSql = `INSERT INTO glass_types_spacer_finish (glass_types_master_id, glass_spacer_finish_types_master_id,
                                    user_id, is_active, created_by, modified_by) VALUES
                                    (${glassTypeMasterId}, ${data?.glass_spacer_finish_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                    ${req.userId}, ${req.userId})`;

                await sequelize.query(insertSpacerFinishSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  } else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                }).catch(() => {
                  res.status(400).send({ message: 'Unable to update glass type Spacer Finish' });
                });
              }
                         
          });
        }

        if(req?.body?.glass_types_master?.glass_types_strength_list){
          var list = req.body.glass_types_master.glass_types_strength_list;
          list.forEach(async (data) => {

            if (data?.id) {
              var updateSql =`UPDATE glass_types_strength set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

              await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
              .then(function (result) {              
              if(result && result.length> 0){
              insertStatus = true;
              } else{
                res.status(400).send({ message: 'Failed' });
              }             
              }).catch(() => {
              res.status(400).send({ message: 'Unable to update glass type strength' });
              });
            } else {
            
              var insertStrengthSql = `INSERT INTO glass_types_strength (glass_types_master_id, glass_strength_types_master_id,
                                    user_id, is_active, created_by, modified_by) VALUES
                                    (${glassTypeMasterId}, ${data?.glass_strength_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                    ${req.userId}, ${req.userId})`;

                await sequelize.query(insertStrengthSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  } else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                }).catch(() => {
                  res.status(400).send({ message: 'Unable to update glass type strength' });
                });
              }
                         
          });
        }

        if(req?.body?.glass_types_master?.glass_types_thickness_list){
          var list = req.body.glass_types_master.glass_types_thickness_list;
          list.forEach(async (data) => {
            
            if(data?.id) {
              var updateSql =`UPDATE glass_types_thickness set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

              await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
              .then(function (result) {              
              if(result && result.length> 0){
              insertStatus = true;
              } else{
                res.status(400).send({ message: 'Failed' });
              }             
              }).catch(() => {
              res.status(400).send({ message: 'Unable to update glass type thickness' });
              });
            } else {            
              var insertThicknessSql = `INSERT INTO glass_types_thickness (glass_types_master_id, glass_thickness_types_master_id,
                                    user_id, is_active, created_by, modified_by) VALUES
                                    (${glassTypeMasterId}, ${data?.glass_thickness_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                    ${req.userId}, ${req.userId})`;

                await sequelize.query(insertThicknessSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  } else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                }).catch(() => {
                  res.status(400).send({ message: 'Unable to update glass type Thickness' });
                });
              }
                         
          });
        }

        if(req?.body?.glass_types_master?.glass_types_tint_list){
          var list = req.body.glass_types_master.glass_types_tint_list;
          list.forEach(async (data) => {
            if(data?.id) {
              var updateSql =`UPDATE glass_types_tint set is_active= ${data.is_active}, modified_by=${req.userId} where id = ${data.id}`;

              await sequelize.query(updateSql, { type: sequelize.QueryTypes.UPDATE })
              .then(function (result) {              
              if(result && result.length> 0){
              insertStatus = true;
              } else{
                res.status(400).send({ message: 'Failed' });
              }             
              }).catch(() => {
              res.status(400).send({ message: 'Unable to update glass type tint' });
              });
            } else {
            
              var insertTintSql = `INSERT INTO glass_types_tint (glass_types_master_id, glass_tint_types_master_id,
                                    user_id, is_active, created_by, modified_by) VALUES
                                    (${glassTypeMasterId}, ${data?.glass_tint_types_master_id || 'NULL'}, ${req.userId}, ${1},
                                    ${req.userId}, ${req.userId})`;

                await sequelize.query(insertTintSql, { type: sequelize.QueryTypes.INSERT })
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  } else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                }).catch(() => {
                  res.status(400).send({ message: 'Unable to update glass type Tint' });
                });
              }
                         
          });
        }
      } else {
        res.status(400).send({ message:  'Glass Type Id not provided!'});
      }
        if(insertStatus){
          res.status(200).send({ message: 'Successfully Updated!' });
        }else{
          res.status(400).send({ message:  'Failed!'});
        }            
      
};


/**
 * Get Glass Types Master List
 * @param {*} req 
 * @param {*} res 
 */

exports.getGlassTypesMasterList = (req, res) =>{
  
    var selectSql = `SELECT id, name, description, vendor_id, is_active, created_by, created_date, modified_by, modified_date, image_path, bom
                     FROM glass_types_master where user_id = ${req.userId}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };
  

  exports.getGlassTypesGlazingList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_glazing_master_id,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_glazing gt
    inner join glass_glazing_master gm on gm.id = gt.glass_glazing_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id = ${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };

  exports.getGlassTypesLowEList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_lowe_types_master_id ,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_lowe gt
    inner join glass_lowe_types_master gm on gm.id = gt.glass_lowe_types_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id = ${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };

  exports.getGlassTypesObscureList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_obscure_glass_types_master_id,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_obscure_glass gt
    inner join glass_obscure_glass_types_master gm on gm.id = gt.glass_obscure_glass_types_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id =${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };

  exports.getGlassTypesSpacerFinishList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_spacer_finish_types_master_id ,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_spacer_finish gt
    inner join glass_spacer_finish_types_master gm on gm.id = gt.glass_spacer_finish_types_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id =${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };

  exports.getGlassTypesSpacerTypesList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_spacer_types_master_id ,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_spacer gt
    inner join glass_spacer_types_master gm on gm.id = gt.glass_spacer_types_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id = ${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };

  exports.getGlassTypesStrengthTypesList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_strength_types_master_id ,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_strength gt
    inner join glass_strength_types_master gm on gm.id = gt.glass_strength_types_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id = ${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };

  exports.getGlassTypesThicknessList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_thickness_types_master_id ,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_thickness gt
    inner join glass_thickness_types_master gm on gm.id = gt.glass_thickness_types_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id = ${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };

  exports.getGlassTypesTintList = (req, res) =>{
    
    if (!req.query.glass_type_id){
      res.status(400).send({ message: 'Please provide Glass Type'});
    }
      
    var selectSql = `SELECT gt.id, gm.name, gm.description, gm.image_path, gt.glass_types_master_id, gt.glass_tint_types_master_id ,
    gt.user_id, gm.vendor_id, gt.is_active, gt.created_by, gt.created_date,
    gt.modified_by, gt.modified_date
    FROM glass_types_tint gt
    inner join glass_tint_types_master gm on gm.id = gt.glass_tint_types_master_id
    where gt.glass_types_master_id = ${req.query.glass_type_id} and gt.user_id = ${req.userId} and gt.is_active = ${1}`;                     
           
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  };


  exports.glass_types_master_details = async (req, res) =>{

    let data={};
    data.glassType = {};
    
    let is_glass_type_id=false;
   if(req?.query?.glass_type_id){
   var glassTypesMasterSql = `select * from glass_types_master where id = ${req.query.glass_type_id} and user_id = ${req.userId}`;
           
    await sequelize.query(glassTypesMasterSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {  
      if(records && records.length > 0 ){
        is_glass_type_id = true;
        data.glassType = records && records.length > 0 ? records[0]:[];
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  
    if(is_glass_type_id) {
  
      var glassTypesGlazingSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_glazing_master_id, gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name, ggm.description, ggm.image_path
      from glass_types_glazing gtg
      join glass_glazing_master ggm on ggm.id = gtg.glass_glazing_master_id
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesGlazingSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.glazing = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
    
    
      var glassTypesLoweSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_lowe_types_master_id , gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name, ggm.description, ggm.image_path
      from glass_types_lowe gtg
      join glass_lowe_types_master ggm on ggm.id = gtg.glass_lowe_types_master_id
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesLoweSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.lowe = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  
      var glassTypesObscureSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_obscure_glass_types_master_id , gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name, ggm.description, ggm.image_path
      from glass_types_obscure_glass gtg
      join glass_obscure_glass_types_master ggm on ggm.id = gtg.glass_obscure_glass_types_master_id
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesObscureSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.obscure = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });

      var glassTypesSpacerFinishSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_spacer_finish_types_master_id , gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name, ggm.description, ggm.image_path
      from glass_types_spacer_finish gtg
      join glass_spacer_finish_types_master ggm on ggm.id = gtg.glass_spacer_finish_types_master_id
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesSpacerFinishSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.spacerFinish = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
      
      var glassTypesSpacerSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_spacer_types_master_id , gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name, ggm.description, ggm.image_path
      from glass_types_spacer gtg
      join glass_spacer_types_master ggm on ggm.id = gtg.glass_spacer_types_master_id
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesSpacerSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.spacer = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });

      var glassTypesStrengthSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_strength_types_master_id , gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name , ggm.description , ggm.image_path
      from glass_types_strength gtg
      join glass_strength_types_master ggm on ggm.id = gtg.glass_strength_types_master_id 
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesStrengthSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.strength = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });

      var glassTypesThicknessSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_thickness_types_master_id , gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name, ggm.description , ggm.image_path
      from glass_types_thickness gtg
      join glass_thickness_types_master ggm on ggm.id = gtg.glass_thickness_types_master_id 
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesThicknessSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.thickness = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });

      var glassTypesTintSql = `select gtg.id, gtg.glass_types_master_id, gtg.glass_tint_types_master_id , gtg.user_id, ggm.vendor_id, gtg.is_active, gtg.created_by, gtg.created_date, gtg.modified_by, gtg.modified_date,
      ggm.name, ggm.description, ggm.image_path
      from glass_types_tint gtg
      join glass_tint_types_master ggm on ggm.id = gtg.glass_tint_types_master_id 
      where gtg.glass_types_master_id = ${req.query.glass_type_id}`;
             
      await sequelize.query(glassTypesTintSql, { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {      
        if(records && records.length > 0 ){
         
          data.glassType.tint = records && records.length > 0 ? records:[];
        }
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });


    } else {
      res.status(400).send({ message: 'Glass Type Details not found!' });
    }
    res.status(200).send(data);
    } else {
      res.status(400).send({ message: 'Glass Type not provided!' });
    }
  
  }

  /**
   * Update Glass Type Material
   * @param {*} req 
   * @param {*} res 
   */

  exports.updateGlassMaterials = async (req, res) =>{
    var materialType = req.params['type'];
    console.log(materialType);
  
    var list = req.body;
    let count = 0;
  
    if(materialType != null && materialType == 'glazing'){
    list.forEach( async (data) => {
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
                  res.status(200).send({ message: 'Glazing TYPE Successfully Created!' }); 
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
  
      if(materialType != null && materialType == 'lowee'){
        list.forEach( async (data) => {
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
            });
          }
  
          if(materialType != null && materialType == 'obscure'){
            list.forEach( async (data) => {
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
                });
              }
  
              if(materialType != null && materialType == 'spacerFinish'){
                list.forEach( async (data) => {
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
                    });
                  }
  
              if(materialType != null && materialType == 'spacerTypes'){
                    list.forEach( async (data) => {
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
                        });
                }
  
                if(materialType != null && materialType == 'strengthTypes'){
                  list.forEach( async (data) => {
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
                      });
                    }
  
                    if(materialType != null && materialType == 'thickness'){
                      list.forEach( async (data) => {
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
                          });
                        }
  
                        if(materialType != null && materialType == 'tint'){
                          list.forEach( async (data) => {
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
                              });
                            }
        
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