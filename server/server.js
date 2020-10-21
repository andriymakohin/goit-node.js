require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const contactsRouter = require('../contastsComponent/contact.routers');
const PORT = process.env.PORT || 3000;
const USER = process.env.USER;
const dbName = 'db-contacts';
const URL = `mongodb+srv://${USER}@cluster0.nbpyn.mongodb.net/${dbName}?retryWrites=true&w=majority`;


const createServer = async () => {
  try {
    const app = express();
    await mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
    console.log('Mongo Database connection successful!');

    app.use(cors());

    app.use(morgan('tiny'));

    app.use(express.json());

    app.use('/', contactsRouter);

    app.listen(PORT , () => console.log("Server was started",+ PORT));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = {
  createServer
};
