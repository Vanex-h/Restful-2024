const express = require("express");
const router = express.Router();

const bookRoutes = require("./book.routes");
const userRoutes = require("./user.routes");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.use("/books", isAuthenticated, bookRoutes
    /*
#swagger.tags = ['Book']
#swagger.security = [{
    "bearerAuth": []
    }] 
    */
);
router.use("/users", userRoutes
    /*
#swagger.tags = ['User']
#swagger.security = [{
    "bearerAuth": []
    }] 
    */
);

module.exports = router;