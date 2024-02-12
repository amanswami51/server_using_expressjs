server by using express notes
1. npm init -y
2. create "app.js" file. 
     --npm install express \
     --Import express through "const express = require("express")" . \
     --create server through "const app = express()" method. \
     --then run server through "app.listen(port,hostname, callback)" method. 
3. use "express.static('static')" mathod for serving static folder.
4. use "express.urlencoded()" method for access form data by using "req.body".
5. set "pug" for serving files through "res.render('pug file name')" method. 
     --npm install pug \
     --setup through " app.set('view engine', 'pug'); app.set('views', path.join(__dirname, 'views'));". \
     --pug is a nodejs express template engine. \
     --pug supports template inheritance. Template inheritence works via the "block" and "extends" keywords. \
     --"base.pug" file is an example of Template Inheritance
6. create routes (main logic) like "app.get(path, callback)", "app.post(path, callback)" etc.
7. Mongodb database setup
     --install mongoose through "npm i mongoose@6.6.5" command. \
     --import mongoose through "const mongoose = require('mongoose')". \
     --connect to db through "mongoose.connect(URI)" method. \
     --make schema(formate) through "mongoose.Schema(inObjectFormat)" method. \
     --create model through "mongoose.model("collection-name", schema)" method. \
     --Add data in database through "modelName(dataObject)" method. then use "save()" method.

