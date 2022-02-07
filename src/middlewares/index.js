const path = require("path");
const expressEjsLayout = require('express-ejs-layouts')
const express = require('express')
const cookieParser = require('cookie-parser')
const auth = require('./auth')
const fileUpload = require('express-fileupload');


module.exports = [
    expressEjsLayout, 
    express.static(path.join(process.cwd(), 'src', 'database', 'uploads')),
    express.static(path.join(process.cwd(), 'src', 'assets')),
    express.urlencoded({extended: false}),
    express.json(),
    fileUpload(), 
    cookieParser(),
    auth
]