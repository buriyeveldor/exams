const express = require("express");
const path = require("path");
const route = express.Router()
const{wordIndexView, wordAddViewGet,wordAddViewPost, wordPostIndexView, wordView, editWordGET, editWordPOST,
    deleteWordGET, addWordGET
} = require('../controller/dicuserController');

route.get('/dictionaryuser', wordIndexView)
route.get('/dictionaryuser/create', wordAddViewGet)
route.post('/dictionaryuser/create', wordAddViewPost)
route.get('/dictionaryuser', wordPostIndexView);
route.get("/dictionaryuser/:id", wordView);
route.get("/dictionaryuser/edit/:id", editWordGET);
route.post('/dictionaryuser/edit', editWordPOST)
route.get("/dictionary/add/:id", addWordGET);
route.get("/dictionaryuser/delete/:id", deleteWordGET);


module.exports = route;