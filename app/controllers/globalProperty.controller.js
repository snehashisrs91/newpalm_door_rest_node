const { grills } = require("../models");
const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = (req, res) =>{
 if(!(req.body.project_id && req.body.project_id> 0)){
   console.log('req.body');console.log(req.body)
    res.status(400).send({ message: 'Please select project' });
    
   }
   else{
  var selectSQL = `INSERT INTO global_property
            (project_id, user_id, customer_id, series_id, measurement_type_id,
               rso_gap_id, glass_type_id, grilles_id,fixed_window_profiles_id,
            exterior_colours_id, interior_colours_id,hardware_type_id, hardware_finish_id,exterior_id,
             interior_id, is_active, created_by, modified_by)
             VALUES (${req.body.project_id},
                     ${req.userId},
                    ${req.body.customer_id?req.body.customer_id:null},
                    ${req.body.series_id?req.body.series_id:null},
                     ${req.body.measurement_type_id?req.body.measurement_type_id:null},
                     ${req.body.rso_gap_id?req.body.rso_gap_id:null},
                      ${req.body.glass_type_id?req.body.glass_type_id:null},
                     ${req.body.grilles_id?req.body.grilles_id:null},
                      ${req.body.fixed_window_profiles_id?req.body.fixed_window_profiles_id:null},
                       ${req.body.exterior_colours_id?req.body.exterior_colours_id:null}, 
                       ${req.body.interior_colours_id?req.body.interior_colours_id:null},
                     ${req.body.hardware_type_id?req.body.hardware_type_id:null},
                      ${req.body.hardware_finish_id?req.body.hardware_finish_id:null},
                       ${req.body.exterior_id?req.body.exterior_id:null},
                     ${req.body.interior_id?req.body.interior_id:null},
                      1,
                      ${req.userId},
                       ${req.userId})`;
     
     sequelize.query(selectSQL)
        .then(function () {
          res.status(200).send({ message: 'Projects Successfully Created!' });
        })
        .catch(err => {
          res.status(400).send({ message: err.message });
        });
      }
};

exports.list = (req, res) =>{

    var selectSQL = `select gp.global_property_id, p.project_id, p.project_name, u.id as user_id, u.username, mcm.customer_id, mcm.customer_name,s.series_id, s.series_name,
    mt.measurement_type_id , mt.measurement_type_name,rg.rso_gap_id , rg.rso_gap, gt.glass_type_id , gt.glass_type, g.grilles_id , g.grill,
    fwp.fixed_window_profiles_id, fwp.fixed_window_profile,ec.exterior_colours_id, ec.exterior_colour, ic.interior_colours_id , ic.interior_colour,
    htm.hardware_type_id, htm.hardware_type_name,hfm.hardware_finish_id, hfm.hardware_finish_name, mem.exterior_id, mem.exterior_name,
    mim.interior_id, mim.interior_name,gp.is_active, gp.created_date, gp.created_by, gp.modified_by, gp.modified_date
    from global_property gp left join projects p on gp.project_id = p.project_id
    left join users u on gp.user_id = u.id
    left join manufac_customer_master mcm on gp.customer_id = mcm.customer_id
    left join series s on gp.series_id = s.series_id
    left join measurement_type mt on gp.measurement_type_id = mt.measurement_type_id
    left join rso_gaps rg on gp.rso_gap_id = rg.rso_gap_id
    left join glass_types gt on gp.glass_type_id = gt.glass_type_id
    left join grilles g on gp.grilles_id = g.grilles_id
    left join fixed_window_profiles fwp on gp.fixed_window_profiles_id = fwp.fixed_window_profiles_id
    left join exterior_colours ec on gp.exterior_colours_id = ec.exterior_colours_id
    left join interior_colours ic on gp.interior_colours_id = ic.interior_colours_id
    left join hardware_type_master htm on gp.hardware_type_id = htm.hardware_type_id
    left join hardware_finish_master hfm on gp.hardware_finish_id = hfm.hardware_finish_id
    left join manufac_exterioraccessories_master mem on gp.exterior_id = mem.exterior_id
    left join manufac_interioraccessories_master mim on gp.interior_id = mim.interior_id
    where gp.user_id = ${req.userId}`;

    if(req.query.projectId){
        selectSQL += ` and gp.project_id = ${req.query.projectId}`;
    }       
    sequelize.query(selectSQL, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {      
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

exports.updateGP = (req, res) =>{  
    
  if(!(req.body.global_property_id && req.body.global_property_id> 0)
       && !(req.body.project_id && req.body.project_id> 0) ){
       console.log('req.body');console.log(req.body)
       res.status(400).send({ message: 'Please provide project and global property'});     
  }  
  var globalPropertyId = req.body.global_property_id;

  var selectSQL = `select global_property_id, project_id, user_id from global_property where
                   global_property_id = ${req.body.global_property_id}
                   and project_id = ${req.body.project_id} and user_id = ${req.userId}`;

  var updateSql = `update global_property
                   SET  customer_id= ${req.body.customer_id}, series_id= ${req.body.series_id}, measurement_type_id= ${req.body.measurement_type_id},
                        rso_gap_id= ${req.body.rso_gap_id}, glass_type_id=${req.body.glass_type_id}, grilles_id=${req.body.grilles_id},
                        fixed_window_profiles_id=${req.body.fixed_window_profiles_id}, exterior_colours_id=${req.body.exterior_colours_id}, interior_colours_id=${req.body.interior_colours_id},
                        hardware_type_id=${req.body.hardware_type_id}, hardware_finish_id=${req.body.hardware_finish_id}, exterior_id=${req.body.exterior_id},
                        interior_id=${req.body.interior_id}, is_active=${req.body.is_active}, modified_by= ${req.userId}
                   WHERE global_property_id= ${req.body.global_property_id} and project_id= ${req.body.project_id} and user_id= ${req.userId}`;                 
     
     sequelize.query(selectSQL, { type: sequelize.QueryTypes.SELECT })
        .then(function (result) {
          if((result && result.length> 0)&& result[0].global_property_id == globalPropertyId){            
              sequelize.query(updateSql)
              .then(function (updatedGP) {                
                  res.status(200).send({ message: 'Global Property Successfully Updated!' });    
              })
              .catch(err => {
                  res.status(500).send({ message: err.message });
              });                          
          }
          else{
              res.status(500).send({ message: 'Failed to Update' });
          }           
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

};