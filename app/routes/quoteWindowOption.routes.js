const { authJwt } = require("../middleware");
const controller = require("../controllers/quoteWindowOption.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/quoteWindowOption/createQWO",
  [authJwt.verifyToken],
   controller.qwo_create
  );

  app.get("/api/quoteWindowOption/quote_details",
  [authJwt.verifyToken],
   controller.quote_details
  );

  app.get("/api/quoteWindowOption/quote_invoice_details",
  [authJwt.verifyToken],
   controller.quote_invoice_details
  );
   
  
  
   
   

};