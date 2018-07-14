import 'mocha'
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let schema = mongoose.Schema;


describe('RestFullApi', function () {
    it('selectRestFullApi', function(done){

        app.get('/infoCar', function(request, response){
            let url = "mongodb://localhost:27017/student";
            let infoCarSchema = new schema({
                name:{type:String}
            });// schema
            let infoCarModel = mongoose.model('n',infoCarSchema, 'infoCar');

            mongoose.connect(url, { useNewUrlParser: true },function(err, res){
                if(err){
                    console.log(err)
                }else{
                    infoCarModel.find(function(err, data){
                        //let newData = data[0]['name'];
                        console.log(data);
                        response.json(data)

                    });// find
                }//  else
            });//  connect

        });// get




        app.listen(3000);
        done();
    });// it

});
