const { authJwt } = require("../middleware");
const controller = require("../controllers/quotePrice.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/quotePrice/caculate-bom",
    [authJwt.verifyToken],
    controller.calculate_bom
  );

  
};