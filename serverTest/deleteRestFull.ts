import 'mocha';
import {fail} from "assert";
let express =require('express');
let app = express();
let mongoose = require('mongoose');
let schema = mongoose.Schema;
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

describe('RestFull', function(){
    it('deleteRestFull', function(done){
        let url = "mongodb://localhost:27017/student";
        let infoRegisterSchema  = new schema({
            name:String,
            Fname:String,
            phoneNum : Number
        },  {collection:'infoRegister'});//infoRegisterSchema

        let infoRegisterModel = mongoose.model('infoRegister', infoRegisterSchema);
        mongoose.connect(url , {useNewUrlParser:true}, function(err, res){
            if(err){
                console.log(err)
            }else{

                app.delete('/delete/:id', function(request ,response){
                    let id = request.params.id;
                    let myQuery = {_id: id};
                    infoRegisterModel.deleteOne(myQuery, function( result){
                        if(response.statusCode == 200){
                            response.send('delete your data');
                        }else{
                            response.send('call to admin')
                        }


                    });// deleteMany
                });// app Post

                app.get('/showInfo', function(request,  ressponse){
                    infoRegisterModel.find({}, function (err, data) {
                        let check = data.length;
                        if(check === 0){
                            ressponse.send('DataBase is empty')
                        }else{
                            ressponse.send('yourData is : \n'+data)
                        }
                    })
                });//  app.get

                app.listen('3000');//  app.get

            }
        });

        done();
    });// it
});//  describe