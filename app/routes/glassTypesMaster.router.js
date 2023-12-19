const { authJwt } = require("../middleware");
const glassTypesMasterController = require("../controllers/glassTypesMaster.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/glassTypesMaster/createGlassTypesMaster",
    [authJwt.verifyToken],
    glassTypesMasterController.gtm_create
  );

  app.get("/api/glassTypesMaster/getGlassTypesDetails",
    [authJwt.verifyToken],
    glassTypesMasterController.glass_types_master_details
   );

   app.post("/api/glassTypesMaster/updateGlassTypesMaster",
    [authJwt.verifyToken],
    glassTypesMasterController.gtm_update
   );

  app.get("/api/glassTypesMaster/getGlassTypesMasterList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesMasterList
   );

   app.get("/api/glassTypesMaster/getGlassTypesGlazingList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesGlazingList
   );

   app.get("/api/glassTypesMaster/getGlassTypesLowEList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesLowEList
   );

   app.get("/api/glassTypesMaster/getGlassTypesObscureList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesObscureList
   );

   app.get("/api/glassTypesMaster/getGlassTypesSpacerFinishList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesSpacerFinishList
   );

   app.get("/api/glassTypesMaster/getGlassTypesSpacerTypesList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesSpacerTypesList
   );

   app.get("/api/glassTypesMaster/getGlassTypesStrengthTypesList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesStrengthTypesList
   );

   app.get("/api/glassTypesMaster/getGlassTypesThicknessList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesThicknessList
   );

   app.get("/api/glassTypesMaster/getGlassTypesTintList",
    [authJwt.verifyToken],
    glassTypesMasterController.getGlassTypesTintList
   );

   

};