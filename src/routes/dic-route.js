const express = require("express");
const path = require("path");
const route = express.Router()
const{wordIndexView, wordAddViewGet,wordAddViewPost, editWordGET, editWordPOST, deleteWordGET} = require('../controller/dicController');

route.get('/dictionary',wordIndexView)
// route.get('/dictionary', wordUserIndexView)
route.get('/dictionary/create', wordAddViewGet)
route.post('/dictionary/create', wordAddViewPost)
route.get("/dictionary/edit/:id", editWordGET);
route.post('/dictionary/edit', editWordPOST)
route.get("/dictionary/delete/:id", deleteWordGET);


module.exports = route;