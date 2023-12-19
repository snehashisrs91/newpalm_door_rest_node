const { authJwt } = require("../middleware");
const custController = require("../controllers/customer.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/customer/createCustomer",
    [authJwt.verifyToken],
    custController.customer_create
  );

  app.get("/api/customer/getCustomers",
    [authJwt.verifyToken],
    custController.customer_list
   );

};