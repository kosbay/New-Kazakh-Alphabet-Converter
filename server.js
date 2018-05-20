var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require("multer");
var upload = multer({dest: "server/docs"});
var isImage = require('is-image');
var textract = require('textract');


mongoose.connect('mongodb://127.0.0.1:27017/latyn', {
  useMongoClient: true
});

var myalphalatin = ['A', 'Á', 'B', 'D', 'E', 'F', 'G', 'Ǵ', 'H', 'I', 'I', 'I', 'J', 'K', 'L', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Sh', 'Ch', 'T', 'U', 'Ú', 'V', 'Y', 'Ý', 'Z', 'Ia', 'Yu', 'a', 'á', 'b', 'd', 'e', 'f', 'g', 'ǵ', 'h', 'i', 'ı', 'ı', 'j', 'k', 'l', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'sh', 'ch', 't', 'u', 'ú', 'v', 'y', 'ý', 'z', 'ia', 'yu']
var myalphacyril = ['А', 'Ә', 'Б', 'Д', 'Е', 'Ф', 'Г', 'Ғ', 'Х', 'І', 'И', 'Й', 'Ж', 'К', 'Л', 'М', 'Н', 'Ң', 'О', 'Ө', 'П', 'Қ', 'Р', 'С', 'Ш', 'Ч', 'Т', 'Ұ', 'Ү', 'В', 'Ы', 'У', 'З', 'Я', 'Ю', 'а', 'ә', 'б', 'д', 'е', 'ф', 'г', 'ғ', 'х', 'і', 'и', 'й', 'ж', 'к', 'л', 'м', 'н', 'ң', 'о', 'ө', 'п', 'қ', 'р', 'с', 'ш', 'ч', 'т', 'ұ', 'ү', 'в', 'ы', 'у', 'з', 'я', 'ю']
var Alphabet = require('./server/models/Alphabet.js')

var app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 1}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(logger('dev'));


//app.post('/api/do/:word/latyn', function(req, res, next){
//    var word = req.params.word.replace('&20', ' ');
//    Alphabet.find().exec(function(err, alhabet) {
//        var translated = '';
//        for(var i = 0; i < word.length; i++) {
//            for(var j = 0; j < word.length; j++) {
//                if(word[i] === alphabet[j].latinLower) {
//                    translated += word[i];
//                } else if(word[i] === alphabet[j].latinUpper) {
//                    translated += word[i];
//                }
//                if(err) return next(err);
//                res.status(200).send(alphabet);
//            }
//        }
//    })
//    
//    
//})
app.post('/api/do/latyn', function(req, res, next){
    word = req.body.text;
    newWord = '';
    console.log(myalphacyril.length, myalphalatin.length)
    for(var i = 0; i < word.length; i++){
        if(myalphacyril.indexOf(word[i]) != -1){
            newWord += myalphalatin[myalphacyril.indexOf(word[i])];
        } else{
            newWord += word[i];
        }
         
    }
    
    res.status(200).send({word: newWord});
});

app.post('/api/do/cyril', function(req, res, next){
    word = req.body.text;
    newWord = '';
    console.log(myalphacyril.length, myalphalatin.length)
    for(var i = 0; i < word.length; i++){
        if(myalphalatin.indexOf(word[i]) != -1){
            newWord += myalphacyril[myalphalatin.indexOf(word[i])];
        }
        else if(word[i] == 'i\''){
            word[i] == 'й';
            newWord += word[i];
        }
        else {
            newWord += word[i];
        }

    }

    res.status(200).send({word: newWord});
});

app.post('/api/do/auto', function(req, res, next){
    word = req.body.text;
    newWord = '';
    console.log(myalphacyril.length, myalphalatin.length)
    for(var i = 0; i < word.length; i++){
        if(myalphacyril.indexOf(word[i]) != -1){
            newWord += myalphalatin[myalphacyril.indexOf(word[i])];
        }


        else if(myalphalatin.indexOf(word[i]) != -1){
            newWord += myalphacyril[myalphalatin.indexOf(word[i])];
        }

        else {
            newWord += word[i];
        }

    }

    res.status(200).send({word: newWord});
});

app.post('/api/test', upload.single('file'),function(req, res, next){

    var fileName = req.file.originalname;
    var extention = fileName.split(".");
    extention = extention[extention.length - 1];

    var filePath = 'server/docs/' + fileName;

   var tempPath = req.file.path;
   var targetPath = path.resolve(filePath);

   fs.rename(tempPath, targetPath, function(err){
        var myReadStream = fs.createReadStream(__dirname + '/' + filePath, 'utf8');
        var myWriteStream = fs.createWriteStream(__dirname + '/' + 'public/docs/' + fileName);

       myReadStream.on('data', function(data){
           console.log(typeof(data))
           var word = data;

           newWord = '';
           console.log(myalphacyril.length, myalphalatin.length);
           for(var i = 0; i < word.length; i++){
               if(myalphacyril.indexOf(word[i]) != -1){
                   newWord += myalphalatin[myalphacyril.indexOf(word[i])];
               } else{
                   newWord += word[i];
               }

           }
           myWriteStream.write(newWord);

            var result ='/docs/' + fileName;
            res.status(200).send(result);
        });
     
   })
    
})
var filePath = 'server/docs/Проект.docx';

textract.fromFileWithPath(filePath, function( error, text ) {

    console.log(text);
})


//var alphabet = new Alphabet({
//    latinUpper: 'B',
//    cyrilUpper: 'Б',
//    latinLower: 'b',
//    cyrilLower: 'б'
//})
//alphabet.save();
app.get('*', function(req, res, next){
    res.redirect('/#' + req.originalUrl);
})


app.listen(8080, function(){
    console.log("server started at port: 8080");
});