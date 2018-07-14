"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
describe('RestFullApi', function () {
    it('selectRestFullApi', function (done) {
        app.get('/infoCar', function (request, response) {
            var url = "mongodb://localhost:27017/student";
            var infoCarSchema = new schema({
                name: { type: String }
            }); // schema
            var infoCarModel = mongoose.model('n', infoCarSchema, 'infoCar');
            mongoose.connect(url, { useNewUrlParser: true }, function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    infoCarModel.find(function (err, data) {
                        //let newData = data[0]['name'];
                        console.log(data);
                        response.json(data);
                    }); // find
                } //  else
            }); //  connect
        }); // get
        app.listen(3000);
        done();
    }); // it
});
//# sourceMappingURL=selectRestFull.js.map