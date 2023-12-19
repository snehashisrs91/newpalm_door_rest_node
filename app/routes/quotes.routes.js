const { authJwt } = require("../middleware");
const controller = require("../controllers/quotes.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/quotes/createQuote",
  [authJwt.verifyToken],
   controller.quotes_create
   );
  
  app.get("/api/quotes/list",
  [authJwt.verifyToken],
   controller.quotes_list
   );
   
   app.get("/api/quotes/convertToImg",controller.convert_to_img);

};