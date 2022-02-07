// const express = require("express");
// const path = require("path");
// const route = express.Router()
// const{ wordAddViewGet, wordAddViewPost, editWordGET, editWordPOST, deleteWordGET,
//     wordIndexView, wordPostView
// } = require('../controller/dicController');
//
//
// route.get('/dictionary', wordIndexView);
// route.get('/dictionary', wordPostView);
// route.get("/dictionary/delete/:id", deleteWordGET)
// route.get("/dictionary/edit/:id", editWordGET)
// route.post("/dictionary/edit", editWordPOST)
// route.get('/dictionary/create', wordAddViewGet)
// route.post('/dictionary/create', wordAddViewPost)
//
//
//
// module.exports = route;

const express = require("express");
const path = require("path");
const route = express.Router()
const{wordIndexView, wordAddViewGet,wordAddViewPost, wordPostIndexView, wordView, editWordGET, editWordPOST,
    deleteWordGET, addWordGET, addWordPOST
} = require('../controller/dicuserController');

route.get('/dictionaryuser', wordIndexView)
route.get('/dictionaryuser/create', wordAddViewGet)
route.post('/dictionaryuser/create', wordAddViewPost)
route.get('/dictionaryuser', wordPostIndexView);
route.get("/dictionaryuser/:id", wordView);
route.get("/dictionaryuser/edit/:id", editWordGET);
route.post('/dictionaryuser/edit', editWordPOST)
route.get("/dictionary/add/:id", addWordGET);
route.post('/dictionary/add', addWordPOST)
route.get("/dictionaryuser/delete/:id", deleteWordGET);


module.exports = route;