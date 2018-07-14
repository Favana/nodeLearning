"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
describe('RestFull Update', function () {
    it('update', function (done) {
        var url = "mongodb://localhost:27017/student";
        var infoRegisterSchema = new schema({
            name: String,
            Fname: String,
            phoneNum: Number
        }, { collection: 'infoRegister' });
        var infoRegisterModel = mongoose.model('infoReg', infoRegisterSchema);
        mongoose.connect(url, { useNewUrlParser: true }, function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                app.put('/update/:id', function (request, response) {
                    var user_id = request.params.id;
                    var id = { _id: user_id };
                    var newQuery = { name: 'Ali', Fname: 'Ahmadi', phoneNum: '09301299245' };
                    infoRegisterModel.updateOne(id, newQuery, function (err, result) {
                        if (response.statusCode != 200) {
                            response.send('update is failed');
                        }
                        else {
                            response.send('update is done');
                        }
                    }); //  updateOne
                }); // app update
                app.get('/showInfo', function (request, response) {
                    infoRegisterModel.find({}, function (err, result) {
                        var check = result.length;
                        if (check == 0) {
                            response.send('DataBase is Empty');
                        }
                        else {
                            response.send('your Data is : \n' + result);
                        }
                    }); // find
                }); // app.get
                app.listen(3000);
            }
        }); // connect
        done();
    }); // it
}); //  describe
//# sourceMappingURL=updateRestFull.js.map