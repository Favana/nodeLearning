"use strict";
//npm install jsonwebtoken --save
//npm install bcryptjs --save
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var assert_1 = require("assert");
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
describe('authentication', function () {
    it('loginForm', function (done) {
        var url = "mongodb://localhost:27017/student";
        var infoRegisterSch = new schema({
            name: { type: String },
            Fname: { type: String },
            password: { type: String },
            email: { type: String }
        }, { collection: 'infoRegister' }); // schema
        var infoRegMod = mongoose.model('infoReg', infoRegisterSch);
        mongoose.connect(url, { useNewUrlParser: true }, function (err, res) {
            if (err) {
                assert_1.fail(err);
            }
            else {
                app.get('/loginForm', function (request, response) {
                    response.json({
                        massage: 'connect t DataBase'
                    });
                }); // epp.get
                app.post('/loginForm', function (request, response) {
                    var userInfo = {
                        username: 'milad',
                        email: 'milad@gmail.com'
                    };
                    jwt.sign({ userInfo: userInfo }, 'secretttt', { expiresIn: '30s' }, function (err, token) {
                        response.json({ token: token });
                    });
                }); // app.post
                app.post('/loginForm/posts', verifyToken, function (request, response) {
                    jwt.verify(request.token, 'secretttt', function (err, authData) {
                        if (err) {
                            response.sendStatus(401);
                        }
                        else {
                            response.json({ massage: authData });
                        }
                    });
                }); // app.post
                app.listen(3000, function () {
                    console.log('Server Started in port 3000 ... ');
                });
            } // else
        }); // connect
        //// verify token ////////
        function verifyToken(request, response, next) {
            var bearerHeader = request.headers['authorization'];
            if (typeof bearerHeader != 'undefined') {
                var splitToken = bearerHeader.split(' ');
                var bearerToken = splitToken[1];
                request.token = bearerToken;
                next();
            }
            else {
                response.sendStatus(401);
            }
        } //// verify token ////////
        done();
    }); // it
}); // describe
//# sourceMappingURL=loginForm.js.map