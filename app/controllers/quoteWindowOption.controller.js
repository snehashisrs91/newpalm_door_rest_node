//const { quotes } = require("../models");
const db = require("../models");
const Quotes = db.quotes;


const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

 exports.qwo_create = async (req, res) =>{
          
        var insertStatus = false;
        var updateStatus = false;
        let quoteId = 0;
      if(req.body.quotes?.quotes_id){              
        var imagePath=null;
        if(req?.body?.quotes?.quotes_image_path){
            imagePath =   await imageConversion(req?.body?.quotes?.quotes_image_path);

        }     
           var updateQuoteMasterSql = `UPDATE quotes_master
           SET quotes_code='${req?.body?.quotes?.quotes_code || 'NULL'}', quotes_project_id=${req.body.quotes?.project_id || 'NULL'},
           quotes_for_user_id=${req.userId}, modified_by=${req.userId}, modified_date=${'CURRENT_TIMESTAMP'}, quotes_status='${'INCOMPLETE'}',
           number_of_units=${req?.body?.quotes?.number_of_units || 'NULL'}, unit_price=${req?.body?.quotes?.unit_price || 'NULL'},
           cost=${req?.body?.quotes?.cost || 'NULL'}, quotes_image_path='${imagePath? imagePath : 'NULL'}'
           WHERE quotes_id=${req.body.quotes.quotes_id}`;
           await sequelize.query(updateQuoteMasterSql)
            .then(function (result) {            
              if(result && result.length> 0){
                updateStatus = true;                
              }else{
                   res.status(400).send({ message: 'Failed to Update Quote' });
                  }             
              })
              .catch(() => {
                res.status(400).send({ message: 'Unable to save data' });
              });

      if(req.body?.quotes?.window_option){
          if(req.body.quotes.window_option.quotes_id){

          var updateWOSql = `UPDATE quote_window_option
           SET customer_id=${req.body.quotes?.window_option?.customer_id || 'NULL'}, series_id=${req.body.quotes?.window_option?.series_id || 'NULL'},
           number_of_units=${req.body.quotes?.window_option?.number_of_units || 'NULL'},width=${req.body.quotes?.window_option?.width || 'NULL'},
           height=${req.body.quotes?.window_option?.height || 'NULL'},units_quantity=${req.body.quotes?.window_option?.units_quantity || 'NULL'},
           location='${req.body.quotes?.window_option?.location || 'NULL'}', is_active=${1}, modified_by=0, modified_date=${'CURRENT_TIMESTAMP'}
           WHERE quotes_id=${req.body.quotes.quotes_id}`;

           await sequelize.query(updateWOSql)
              .then(function (result) {              
                if(result && result.length> 0){
                    updateStatus = true;
                  }
                  else{
                      res.status(400).send({ message: 'Failed to Update Window Option' });
                  }             
                })
                .catch(() => {
                  res.status(400).send({ message: 'Unable to update Window Option' });
                });
        }
      }

      if(req.body.quotes?.unit_option){        

        var uoDeleteSql = `DELETE FROM quote_unit_option WHERE quotes_id=${req.body.quotes.quotes_id}`;
        await sequelize.query(uoDeleteSql)
            .then(function (result) {            
              if(result && result.length> 0){
                updateStatus = true;
              }
                else{
                   res.status(400).send({ message: 'Failed' });
                  }             
              })
              .catch(() => {
                res.status(400).send({ message: 'Unable to save data' });
              });

        var list = req.body.quotes.unit_option;
        list.forEach(async (data) => {
          var insertUnitOptionSql = `INSERT INTO quote_unit_option (quotes_id, window_type_id, width, height, operation,
            glass_type_id, grill_id, screen_id, exterior_id, exterior_colour_id, interior_colour_id,
            hardware_id, exterior_accesseries_id, interior_accesseries_id, created_by, modified_by) VALUES
            (${req.body.quotes.quotes_id}, '${data?.window_type_id || 'NULL'}', ${data?.width  || 'NULL'},
            ${data?.height || 'NULL'},'${data?.operation || 'NULL'}',${data?.glass_type_id || 'NULL'}, ${data?.grill_id || 'NULL'},
            '${data?.screen_id || 'NULL'}',${data?.exterior_id || 'NULL'}, ${data?.exterior_colour_id || 'NULL'},
            ${data?.interior_colour_id || 'NULL'},${data?.hardware_id || 'NULL'},
            ${data?.exterior_accesseries_id || 'NULL'}, ${data?.interior_accesseries_id || 'NULL'},'${req.userId}','${req.userId}')`;

            await sequelize.query(insertUnitOptionSql)
            .then(function (result) {         
              if(result && result.length> 0){
                updateStatus = true;
              }
              else{
                  res.status(400).send({ message: 'Failed to update Unit Option' });
              }             
            })
            .catch(() => {
              res.status(400).send({ message: 'Unable to update Unit Option' });
            });            

        });        

      }
      // update bom
      if(req.body.quotes?.bom){
        var responseJsonIns = JSON.stringify(req.body.quotes.bom);      

        var bomDeleteSql = `DELETE FROM quote_bom WHERE quotes_id=${req.body.quotes.quotes_id}`;
        await sequelize.query(bomDeleteSql)
            .then(function (result) {            
              if(result && result.length> 0){
                updateStatus = true;
              }
                else{
                   res.status(400).send({ message: 'Failed' });
                  }             
              })
              .catch(() => {
                res.status(400).send({ message: 'Unable to save data' });
              });

              var data = req.body.quotes.bom;                            
                  
              var insertBomSql = `INSERT INTO quote_bom
              (quotes_id, bom, is_active, created_by, modified_by)
              VALUES(${req.body.quotes.quotes_id}, '${responseJsonIns}',${1}, ${req.userId},  ${req.userId})`;

              await sequelize.query(insertBomSql)
              .then(function (result) {              
                if(result && result.length> 0){
                  updateStatus = true;
                }
                else{
                    res.status(400).send({ message: 'Failed' });
                }             
              })
              .catch(() => {
                res.status(400).send({ message: 'Unable to save data' });
              });    

      }

      //

      if(req.body?.quotes?.glass_option){
        if(req.body.quotes.glass_option?.id){
          var data = req.body.quotes.glass_option;

        var updateGOSql = `UPDATE quote_glass_option
        SET quotes_id= ${req.body.quotes.quotes_id}, glass_types_master_id=${data?.glass_types_master_id || 'NULL'}, glass_types_glazing_id=${data?.glass_types_glazing_id || 'NULL'},
        glass_types_lowe_id=${data?.glass_types_lowe_id || 'NULL'},
        glass_types_obscure_glass_id=${data?.glass_types_obscure_glass_id || 'NULL'}, glass_types_spacer_id=${data?.glass_types_spacer_id || 'NULL'},
        glass_types_spacer_finish_id=${data?.glass_types_spacer_finish_id || 'NULL'}, glass_types_strength_id=${data?.glass_types_strength_id || 'NULL'},
        glass_types_thickness_id=${data?.glass_types_thickness_id || 'NULL'}, glass_types_tint_id=${data?.glass_types_tint_id || 'NULL'}, vendor_id=${data?.vendor_id || 'NULL'}, is_active=${1},
        modified_by=${req.userId}, energy_star='${data?.energy_star || 'NULL'}'
        WHERE id=${data.id}`;

         await sequelize.query(updateGOSql)
            .then(function (result) {              
              if(result && result.length> 0){
                  updateStatus = true;
                }
                else{
                    res.status(400).send({ message: 'Failed to Update Glass Option' });
                }             
              })
              .catch(() => {
                res.status(400).send({ message: 'Unable to update Glass Option' });
              });
      }
    }

      if(updateStatus){
        res.status(200).send({ message: 'Successfully Updated!' });
      }else{
        res.status(400).send({ message:  'Failed to Update!'});
      }
      /////////////////Insert
      } else {
        var imagePath=null;
          if(req?.body?.quotes?.quotes_image_path){
              imagePath =   await imageConversion(req?.body?.quotes?.quotes_image_path);
          } 
          
          var insertQuoteMasterSql = `INSERT INTO quotes_master (quotes_code, quotes_project_id, 
            quotes_for_user_id, created_by, modified_by, quotes_status, number_of_units,
            unit_price, cost, quotes_image_path) VALUES
            ('${'NULL'}', ${req.body.quotes?.project_id || 'NULL'}, '${req.userId}', '${req.userId}',
            '${req.userId}', '${'INCOMPLETE'}', '${req?.body?.quotes?.number_of_units || 'NULL'}', 
            ${req?.body?.quotes?.unit_price || 'NULL'}, ${req?.body?.quotes?.cost || 'NULL'},
            '${imagePath? imagePath:'NULL'}')`;

          await sequelize.query(insertQuoteMasterSql)
            .then(function (result) {            
              if(result && result.length> 0){
                quoteId=result[0];
                insertStatus = true;
                
              }
                else{
                   res.status(400).send({ message: 'Failed' });
                  }             
              })
              .catch(() => {
                res.status(400).send({ message: 'Unable to save data' });
              });

          if(req.body?.quotes?.window_option){
            if(req.body.quotes.window_option.window_option_id){
            
            } else {
              var insertWOSql = `INSERT INTO quote_window_option (quotes_id, customer_id, series_id, width, height,
                      units_quantity, location,created_by, modified_by) VALUES
                      (${quoteId}, ${req.body.quotes?.window_option?.customer_id || 'NULL'}, ${req?.body?.quotes?.window_option?.series_id || 'NULL'},
                      ${req.body.quotes?.window_option?.width || 'NULL'}, ${req.body.quotes?.window_option?.height || 'NULL'}, ${req.body.quotes?.window_option?.units_quantity || 'NULL'}, '${req.body.quotes?.window_option?.location || 'NULL'}',
                      '${req.userId}', '${req.userId}')`;
                await sequelize.query(insertWOSql)
                .then(function (result) {              
                  if(result && result.length> 0){
                    insertStatus = true;
                  }
                  else{
                      res.status(400).send({ message: 'Failed' });
                  }             
                })
                .catch(() => {
                  res.status(400).send({ message: 'Unable to save data' });
                });
              }
            }
            
            if(req.body?.quotes?.unit_option){
              var list = req.body.quotes.unit_option;
              list.forEach(async (data) => {
                if(data.quote_unit_option_id){

                }else{
                  var insertUnitSql = `INSERT INTO quote_unit_option (quotes_id, window_type_id, width, height, operation,
                    glass_type_id, grill_id, screen_id, exterior_id, exterior_colour_id, interior_colour_id,
                    hardware_id, exterior_accesseries_id, interior_accesseries_id, created_by, modified_by) VALUES
                    (${quoteId}, '${data?.window_type_id || 'NULL'}', ${data?.width  || 'NULL'},
                    ${data?.height || 'NULL'},'${data?.operation || 'NULL'}',${data?.glass_type_id || 'NULL'}, ${data?.grill_id || 'NULL'},
                    '${data?.screen_id || 'NULL'}',${data?.exterior_id || 'NULL'}, ${data?.exterior_colour_id || 'NULL'},
                    ${data?.interior_colour_id || 'NULL'},${data?.hardware_id || 'NULL'},
                    ${data?.exterior_accesseries_id || 'NULL'}, ${data?.interior_accesseries_id || 'NULL'},${req.userId},${req.userId})`;

                    await sequelize.query(insertUnitSql)
                    .then(function (result) {              
                      if(result && result.length> 0){
                        insertStatus = true;
                      }
                      else{
                          res.status(400).send({ message: 'Failed' });
                      }             
                    })
                    .catch(() => {
                      res.status(400).send({ message: 'Unable to save data' });
                    });
                }                  
              });
            }

            //glass
            if(req?.body?.quotes?.glass_option){
              var data = req.body.quotes.glass_option;
                            
                  
                    var insertGlassSql = `INSERT INTO quote_glass_option
                    (quotes_id, glass_types_master_id, glass_types_glazing_id, glass_types_lowe_id, glass_types_obscure_glass_id,
                    glass_types_spacer_id, glass_types_spacer_finish_id, glass_types_strength_id, glass_types_thickness_id, glass_types_tint_id,
                    user_id, vendor_id, is_active, created_by, modified_by, energy_star)
                    VALUES(${quoteId}, ${data?.glass_types_master_id || 'NULL'}, ${data?.glass_types_glazing_id || 'NULL'}, ${data?.glass_types_lowe_id || 'NULL'},
                    ${data?.glass_types_obscure_glass_id || 'NULL'}, ${data?.glass_types_spacer_id || 'NULL'}, ${data?.glass_types_spacer_finish_id || 'NULL'},
                    ${data?.glass_types_strength_id || 'NULL'}, ${data?.glass_types_thickness_id || 'NULL'}, ${data?.glass_types_tint_id || 'NULL'},
                    ${req.userId}, ${data?.vendor_id || 1}, 1, ${req.userId},  ${req.userId},  '${data?.energy_star || 'NULL'}')`;

                    await sequelize.query(insertGlassSql)
                    .then(function (result) {              
                      if(result && result.length> 0){
                        insertStatus = true;
                      }
                      else{
                          res.status(400).send({ message: 'Failed' });
                      }             
                    })
                    .catch(() => {
                      res.status(400).send({ message: 'Unable to save data' });
                    });
                                
             
            }
            ////bom
            if(req?.body?.quotes?.bom){

              //var data = req.body.quotes.bom;
              console.log(req?.body?.quotes?.bom);
              //var dataBom = JSON.parse(req.body.quotes.bom);
              var responseJson = JSON.stringify(req.body.quotes.bom);                    
                  
                    var insertBomSql = `INSERT INTO quote_bom
                    (quotes_id, bom, is_active, created_by, modified_by)
                    VALUES(${quoteId}, '${responseJson}',${1}, ${req.userId},  ${req.userId})`;

                    await sequelize.query(insertBomSql)
                    .then(function (result) {              
                      if(result && result.length> 0){
                        insertStatus = true;
                      }
                      else{
                          res.status(400).send({ message: 'Failed' });
                      }             
                    })
                    .catch(() => {
                      res.status(400).send({ message: 'Unable to save data' });
                    });                                
             
            }


              if(insertStatus){
                res.status(200).send({ message: 'Successfully Saved!' });
              }else{
                res.status(400).send({ message:  'Failed!'});
              }            
            }
};


