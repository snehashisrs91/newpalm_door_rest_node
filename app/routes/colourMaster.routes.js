const { authJwt } = require("../middleware");
const colourMasterController = require("../controllers/colourMaster.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/colourMaster/createColourMaster",
    [authJwt.verifyToken],
    colourMasterController.colour_master_create_update
  );

  app.get("/api/colourMaster/getColourMasterList",
    [authJwt.verifyToken],
    colourMasterController.getList
   );

   app.get("/api/colourMaster/getColourMasterListByColourType",
    [authJwt.verifyToken],
    colourMasterController.getListByColourType
   );

   app.get("/api/colourMaster/getColourMasterListByColourOption",
    [authJwt.verifyToken],
    colourMasterController.getListByColourOption
   );

   app.post("/api/colourMaster/getColourMasterListByColourTypeColourOption",
    [authJwt.verifyToken],
    colourMasterController.getListByColourOptionColourType
   );

};