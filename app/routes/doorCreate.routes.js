const { authJwt } = require("../middleware");
const doorCreateController = require("../controllers/doorCreate.controlller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/doorCreate/createdoor",
    [authJwt.verifyToken],
    doorCreateController.create
  );

  app.get("/api/doorCreate/getdoor",
    [authJwt.verifyToken],
    doorCreateController.getList
   );

};