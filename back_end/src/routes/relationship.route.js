const express = require("express");
const {
    addRelationships,
    deleteRelationships,
    getRelationships,
} = require("../controllers/relationship_controller");
const routerRelationship = express.Router();
const authorization = require("../middleware/authorization");

routerRelationship.delete("/follower", authorization, deleteRelationships);
routerRelationship.post("/follower", authorization, addRelationships);
routerRelationship.get("/follower", authorization, getRelationships);

module.exports = routerRelationship;
