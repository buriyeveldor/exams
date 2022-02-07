const express = require("express");
const path = require("path");
const route = express.Router()
const{indexView, postView,postIndexView, postAddViewPost, postAddViewGet} = require('../controller/clientController');

route.get('/post/:id', postIndexView)
route.get('/post/create', postAddViewGet)
route.post('/post/create', postAddViewPost)
route.get('/post', indexView);



module.exports = route;