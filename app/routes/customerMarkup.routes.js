const { authJwt } = require("../middleware");
const customerMarkupController = require("../controllers/customerMarkup.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/customarMarkup/createCustomerMarkup",
    [authJwt.verifyToken],
    customerMarkupController.customer_markup_create_update
  );

  app.get("/api/customarMarkup/getCustomerMarkup",
    [authJwt.verifyToken],
    customerMarkupController.get_customer_markup
   );

};