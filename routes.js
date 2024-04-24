let path = require("path");
let express = require("express");
let fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');

let router = express.Router();


const myDatabase = require('./myDatabase');
let db = new myDatabase();

const Data = require('./Data');

// run npm install mongoose

angelcat = [{"name":"Calico", "id":"C1", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_06.png?v=1684992881"},
            {"name":"Silver Tabby", "id":"C2", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_07.png?v=1684992881"},
            {"name":"Tuxedo", "id":"C3", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_08.png?v=1684992881"},
            {"name":"Siamese", "id":"C4", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_09.png?v=1684992881"},
            {"name":"White", "id":"C5", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_10.png?v=1684992881"},
            {"name":"Brown & Black", "id":"C6", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_11.png?v=1684992881"},
            {"name":"Bluish Gray", "id":"C7", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_12.png?v=1684992881"},
            {"name":"Red Tabby", "id":"C8", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_13.png?v=1684992881"},
            {"name":"Black", "id":"C9", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_14.png?v=1684992881"},
            {"name":"Lucky Orange", "id":"C10", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_16.png?v=1685002983"},
            {"name":"Lucky Pink", "id":"C11", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_17.png?v=1685002983"},
            {"name":"Lucky Purple", "id":"C12", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_18.png?v=1685002983"},
            {"name":"Happy Pink", "id":"C13", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_20.png?v=1685002983"},
            {"name":"Happy Pink Robby Angel", "id":"C14", "image":"https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_catlife_21.png?v=1685002983"}]


angelflower = [{"name": "Sunflower Lion Blue", "id": "F1", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_05.png?v=1675911015"},
{"name": "Sunflower Lion Mint Green", "id": "F2", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_06.png?v=1675911015" },
{"name": "Rose Lion Pink", "id": "F3", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_07.png?v=1675911015"},
{"name": "Rose Lion Yellow", "id": "F4", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_08.png?v=1675911015"},
{"name": "Daisy Lion Lime Green", "id": "F5", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_09.png?v=1675911015"},
{"name": "Daisy Lion Orange", "id": "F6", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_10.png?v=1675911015"},
{"name": "Sunflower Lion Rainbow", "id": "F7", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_11.png?v=1675911015"},
{"name": "Robby Lion Rainbow", "id": "F8", "image": "https://cdn.shopify.com/s/files/1/0082/3168/2103/files/img_flowergift_12.png?v=1675911015"}]

let savedFilename = ""
let files = getFiles(__dirname  + '/public/images');
router.get("/",function(req,res) {
    res.sendFile(path.resolve(__dirname + "/public/views/index.html"));
});
router.get("/inventory",function(request,response){
    response.sendFile(__dirname + "/public/views/inventory.html");
});
router.get('/savedfilename', function(req, res){
    res.json({ name: savedFilename })
})

router.get("/trade", function(req, res){
    res.sendFile(__dirname + "/public/views/trade.html")
})

function getFiles(srcpath) {
      return fs.readdirSync(srcpath).filter(function(file) {
        path.resolve(__dirname, file);
        return fs.statSync(path.join(srcpath, file)).isFile();
  });
};

router.post('/fileupload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.image.path;
        var newpath = __dirname + '/public/images/' + files.image.name;

        console.log('Received image: ' + files.image.name);
        mv(oldpath, newpath, function (err) {
            if (err) throw err;
            savedFilename = files.image.name
            res.json({ name: files.image.name });
        });
    });
});


router.post('/create', function(req, res){
    console.log("in routes.js create req");
    console.log(req.body.user.trim());
    // check if user already exists
    if (req.body.user.trim() == "" || req.body.passw.trim() == "") {
        return res.json(null);
    }
    let obj = new Data(req.body.user, req.body.passw);
    let val = db.postData(obj);
    if (val == false){
        console.log("db.postData(obj) error!")
        return res.json(null)
    }
    else
        return res.json({user: req.body.user, passw:req.body.passw}); 
});

router.post('/login', function(req, res){
    console.log("in routes.js login req")
    if (req.body.user.trim() == "" || req.body.passw.trim() == "")
        return res.json(null)
    reqData = db.getData(req.body.user)
    console.log(reqData)
    if (reqData && req.body.passw == reqData.passw)
        return res.json({user:reqData.user, passw:reqData.passw})
    else
        return res.json(null)
});


router.get('/read', function(req, res){
    let trimIdentifier = req.query.identifier.trim();
    if (trimIdentifier == "") {
        res.json({error:true});
        return;
    }

    let identifier = Number(trimIdentifier);
    if (Number.isNaN(identifier)) {
        res.json({error:true});
        return;
    }

//changed code.
//    return(db.getData(identifier,res));

    let val = db.getData(identifier);
    if (val == null)
        res.json({error:true});
    else
        res.json({error:false,user:val.user, passw:val.passw});


});

router.delete('/delete/:identifier', function(req, res){
    let trimIdentifier = req.params.identifier.trim();
    if (trimIdentifier == "") {
        res.json({error:true});
        return;
    }

    let identifier = Number(trimIdentifier);
    if (Number.isNaN(identifier)) {
        res.json({error:true});
        return;
    }
//changed code.
//    return( db.deleteData(identifier,res));

    let val = db.deleteData(identifier);
    if (val == null)
        res.json({error:true});
    else
        res.json({error:false});

});

module.exports = router;


