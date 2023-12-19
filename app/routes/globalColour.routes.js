const { authJwt } = require("../middleware");
const globalColourController = require("../controllers/globalColour.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/globalColour/createGlobalColour",
    [authJwt.verifyToken],
    globalColourController.global_colour_create_update
  );

  app.get("/api/globalColour/getGlobalColourList",
    [authJwt.verifyToken],
    globalColourController.getList
   );

   app.get("/api/globalColour/getGlobalColourListByColourType",
    [authJwt.verifyToken],
    globalColourController.getListByColourType
   );

   app.get("/api/globalColour/getGlobalColourListByColourOption",
    [authJwt.verifyToken],
    globalColourController.getListByColourOption
   );

};