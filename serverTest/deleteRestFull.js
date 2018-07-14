"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
describe('RestFull', function () {
    it('deleteRestFull', function (done) {
        var url = "mongodb://localhost:27017/student";
        var infoRegisterSchema = new schema({
            name: String,
            Fname: String,
            phoneNum: Number
        }, { collection: 'infoRegister' }); //infoRegisterSchema
        var infoRegisterModel = mongoose.model('infoRegister', infoRegisterSchema);
        mongoose.connect(url, { useNewUrlParser: true }, function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                app.delete('/delete/:id', function (request, response) {
                    var id = request.params.id;
                    var myQuery = { _id: id };
                    infoRegisterModel.deleteOne(myQuery, function (result) {
                        if (response.statusCode == 200) {
                            response.send('delete your data');
                        }
                        else {
                            response.send('call to admin');
                        }
                    }); // deleteMany
                }); // app Post
                app.get('/showInfo', function (request, ressponse) {
                    infoRegisterModel.find({}, function (err, data) {
                        var check = data.length;
                        if (check === 0) {
                            ressponse.send('DataBase is empty');
                        }
                        else {
                            ressponse.send('yourData is : \n' + data);
                        }
                    });
                }); //  app.get
                app.listen('3000'); //  app.get
            }
        });
        done();
    }); // it
}); //  describe
//# sourceMappingURL=deleteRestFull.js.map