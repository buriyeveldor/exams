const express = require("express");
const path = require("path");
const route = express.Router()
const{wordIndexView, wordAddViewGet,wordAddViewPost, wordPostIndexView
} = require('../controller/vdicuserController');

route.get('/', wordIndexView)
route.get('/vdictionaryuser/create', wordAddViewGet)
route.post('/vdictionaryuser/create', wordAddViewPost)
route.get('/vdictionaryuser', wordPostIndexView);



module.exports = route;