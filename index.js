const express = require("express");
const db = require("./db")

const app = express();
const port = 8000;

app.use(express.json());     // express.json parse the data and send it to the req.body

// root route
app.get("/",function(req,res){
    res.send("welcome the star hotel.. how can i help you!");
})

// import the person routes
const Personroutes = require("./routes/personroutes")
// use the routes
app.use("/person",Personroutes);

// import the menu routes
const menuroute = require("./routes/menuroutes")
app.use("/menu",menuroute)

// start the server
app.listen(port,()=>{
    console.log(`server start at port number ${port}`)
})
