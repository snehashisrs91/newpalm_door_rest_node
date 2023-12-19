const { authJwt } = require("../middleware");
const controller = require("../controllers/exterioraccessories.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/exterioraccessories/createExterior",
    [authJwt.verifyToken],
    controller.exterior_create
  );

  app.put("/api/exterioraccessories/updateExterior",
    [authJwt.verifyToken],
    controller.exterior_update
  );

  app.get("/api/exterioraccessories/getExteriors",
    [authJwt.verifyToken],
    controller.exterior_list
   );

};