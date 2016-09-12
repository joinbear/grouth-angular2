// import middlewares
const express       = require('express');
const path          = require('path');
const raml2html     = require('raml2html');
const config        = require('./config/');
const ParamHandler  = config.ParamHandler;
const ErrorHandler  = config.ErrorHandler;
const Filter        = config.Filter;
const RouterHandler = config.RouterHandler;

// init middlewares 
const app           = new express();
const param         = new ParamHandler(app);
const error         = new ErrorHandler(app);
const filter        = new Filter(app);
const routes        = new RouterHandler(app);
// the service will auto mount router in the appoint path. you can add more as you like.
const tradePath   = path.resolve(__dirname,'./apps/trade/actions/');
// api doc router
const template      = raml2html.getDefaultConfig();


//---------params config -----------
param.init();

//---------- filter -------------------
filter.init();

//---------- mount routers -------------
// the mout router is /trade/{actions.js}
routes.mount(tradePath,'trade');

//--------- handle error ---------------
error.init();

module.exports = app;