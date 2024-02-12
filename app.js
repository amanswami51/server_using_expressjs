//*****************server by using express notes*****************
//1. npm init -y
//2. create "app.js" file.
//      --npm install express
//      --Import express through "const express = require("express")" .
//      --create server through "const app = express()" method. 
//      --then run server through "app.listen(port,hostname, callback)" method.
//3. use "express.static('static')" mathod for serving static folder.
//4. use "express.urlencoded()" method for access form data by using "req.body".
//5. set "pug" for serving files through "res.render('pug file name')" method. 
//      --npm install pug
//      --setup through " app.set('view engine', 'pug'); app.set('views', path.join(__dirname, 'views'));".
//      --pug is a nodejs express template engine. 
//      --pug supports template inheritance. Template inheritence works via the "block" and "extends" keywords.
//      --"base.pug" file is an example of Template Inheritance
//6. create routes (main logic) like "app.get(path, callback)", "app.post(path, callback)" etc.
//7. Mongodb database setup
//      --install mongoose through "npm i mongoose@6.6.5" command.
//      --import mongoose through "const mongoose = require('mongoose')".
//      --connect to db through "mongoose.connect(URI)" method.
//      --make schema(formate) through "mongoose.Schema(inObjectFormat)" method.
//      --create model through "mongoose.model("collection-name", schema)" method.
//      --Add data in database through "modelName(dataObject)" method. then use "save()" method.













// ******************data store in contact.txt file******************
// const express = require("express") //Import express
// const path = require("path");
// const fs = require("fs");

// const hostname = 'localhost';
// const port = 80;
// const app = express();  //create server //like "http.createServer"
 

// //for serving static files, static files are those files which are publically available and everyone can download without any restriction 
// app.use('/freefile', express.static('static'));  // // " localhost/static/first.js " //write this in browser window to access these  
// app.use(express.urlencoded());  //use to access form data


// //pug setup**********************
// app.set('view engine', 'pug') //set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) //set the views directory


// //EndPoints OR Routes OR CheckPoints
// app.get("/first", (req, res) => {
//     res.send("This is my first express app with harry youtube chennel")
// });

// app.get('/', (req, res)=>{
//     res.status(200).render('01_index')
// });
// app.get('/contect', (req, res)=>{
//     res.status(200).render('02_contact_form')
// });
// app.get('/payment', (req, res)=>{
//     res.status(200).render('03_payment_form')
// });
// app.get('/about', (req, res)=>{
//     res.status(200).render('04_about')
// });
// app.post('/contect', (req, res)=>{
//     console.log(req.body); //req.body is an object which can store all data of form which is posted by the user.

//     //write in the file
//     const name = req.body.fname;
//     const surname = req.body.sname;
//     const email = req.body.email;
//     const mobile = req.body.phonenum;
//     const massage = req.body.massage;
//     const DOB = req.body.DOB;
//     const contact_form_data = `Name = ${name}, Surname = ${surname}, Email = ${email}, Mobile Number = ${mobile}, About Your Self = ${massage}, Date Of Birth = ${DOB}`;
//     fs.writeFileSync("contact.txt", contact_form_data);

//     res.status(200).render('02_contact_form')
// });
// app.post('/payment', (req, res)=>{
//     console.log(req.body);  //req.body is an object which can store all data of form which is posted by the user.
//     res.status(200).render('03_payment_form')
// });

// // ***************listen server***************
// app.listen(port,hostname, () => {
//     console.log(`The application started successfully http://${hostname}:${port}`);
// })






//**********************data store in database name mongodb**********************
const express = require('express'); //Import express
const path = require("path");

const hostname = 'localhost';
const port = 5000;
const app = express();  //create server

//Mongodb setup*********************
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/crudoperation").then(()=>{
    console.log("mongodb is connected");
}).catch((err)=>{
    console.log(`Unable to connect to the server : ${err}`);
})

//create schema************************
const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "Firstname is required"]
    }, 
    sname: {
        type: String,
        required: [true, "Lastname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phonenum: {
        type: Number,
        required: [true, "phone number is required"]
    },
    massage: {
        type: String,
        required: [true, "massage is required"]
    },
    DOB: {
        type: String,
        required: [true, "DOB is required"]
    }
})
//create model****************************************
const UserModel = mongoose.model("user", UserSchema) //plural of "user" is collection name


//serving static files****************************
app.use('/static', express.static('static')); //for serving static files
app.use(express.urlencoded({extended: true}));  //use to access form data (req.body)


//pug setup**********************
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


//ENDPOINTS (Routes)***************
app.get('/', (req, res)=>{
    res.status(200).render('01_index')
});
app.get('/contect', (req, res)=>{
    res.status(200).render('02_contact_form')
});
app.get('/payment', (req, res)=>{
    res.status(200).render('03_payment_form')
});
app.get('/about', (req, res)=>{
    res.status(200).render('04_about')
});

app.post("/contect", (req, res)=>{
    var SaveUser = new UserModel(req.body);
    SaveUser.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

//listen server*************************
app.listen(port,hostname, () => {
    console.log(`The application started successfully http://${hostname}:${port}`);
})