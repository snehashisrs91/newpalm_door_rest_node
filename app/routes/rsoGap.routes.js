const { authJwt } = require("../middleware");
const rsoController = require("../controllers/rsoGap.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/rsoGap/createRsoGap",
    [authJwt.verifyToken],
    rsoController.create
  );

  app.put("/api/rsoGap/update_rsoGap",
    [authJwt.verifyToken],
    rsoController.update_rsoGap
  );

  app.get("/api/rsoGap/getRsoGaps",
    [authJwt.verifyToken],
    rsoController.getList
   );

};