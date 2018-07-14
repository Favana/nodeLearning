import 'mocha';
import {resolveNs} from "dns";
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let schema = mongoose.Schema;
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

describe('RestFull Update', function () {
    it('update', function(done){
        let url = "mongodb://localhost:27017/student";
        let infoRegisterSchema = new schema({
           name:String,
           Fname:String,
           phoneNum:Number
        },{collection:'infoRegister'});

        let infoRegisterModel = mongoose.model('infoReg',infoRegisterSchema);
        mongoose.connect(url, {useNewUrlParser:true},function(err,res){
            if(err){
                console.log(err);
            }else{

              app.put('/update/:id',function(request,  response){
                  let user_id = request.params.id;
                  let id= {_id : user_id};
                  let newQuery = {name:'Ali', Fname: 'Ahmadi',  phoneNum:'09301299245'};
                  infoRegisterModel.updateOne(id, newQuery, function(err, result){
                    if(response.statusCode != 200){
                        response.send('update is failed');
                    }else{
                        response.send('update is done');
                    }
                  });//  updateOne
              });// app update

                app.get('/showInfo', function(request, response){
                    infoRegisterModel.find({} , function(err, result){
                        let check = result.length;
                        if(check == 0){
                            response.send('DataBase is Empty');
                        }else{
                            response.send('your Data is : \n'+ result);
                        }
                    });// find
                });// app.get
               app.listen(3000);
            }
        });// connect

        done();
    });// it
});//  describe