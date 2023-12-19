const { quotes } = require("../models");
const db = require("../models");
const Quotes = db.quotes;


const Op = db.Sequelize.Op;
const sequelize = db.sequelize;


exports.quotes_create = (req, res) =>{
    
    let pid = req.body.quotes_project_id > 0 ? req.body.quotes_project_id:null;
    var insertMasterSql = `INSERT INTO quotes_master (quotes_code, quotes_project_id, quotes_for_user_id, created_by,
                           modified_by, quotes_status, qty, unit_price, cost) VALUES
                           ('${req.body.quotes_code}', ${pid}, '${req.userId}', '${req.userId}',
                            '${req.userId}', '${req.body.quotes_status}', '${req.body.qty}', '${req.body.unit_price}', '${req.body.cost}')`;                           
                   
       
       sequelize.query(insertMasterSql)
          .then(function (result) {
            if(result && result.length> 0){
                let lastInsertId=result[0];           
                
                var insertInfoSql = `INSERT INTO quotes_info (quotes_id, frame_height, frame_width, quotes_image_path) VALUES
                (${lastInsertId} , ${req.body.frame_height} , ${req.body.frame_width} , 'images/quotes_image/quotes.png')`;
                
                sequelize.query(insertInfoSql)
                .then(function (quoteInfo) {
                    
                    res.status(200).send({ message: 'Projects Successfully Created!' });    
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
                            
            }
            else{
                res.status(500).send({ message: 'Failed' });
            }
             
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });

};

exports.quotes_list = (req, res) =>{
 
    var selectSql = `SELECT qm.quotes_id, qm.quotes_code, qm.quotes_project_id, qm.quotes_for_user_id, qm.quotes_status, qm.unit_price,
    qm.cost, qm.quotes_image_path, qwo.height as frame_height, qwo.width as frame_width,prj.project_name
    FROM quotes_master qm inner join quote_window_option qwo on qm.quotes_id = qwo.quotes_id
    left join projects prj on prj.project_id = qm.quotes_project_id
    where qm.quotes_for_user_id = ${req.userId}`;

    if(req.query.projectId){
         selectSql += ` and qm.quotes_project_id=${req.query.projectId}`;
    }       
    sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
    .then(function (quote) {      
      res.status(200).send(quote);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.convert_to_img = (req, res) =>{
    var data = "";
    var img = Buffer.from(data, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
};