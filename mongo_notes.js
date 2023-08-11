//mongod :- This is database server
//mongo :- This is the way to establish connection to mongod through command line shell.
//mongo db compass :- This is the way to establish connection to mongod through GUI.
//mongoose :- This is the way to establish connection to mongod through nodejs


//******Inserting data in mongo db******
// show dbs
// use harrykart
// show collections
// db.items.insertOne({name:"Samsung 30s", price:22000, rating:4.5, qty:233, sold:98})
// db.items.insertMany([{name:"Samsung 30s", price:22000, rating:4.5, qty:233, sold:98},
//                      {name:"Moto 30s", price:29000, rating:3.5, qty:133, sold:598},
//                      {name:"Realme 80s", price:129000, rating:2.5, qty:633, sold:98}])
// db.items.find()



//******Searching data in mongo db******
// show dbs
// use harrykart
// show collections
// db.items.find()
// db.items.find({rating:3.5})
// db.items.find({rating:{$gte:3.5}})
// db.items.find({rating:{$gt:3.5}})

//And operator
// db.items.find({ rating:{$gt: 3.5}, price:{$gt:4000} })
// db.items.find({ rating:{$lt: 3.5}, price:{$gt:114000} })

//or operator
// db.items.find({ $or: [ {rating: {$gt: 3.5} }, {price: {$gt:114000} } ] })




//******deleting data in mongo db******
// show dbs
// use harrykart
// show collections
// db.items.find()
// db.items.deleteOne( {price: 22000} )
// db.items.deleteMany( {price: 22000} )




//******updating data in mongo db******
// show dbs
// use harrykart
// show collections
// db.items.find()
// db.items.updateOne( {name: "Moto 30s"}, { $set:{price:2} } )
// db.items.updateMany( {name: "Moto 30s"}, { $set:{price:2, rating:1} } )
