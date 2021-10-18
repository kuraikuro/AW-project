const expressFunction = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Noveldatabase';
const config = {
autoIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true
};

var Schema = require("mongoose").Schema;
const userSchema = Schema({
    name :String,
	price :Number,
	shortnote : String,
	publisher : String,
	releasedate :Date,
	urlimg :String,
	wish:Array,
	comment:Array
},
{
collection: 'Novel'
});
let Novels
try {
    Novels = mongoose.model('Novel')
} catch (error) {
    Novels = mongoose.model('Novel', userSchema);
}

const expressApp = expressFunction();
expressApp.use(function (req, res, next) {
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
// Pass to next layer of middleware
next();
});

expressApp.use(expressFunction.json());
expressApp.use((req, res, next) =>{
mongoose.connect(url, config)
.then(() => {
console.log('Connected to MongoDB...');
next();
})
.catch(err =>{
console.log('Cannot connect to MongoDB');
res.status(501).send('Cannot connect to MongoDB')
});
})
//เรียกใช้เมธอด get เพื่อตรวจสอบพาธที่ส่งมาพรUอมกับ HTTP Request โดยกําหนด Endpoint
expressApp.get('/api/resource', function(req, res){
    Novels.findOne({name:"Sad Sad girl"},(err, data) => {
    res.send(data)
    });
    });
    //สร้าง Event Listener รอการเชื่อมต่อผ่านจากพอร์ต 3000
    expressApp.listen(3000, function(){
    console.log('Listening on port 3000');
    });