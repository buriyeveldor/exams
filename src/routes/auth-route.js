const express = require("express");
const path = require("path");
const route = express.Router()
const {userIndexView, userAddViewGet, userAddViewPost, editUserGET, editUserPOST, authLogin, authLoginPOST, logout, deleteUserGET} = require('../controller/authController')


route.get('/admin/user', userIndexView)
route.get('/admin/user/create', userAddViewGet)
route.post('/admin/user/create', userAddViewPost)
route.get('/auth/login', authLogin)
route.post('/auth/login', authLoginPOST)
route.get('/admin/user/edit/:id', editUserGET)
route.post('/admin/user/edit', editUserPOST)
route.get('/admin/user/delete/:id', deleteUserGET)
route.get('/auth/logout', logout)

module.exports = route;