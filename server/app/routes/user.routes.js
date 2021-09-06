const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const controllerSales = require("../controllers/sales.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Content-Type: application/json"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post(
    "/api/admin/profile",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminProfile
  );

  app.post(
    "/api/admin/sales/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerSales.create
  );

  app.post(
    "/api/admin/sales/list",
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerSales.findAll
  );
};