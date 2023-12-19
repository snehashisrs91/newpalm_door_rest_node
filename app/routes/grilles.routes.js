const { authJwt } = require("../middleware");
const grillesTypeController = require("../controllers/grilles.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/grills/createGrill",
    [authJwt.verifyToken],
    grillesTypeController.create
  );

  app.put("/api/grills/updateGrill",
    [authJwt.verifyToken],
    grillesTypeController.update_grill
  );

  app.get("/api/grills/getGrilles",
    [authJwt.verifyToken],
    grillesTypeController.getList
   );

};