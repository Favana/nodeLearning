//npm install jsonwebtoken --save
//npm install bcryptjs --save

import 'mocha';
import {fail} from "assert";
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let schema = mongoose.Schema;
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

describe('authentication', function(){
    it('loginForm', function(done){
        let url = "mongodb://localhost:27017/student";
        let infoRegisterSch = new schema({
            name: {type: String},
            Fname: {type: String},
            password: {type: String},
            email: {type: String}
        }, {collection:'infoRegister'});// schema

        let infoRegMod = mongoose.model('infoReg', infoRegisterSch);
        mongoose.connect(url, {useNewUrlParser: true},function(err, res){
            if(err){
                fail(err)
            }else{
                app.get('/loginForm',  function(request,  response){
                    response.json({
                        massage: 'connect t DataBase'
                    });
                });// epp.get

                app.post('/loginForm', function(request, response){
                    let userInfo = {
                        username:'milad',
                        email:'milad@gmail.com'
                    }
                    jwt.sign({userInfo}, 'secretttt',{expiresIn:'30s'}, function(err, token){
                        response.json({token})
                    });
                });// app.post

                app.post('/loginForm/posts',verifyToken,function (request, response) {

                    jwt.verify(request.token, 'secretttt', function(err, authData){
                        if(err){
                            response.sendStatus(401);
                        }else{
                            response.json({massage: authData})
                        }
                    });


                });// app.post



                app.listen(3000, function(){
                    console.log('Server Started in port 3000 ... ');
                });
            }// else

        });// connect

        //// verify token ////////
        function verifyToken(request, response,  next){
            const bearerHeader = request.headers['authorization'];
            if(typeof  bearerHeader  != 'undefined'){
                 let splitToken = bearerHeader.split(' ');
                 let bearerToken = splitToken[1];
                 request.token = bearerToken;
                 next();

            }else{
                response.sendStatus(401);
            }
        }//// verify token ////////


        done();
    });// it

});// describe