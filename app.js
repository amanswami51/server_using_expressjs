//*****************notes*****************
//1. npm init -y 
//2. npm install express
//3. npm i mongoose@6.6.5 
//4. npm i --save-dev nodemon
//5. import express, make app, then listen server
//6. import mongoose, mongoose.connect, make schema, make model, then app.post 
//7. npm install pug
//Template Inheritance
//pug supports template inheritance. Template inheritence works via the "block" and "extends" keywords.
//"base.pug" file is an example of Template Inheritance
//8. make views folder //make all pug html files in this folder.
//9. make static folder  //make all html, css, javascript files in this folder. These files are imported by pub html files.
//10. npm install body-parser , this is optional






// ******************tut_72******************(Just Example of express and pug)
// const express = require("express") //Import express module
// const path = require("path");
// const app = express();  //make express app
// const port = 80;

// app.get("/", (req, res) => {
//     res.send("This is my first express app with harry youtube chennel")
// });
// app.get("/about", (req, res) => {
//     res.status(200).send("This is my about page first express app with harry")  //also we send status code like this
// });

// // app.post("/contect", (req, res)=>{
// //     res.send("This is my first express app with harry")
// // });


// //for serving static files, static files are those files which are publically available and everyone can download without any restriction 
// app.use('/static', express.static('static'));  // // " localhost/static/first.js " //write this in browser window to access these  

// //*********pug*********"pugjs.org" read more here
// //nodejs express template engine, example:- pug     //npm install pug
// app.set('view engine', 'pug') //set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) //set the views directory
// app.get('/demo', (req, res) => {    //our pug demo endpoint
//     res.status(200).render('demo', { title: 'Hey', message: 'Hello there!' })
// });
// app.get('/second', (req, res)=>{     //our pug second endpoint
//     const con = "This is the best content on the internet."
//     const params = {'title':'PubG is best game', 'content':con} 
//     res.status(200).render('SecondPug', params);
// });

// // ***************Execute server***************
// app.listen(port, () => {
//     console.log(`The application started successfully on port ${port}`)
// })








// ******************tut_73******************(Actually implementation of the express and pug) //data store in contact.txt file
// const express = require("express") //Import express module
// const path = require("path");
// const fs = require("fs");
// const app = express();  //make express app
// const port = 80;
 
 
// //EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')); //for serving static files
// app.use(express.urlencoded());  //use to access form data


// //PUG SPECIFIC STUFF
// app.set('view engine', 'pug') //set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) //set the views directory


// //ENDPOINTS
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

// // Execute server
// app.listen(port, () => {
//     console.log(`The application started successfully on port ${port}`)
// })






//**********************tut_88**********************(Actually implementation of the express and pug) //data store in database name mongodb
const express = require('express'); //Import express module
const app = express();  //make express app
const port = 5000;
const path = require("path"); //use to set the views directory

// *********************connect mongoose*********************
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/crudoperation",(err)=>{
    if(err) console.log(`Unable to connect to the server : ${err}`);
    else 
        console.log("mongodb is connected");
})

// schema
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
// model
const UserModel = mongoose.model("user", UserSchema) //plural of "user" is collection name


//***************EXPRESS SPECIFIC STUFF***************
app.use('/static', express.static('static')); //for serving static files
app.use(express.urlencoded({extended: true}));  //use to access form data (req.body)


// ***************PUG SPECIFIC STUFF***************
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory


// ***************ENDPOINTS***************
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

// ***************Execute server***************
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})
