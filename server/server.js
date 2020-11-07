const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const contactsRoutes = require("../contastsComponent/contact.routers");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

module.exports = class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleweres();
    this.initRoutes();
    this.initErrorHendler();
    this.startListering();
  }
  initServer() {
    this.server = express();
  }

  initMiddleweres() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(logger("dev"));
  }
  initRoutes() {
    this.server.use("/contacts", contactsRoutes);
  }
  initErrorHendler() {}
  startListering() {
    this.server.listen(PORT, () =>
      console.log("Server was started", PORT)
    );
  }
};