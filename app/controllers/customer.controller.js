const { customer } = require("../models");
const db = require("../models");

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.customer_create = (req, res) =>{
  var customerList = req.body.customer;
  let count = 0;
  customerList.forEach(cust => {
    console.log(cust.customer_name +" - " + cust.price);

    var insertCustomerSql = `INSERT INTO manufac_customer_master
                             (user_id, customer_name, is_active, created_by, modified_by, price, discount, join_bom)
                             VALUES(${req.userId}, '${cust.customer_name}', 1, ${req.userId}, ${req.userId}, ${cust?.price || 0.0}, ${cust?.discount || 0.0}, ${cust?.join_bom || 0.0})`;
       
       sequelize.query(insertCustomerSql)
          .then(function (result) {              
            if(result && result.length> 0){
              count = count + 1;
              if(count == customerList.length){             
                res.status(200).send({ message: 'Customer Successfully Created!' }); 
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

exports.customer_list = (req, res) =>{

  var selectSql = `SELECT customer_id, user_id, customer_name, is_active, created_date, created_by, modified_by, modified_date, price, discount, join_bom
  FROM manufac_customer_master where user_id = ${req.userId}`;
         
  sequelize.query(selectSql, { type: sequelize.QueryTypes.SELECT })
  .then(function (customers) {      
    res.status(200).send(customers);
  })
  .catch(err => {
    res.status(400).send({ message: err.message });
  });
};
