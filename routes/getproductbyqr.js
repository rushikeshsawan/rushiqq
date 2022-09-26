const express = require('express');
const rout = express.Router();
var database = require('../database');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
var cookieParser = require('cookie-parser');
const moment = require('moment');
const Web3 = require('web3');
const mycontract = require('../SimpleStorage.json');

rout.get("/getproductbyqr", function (req, res, next) {
    if(req.session.user_id){

// console.log("address here. "+ req.session.addre);
    res.render("getproductbyqrcode",{
        status: ""
    });

    res.end();
}else{
    res.redirect('/');
}
    // next();
    // console.log(req.session);
});
rout.get("/profile", function (req, res, next) {
    if(req.session.uid){
        
        const q = `SELECT * FROM userlogin where id="${req.session.uid}"`;
        database.query(q, function (error, data) {
            console.log(data[0].email);
            res.render("profile",{
                uid:data[0].id,
                email: data[0].email,
                username: data[0].username,
                name:data[0].name,
                lname:data[0].lname,
                address:data[0].address,
                city:data[0].city,
                country:data[0].country,
                postal:data[0].postal,
                aboutme:data[0].aboutme
            });
        
            res.end();
        });

}else{
    res.redirect('/');
}
    // next();
    // console.log(req.session);
});
rout.get("/usermanual", function (req, res, next) {
  

// console.log("address here. "+ req.session.addre);
    res.render("usermanual",{
        
    });

    res.end();

});







module.exports = rout;