exports.quote_details = async (req, res) =>{

  let data={};
  data.quotes = {};
  let window_option={};
  let unit_option = [];
  let isQuotesValid=false;
 if(req.query.quote_id){
  var selectSql = `SELECT qm.quotes_id, qm.number_of_units,qm.quotes_code, qm.quotes_project_id, qm.quotes_for_user_id, qm.quotes_status, qm.unit_price,
  qm.cost, qm.quotes_image_path,prj.project_name
  FROM quotes_master qm 
  left join projects prj on prj.project_id = qm.quotes_project_id
  where  qm.quotes_id = ${req.query.quote_id} and qm.quotes_for_user_id = ${req.userId}` ;
         
  await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {  
    if(records && records.length > 0 ){
      isQuotesValid = true;
      data.quotes = records && records.length > 0 ? records[0]:[];
    }
    //res.status(200).send(records);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });

  if(isQuotesValid){

    var selectSqlw = `SELECT *
    FROM quote_window_option where quotes_id = ${req.query.quote_id}`;
           
    await sequelize.query(selectSqlw, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      if(records && records.length > 0 ){
       
        data.quotes.window_option = records && records.length > 0 ? records[0]:[];
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  
  
    var selectSqlu = `SELECT *
    FROM quote_unit_option where quotes_id = ${req.query.quote_id}`;
           
    await sequelize.query(selectSqlu, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      if(records && records.length > 0 ){
       
        data.quotes.unit_option = records && records.length > 0 ? records:[];
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });

    //bom
    var selectSqlb = `SELECT *
    FROM quote_bom where quotes_id = ${req.query.quote_id}`;
           
    await sequelize.query(selectSqlb, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      if(records && records.length > 0 ){
       
        data.quotes.bom = records && records.length > 0 ? records[0]:[];
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });


    //var selectSql = `SELECT *
    //FROM quote_glass_option where quotes_id = ${req.query.quote_id}`;

    var selectSqlg = `SELECT qgo.id, qgo.quotes_id, qgo.glass_types_master_id, gtm.name as glass_type_name, gtm.description as glass_type_description, gtm.image_path as glass_type_image_path,
    qgo.glass_types_glazing_id, ggm.name as glazing_name, ggm.description as glazing_description, ggm.image_path as glazing_image,
    qgo.glass_types_lowe_id, glm.name as lowe_name, glm.description as lowe_description, glm.image_path as lowe_image,
    qgo.glass_types_obscure_glass_id, gogtm.name as obscure_glass_name , gogtm.description obscure_glass_description, gogtm.image_path as obscure_glass_image,
    qgo.glass_types_spacer_id, gstm.name as spacer_types_name , gstm.description as spacer_types_description, gstm.image_path as spacer_types_image,
    qgo.glass_types_spacer_finish_id, gsftm.name as glass_spacer_finish_types_name , gsftm.description as glass_spacer_finish_types_description, gsftm.image_path as spacer_finish_image,
    qgo.glass_types_strength_id, gstnm.name as glass_strength_types_name , gstnm.description as glass_strength_types_description, gstnm.image_path as strength_types_image,
    qgo.glass_types_thickness_id,gttcm.name as thickness_types_name , gttcm.description as thickness_types_description, gttcm.image_path as thickness_type_image,
    qgo.glass_types_tint_id, gttm.name as tint_name, gttm.description as tint_description, gttm.image_path as tint_image,
    qgo.user_id, qgo.vendor_id, qgo.is_active, qgo.created_by, qgo.created_date, qgo.modified_by, qgo.modified_date, qgo.energy_star
    FROM quote_glass_option qgo
    left join quotes_master qm on qgo.quotes_id = qm.quotes_id 
    left join glass_types_master gtm on qgo.glass_types_master_id = gtm.id
    left join glass_types_glazing gtg on qgo.glass_types_glazing_id = gtg.id
    join glass_glazing_master ggm on ggm.id = gtg.glass_glazing_master_id
    left join glass_types_lowe gtl on qgo.glass_types_lowe_id = gtl.id
    join glass_lowe_types_master glm on glm.id = gtl.glass_lowe_types_master_id
    left join glass_types_obscure_glass gtog on qgo.glass_types_obscure_glass_id = gtog.id
    join glass_obscure_glass_types_master gogtm on gogtm.id = gtog.glass_obscure_glass_types_master_id
    left join glass_types_spacer gts on qgo.glass_types_spacer_id = gts.id
    join glass_spacer_types_master gstm on gstm.id = gts.glass_spacer_types_master_id
    left join glass_types_spacer_finish gtsf on qgo.glass_types_spacer_finish_id = gtsf.id
    join glass_spacer_finish_types_master gsftm on gsftm.id = gtsf.glass_spacer_finish_types_master_id
    left join glass_types_strength gtsn on qgo.glass_types_strength_id = gtsn.id
    join glass_strength_types_master gstnm on gstnm.id = gtsn.glass_strength_types_master_id 
    left join glass_types_thickness gttc on qgo.glass_types_thickness_id = gttc.id
    join glass_thickness_types_master gttcm on gttcm.id = gttc.glass_thickness_types_master_id
    left join glass_types_tint gtt on qgo.glass_types_tint_id = gtt.id
    join glass_tint_types_master gttm on gttm.id = gtt.glass_tint_types_master_id
    where qgo.quotes_id = ${req.query.quote_id}`;
           
    await sequelize.query(selectSqlg, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      if(records && records.length > 0 ){
       
        data.quotes.glass_option = records && records.length > 0 ? records:[];
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
  }

  
  res.status(200).send(data);
  }
  else{
    res.status(400).send({ message: 'Quote Id is mandetory!' });
  }

}

exports.quote_invoice_details = async (req, res) =>{

  let data={};
  data.quoteList = [];
  let isQuotesValid=false;


  if(req.query.quote_id){
    var quote={};
    var selectSql = `SELECT qm.quotes_id, qm.number_of_units,qm.quotes_code, qm.quotes_project_id,prj.project_name,
                     u.username as quotes_generator,
                     qm.quotes_status, qm.unit_price, qm.cost, qm.quotes_image_path FROM quotes_master qm 
                     left join projects prj on prj.project_id = qm.quotes_project_id
                     left join users u on u.id = qm.quotes_for_user_id
                     where  qm.quotes_id = ${req.query.quote_id} and qm.quotes_for_user_id = ${req.userId}` ;
         
  await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (records) {
    
    if(records && records.length > 0 ){
      isQuotesValid = true;
      quote = records && records.length > 0 ? records[0]:[];
      
    }
    
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });

  if(isQuotesValid){
    var selectSql = `SELECT mcm.customer_name, se.series_name,
                    qwo.number_of_units, qwo.width, qwo.height, qwo.units_quantity, qwo.location,
                    qwo.is_active, DATE(qwo.created_date) as created_date
                    FROM quote_window_option qwo left join manufac_customer_master mcm on qwo.customer_id = mcm.customer_id
                    left join series se on qwo.series_id = se.series_id 
                    where qwo.quotes_id = ${req.query.quote_id}`;           
    await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      if(records && records.length > 0 ){       
        quote.window_option = records && records.length > 0 ? records[0]:[];
      }
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });  
    var selectSql =  `SELECT quo.window_type_id, quo.width, quo.height, quo.operation, gt.glass_type, grl.grill,
                      ec.exterior_colour, ic.interior_colour, htm.hardware_type_name,
                      mem.exterior_name, mim.interior_name,
                      quo.is_active, DATE(quo.created_date) as created_date
                      FROM quote_unit_option quo left join glass_types gt on quo.glass_type_id = gt.glass_type_id
                      left join grilles grl on quo.grill_id = grl.grilles_id
                      left join exterior_colours ec on quo.exterior_colour_id = ec.exterior_colours_id
                      left join interior_colours ic on quo.interior_colour_id = ic.interior_colours_id
                      left join hardware_type_master htm on quo.hardware_id = htm.hardware_type_id
                      left join manufac_exterioraccessories_master mem on quo.exterior_accesseries_id = mem.exterior_id
                      left join manufac_interioraccessories_master mim on quo.interior_accesseries_id = mim.interior_id
                      where quo.quotes_id = ${req.query.quote_id}`;           
    await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {
      if(records && records.length > 0 ){
        quote.unit_option = records && records.length > 0 ? records:[];
      }
      
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
    data.quoteList.push(quote);
  }  
    res.status(200).send(data);

  } 
  //////////////////////////////
  else if (req.query.project_id) {
    var quoteList;
    var selectSql = `select quotes_id from quotes_master qm where quotes_project_id = ${req.query.project_id}`;           
    await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {
      if(records && records.length > 0 ){
        quoteList = records && records.length > 0 ? records:[];
        
      }      
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
    
    if(quoteList){
    //  list.forEach(async (data) => {
      for (const quoteData of quoteList) {
      

          let quote = {};
          let quoteMain={};
          var selectSql = `SELECT qm.quotes_id, qm.number_of_units,qm.quotes_code, qm.quotes_project_id,prj.project_name,
                          u.username as quotes_generator, qm.quotes_status, qm.unit_price, qm.cost,
                          qm.quotes_image_path,prj.project_name FROM quotes_master qm 
                          left join projects prj on prj.project_id = qm.quotes_project_id
                          left join users u on u.id = qm.quotes_for_user_id
                          where  qm.quotes_id = ${quoteData.quotes_id} and qm.quotes_for_user_id = ${req.userId}` ;
         
   
          
    await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {              
      if(records){
        isQuotesValid = true;
        quote = records && records.length > 0 ? records[0]:[];
        
      }
      else{
          res.status(400).send({ message: 'Failed' });
      }             
    })
    //quote.master = quoteMain;
      if(isQuotesValid){
        var selectSql = `SELECT mcm.customer_name, se.series_name,
                        qwo.number_of_units, qwo.width, qwo.height, qwo.units_quantity, qwo.location,
                        qwo.is_active, DATE(qwo.created_date) as created_date
                        FROM quote_window_option qwo left join manufac_customer_master mcm on qwo.customer_id = mcm.customer_id
                        left join series se on qwo.series_id = se.series_id 
                        where qwo.quotes_id = ${quoteData.quotes_id}`;     
        await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
        .then(function (records) {      
          if(records && records.length > 0 ){       
            quote.window_option = records && records.length > 0 ? records[0]:[];
          }
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });  
        var selectSql = `SELECT quo.window_type_id, quo.width, quo.height, quo.operation, gt.glass_type, grl.grill,
                        ec.exterior_colour, ic.interior_colour, htm.hardware_type_name,
                        mem.exterior_name, mim.interior_name,
                        quo.is_active, DATE(quo.created_date) as created_date
                        FROM quote_unit_option quo left join glass_types gt on quo.glass_type_id = gt.glass_type_id
                        left join grilles grl on quo.grill_id = grl.grilles_id
                        left join exterior_colours ec on quo.exterior_colour_id = ec.exterior_colours_id
                        left join interior_colours ic on quo.interior_colour_id = ic.interior_colours_id
                        left join hardware_type_master htm on quo.hardware_id = htm.hardware_type_id
                        left join manufac_exterioraccessories_master mem on quo.exterior_accesseries_id = mem.exterior_id
                        left join manufac_interioraccessories_master mim on quo.interior_accesseries_id = mim.interior_id
                        where quo.quotes_id = ${quoteData.quotes_id}`;         
        await sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
        .then(function (records) {
          if(records && records.length > 0 ){
            quote.unit_option = records && records.length > 0 ? records:[];
          }
          
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
        
      }
      
      data.quoteList.push(quote);
      }
     
      }
    res.status(200).send(data);
  }
  else{
    res.status(400).send({ message: 'Project Id is mandetory!' });
  }

}
 

async function imageConversion(baseSixtyFourString) {
    let imaheUniqueName=Date.now() + '.png';
  let path='././public/images/quotes_image/' + imaheUniqueName;
  let sendPath ='images/quotes_image/'+imaheUniqueName;
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


function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}


