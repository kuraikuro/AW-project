const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = 'KEY';

const url = 'mongodb://localhost:27017/Noveldatabase';
const config = {
autoIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true
};
var Schema = require("mongoose").Schema;
const novelSchema = Schema({
    id:String,
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
    username :String,
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
    id:String,
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
const updateNovel = (novelnewData) => {
    return new Promise((resolve,reject) => {
        Novels.findOneAndUpdate({id:novelnewData.id},novelnewData,(err,data) => {
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
         Novels.findOneAndRemove({id:novelid.id},(err, data) => {
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
const getOneNovel = (nid) => {
    return new Promise ((resolve, reject) => {
        Novels.find({id:nid.id}, (err, data) => {
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
const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText,10);
    return result;
}

const inserUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new Users({
            username: dataUser.username,
            password: dataUser.password,
            email: dataUser.email
        });
        new_user.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({message: 'Singn up successfully'});
            }
        });
    });
}

const compareHash = async(plainText,hashText) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(plainText, hashText, (err,data)=>{
            if(err){
                reject(new Error('Error bcrypt compare'))
            }else{
                resolve({status: data});
            }
        })
    });
}

const findUser = (username) => {
    return new Promise((resolve, reject) => {
        Users.findOne({username: username},(err, data) => {
            if(err){
                reject(new Error('Cannont find username!'));
            }else{
                if(data){
                    resolve({id: data._id,name: data.username, password: data.password})
                }else{
                    reject(new Error('Cannont find username!'));
                }
            }
        })
    })
}

const findOneUser = (username) => {
    return new Promise((resolve, reject) => {
        Users.findOne({token: username},(err, data) => {
            if(err){
                reject(new Error('Cannont find username!'));
            }else{
                if(data){
                    resolve({id: data._id,name: data.username, password: data.password})
                }else{
                    reject(new Error('Cannont find username!'));
                }
            }
        })
    })
}

const getAllUser = (uid) => {
    return new Promise ((resolve, reject) => {
        Users.find({}, (err, data) => {
            if(err){
                reject(new Error('Cannont find User!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont find User!'));
                }
            }
        })
    });
}


/*config */
const authorization = ((req,res,next) => {
    const token = req.headers['authorization'];
    if(token === undefined){
        return res.status(401).json({
            "status": 401,
            "message": 'Unauthorized'
        })
    }else{
        jwt.verify(token,key,(err,decode) => {
            if(err){
                return res.status(401).json({
                    "status": 401,
                    "message": 'Unauthorized'
                })
            }else{
                console.log(decode)
                next()
            }
        })
    }
})


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
    console.log(novelid)
    return new Promise ((resolve, reject) => {
        Comments.find({bid:novelid.bid}, (err, data) => {
            if(err){
                reject(new Error('Cannont get Comment!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont get Comment!'));
                }
            }
        })
    });
}

const getOneComment = (cid) => {
    return new Promise ((resolve, reject) => {
        Comments.find({id:cid}, (err, data) => {
            if(err){
                reject(new Error('Cannont find One Comment!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont find One Comment!'));
                }
            }
        })
    });
}

const updateComment = (commnetid,commentnewData) => {
    return new Promise((resolve,reject) => {
        Comments.findOneAndUpdate({id:commentid},commentnewData,(err,data) => {
            if(err){
                reject(new Error('Cannot update comment to DB'));
            }else{
                resolve({message: 'comment update successfully'});
            }
        });
    });
}
/*Wishs */
const addWish = (wishData) => {
    return new Promise((resolve,reject) => {
        var q = 0;
        var new_wish = new Wishs(
            wishData
        );
        Wishs.find({},(err,data)=>{
            if(data){ 
                for (let i = 0; i < data.length; i++) {
                if((data[i].bid = wishData.bid) && (data[i].uid = wishData.uid) ){
                    q++;
                }else{
                    q=0;
                }
            }
            if(q !=0){
                reject(new Error('This wish has already been in DB'),{message: 'This wish has already been in DB'});
            }else{
                new_wish.save((err,data) => {
                    if(err){
                        reject(new Error('Cannot insert wish to DB'));
                    }else{
                        resolve({message: 'wish added successfully'});
                    }
                });
            }

              }else{
                reject(err);
              }
        })
    });
}

const deleteWishs = (wishid) =>{
    return new Promise ((resolve, reject) => {
         Wishs.findOneAndRemove( {id:wishid},(err, data) => {
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
const getSomeWish = (wishid) => {
    return new Promise ((resolve, reject) => {
        Wishs.find({id:wishid}, (err, data) => {
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
expressApp.post('/user/signup',(req,res)=>{
    makeHash(req.body.password)
            .then(hashText => {
                const playload = {
                    username: req.body.username,
                    password: hashText,
                    email: req.body.email
                }
                console.log(playload);
                inserUser(playload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
            })
});
expressApp.post('/login/signin',async(req,res) => {
    const playload = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(playload);
    try{
        const result =await findUser(playload.username);
        const loginStatus = await compareHash(playload.password, result.password);
        const status = loginStatus.status;

        if(status){
            const token = jwt.sign(result, key, {expiresIn: 60*5});
            res.status(200).json({result,token,status});
            console.log(token)
        }else{
            res.status(200).json({status});
        }
    }catch(error){
        console.log(err);
        res.status(404).send(error);
    }
})
expressApp.get('/novel/homepage',authorization,(req,res)=>{
    findOneUser(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.post('/wish/add',(req,res)=>{
    console.log('add wish');
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
    console.log('add comment');
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
           
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.post('/novel/getone',(req,res)=>{
    console.log('find novel');
    getOneNovel(req.body)
        .then(result => {
            
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.post('/user/wish',(req,res)=>{
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
expressApp.post('/novel/comment',(req,res)=>{
    console.log('get comment');
    console.log(req.body)
    getSomeComment(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

expressApp.get('/comment/getone',(req,res)=>{
    console.log('find comment');
    getOneComment(req.body)
        .then(result => {
            
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
    console.log(req.body);
    updateNovel(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.put('/comment/update',(req,res)=>{
    console.log('update comment');
    console.log(req.body);
    updateComment(req.body)
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
