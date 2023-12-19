const { authJwt } = require("../middleware");
const controller = require("../controllers/interioraccessories.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/interioraccessories/createInterior",
    [authJwt.verifyToken],
    controller.interior_create
  );

  app.put("/api/interioraccessories/updateInterior",
    [authJwt.verifyToken],
    controller.interior_update
  );

  app.get("/api/interioraccessories/getInteriors",
    [authJwt.verifyToken],
    controller.interior_list
   );

};