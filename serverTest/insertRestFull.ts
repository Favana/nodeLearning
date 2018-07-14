import 'mocha';
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let schema = mongoose.Schema;
let bodyParser = require('body-parser');


describe('RestFullApi', function(){
    it('insertData', function(done){

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));


            let url = 'mongodb://localhost:27017/student';
            let infoRegisterSchema = new schema(
                {
                    name:{type:String},
                    Fname: {type:String},
                    phoneNum : {type:Number}
                },{collection:'infoRegister'}
            );// schema
            let infoRegisterModel = mongoose.model('infoRegister', infoRegisterSchema);
            mongoose.connect(url, {useNewUrlParser:true},function(err, result){
                if(err){
                    console.log(err)
                }else {
                    app.post('/Register', function (req, res) {

                        let data = {
                            name: req.body.name,
                            Fname: req.body.Fname,
                            phoneNum: req.body.phoneNum
                        }// data
                        infoRegisterModel.insertMany(data, function (err, result) {
                            if (err) {
                                console.log(err)
                            } else {
                                res.send('insert Data')
                            }
                        })
                    });// post

                    app.get('/showInfo', function(req, res){
                        infoRegisterModel.find({}, function(err, result){
                            if(result == null ){
                                console.log('Empty Collection');
                            }else{
                                res.send('Your New Data is : \n'+result[0]['name'])
                            }
                        });//  find
                    });//  get
                }
            });// connect








        app.listen(3000)

        done();
    });// it for post data



});// describe