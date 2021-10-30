const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const url = 'mongodb://localhost:27017/Noveldatabase';
const config = {
autoIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true
};
var Schema = require("mongoose").Schema;
const novelSchema = Schema({
    name :String,
	price :Number,
	shortnote : String,
	publisher : String,
    file: String,
	urlimg :String,
},
{
collection: 'Novel'
});
let Novels
try {
    Novels = mongoose.model('Novel')
} catch (error) {
    Novels = mongoose.model('Novel', novelSchema);
}

const userSchema = Schema({
    name :String,
	password : String,
    email: String,
},
{
collection: 'User'
});
let Users
try {
    Users = mongoose.model('User')
} catch (error) {
    Users = mongoose.model('User', userSchema);
}

const commentSchema = Schema({
    comment: String,
    uid : String,
    bid : String,
},
{
collection: 'Comment'
});
let Comments
try {
    Comments = mongoose.model('Comment')
} catch (error) {
    Comments = mongoose.model('Comment', commentSchema);
}

const wishSchema = Schema({
    uid : String,
    bid : String,
},
{
collection: 'Wish'
});
let Wishs
try {
    Wishs = mongoose.model('Wish')
} catch (error) {
    Wishs = mongoose.model('Wish', wishSchema);
}
expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    return next()
});

expressApp.use(expressFunction.json());
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connected to MongoDB...');
        next();
    })
    .catch(err => {
        console.log('Cannot cannect toMongoDB');
        res.status(501).send('Cannot connect to MongoDB')
    });
});

/*Novels */
const addNovel = (novelData) => {
    return new Promise((resolve,reject) => {
        var new_novel = new Novels(
            novelData
        );
        new_novel.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert novel to DB'));
            }else{
                resolve({message: 'novel added successfully'});
            }
        });
    });
}
const updateNovel = (novelid,novelnewData) => {
    return new Promise((resolve,reject) => {
        Novels.findByIdAndUpdate(novelid,novelnewData,(err,data) => {
            if(err){
                reject(new Error('Cannot update novel to DB'));
            }else{
                resolve({message: 'novel update successfully'});
            }
        });
    });
}
const deleteNovels = (novelid) =>{
    return new Promise ((resolve, reject) => {
         Novels.findByIdAndRemove(novelid,(err, data) => {
            if(err){
                reject(new Error('Cannont delete Novel'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont delete Novel'));
                }     
            }
        })
    });
}
const getallNovels = () => {
    return new Promise ((resolve, reject) => {
        Novels.find({}, (err, data) => {
            if(err){
                reject(new Error('Cannont get Novels!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont get Novels!'));
                }
            }
        })
    });
}
const getOneNovel = (novelid) => {
    return new Promise ((resolve, reject) => {
        Novels.findById(novelid, (err, data) => {
            if(err){
                reject(new Error('Cannont find Novel!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont find Novel!'));
                }
            }
        })
    });
}

/*Users*/
const addUser = (userData) => {
    return new Promise((resolve,reject) => {
        var new_user = new Users(
            userData
        );
        new_user.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert user to DB'));
            }else{
                resolve({message: 'user added successfully'});
            }
        });
    });
}

/*Comments */
const addComment = (commentData) => {
    return new Promise((resolve,reject) => {
        var new_comment = new Comments(
            commentData
        );
        new_comment.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert comment to DB'));
            }else{
                resolve({message: 'comment added successfully'});
            }
        });
    });
}
const getSomeComment = (novelid) => {
    return new Promise ((resolve, reject) => {
        Novels.find({bid:novelid}, (err, data) => {
            if(err){
                reject(new Error('Cannont get Wish!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont get Wish!'));
                }
            }
        })
    });
}
/*Wishs */
const addWish = (wishData) => {
    return new Promise((resolve,reject) => {
        var new_wish = new Wishs(
            wishData
        );
        new_wish.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert comment to DB'));
            }else{
                resolve({message: 'comment added successfully'});
            }
        });
    });
}
const deleteWishs = (wishid) =>{
    return new Promise ((resolve, reject) => {
         Wishs.findByIdAndRemove( wishid,(err, data) => {
            if(err){
                reject(new Error('Cannont delete wish'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont delete wish'));
                }     
            }
        })
    });
}
const getSomeWish = (userid) => {
    return new Promise ((resolve, reject) => {
        Novels.find({uid:userid}, (err, data) => {
            if(err){
                reject(new Error('Cannont get Wish!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont get Wish!'));
                }
            }
        })
    });
}




/*Route */
expressApp.post('/novel/add',(req,res)=>{
    console.log('add novel');
    addNovel(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.post('/user/add',(req,res)=>{
    console.log('add');
    addUser(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.post('/wish/add',(req,res)=>{
    console.log('add');
    addWish(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.post('/comment/add',(req,res)=>{
    console.log('add');
    addComment(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

expressApp.get('/novel/get',(req,res)=>{
    console.log('get novel');
    getallNovels()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.get('/novel/getone',(req,res)=>{
    console.log('find novel');
    getOneNovel()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.get('/user/wish',(req,res)=>{
    console.log('get wish novel');
    getSomeWish(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.get('/novel/comment',(req,res)=>{
    console.log('get wish novel');
    getSomeComment(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.delete('/novel/delete',(req,res)=>{
    console.log('delete novel');
    deleteNovels(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.delete('/wish/delete',(req,res)=>{
    console.log('delete novel');
    deleteWishs(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.put('/novel/update',(req,res)=>{
    console.log('update novel');
    updateNovel(req.params.id,req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

expressApp.listen(3000, function(){
    console.log('Listening on port 3000');
});