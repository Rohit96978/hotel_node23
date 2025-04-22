const express = require("express");
const Person = require("../model/Person")
const router = express.Router();

// to set data from client to server
router.post("/",async (req,res) => {
    try{
    const data = req.body;    // assuming req.body contain the data which is send by client side
    //  create a new person document using the mongoose model
    const newperson = new Person(data);
    //  save the new person to the database
    const saveperson = await newperson.save();
    console.log("data is saved");
    res.status(200).json(saveperson);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"});
    }
})

// to get data from server
router.get("/",async(req,res) => {
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"});
    }
})

router.get("/:work",async (req,res) =>{
    try{
        const worktype = req.params.work;      // worktype pe fetch krvaya from url parameter (:work)
        if(worktype == "chef" || worktype == "waiter" || worktype == "manager"){
            const response = await Person.find({work : worktype});
            console.log("response fetch");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error : "invalid work type"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"});
    }
})

// for update the data
router.put("/:id",async(req,res) => {
    try{
        const personid = req.params.id   // extract the id from url parameter
        const updatepersondata = req.body;

        const response = await Person.findByIdAndUpdate(personid , updatepersondata,{
            new : true, // return the update document
            runValidators : true, //run mongoose validation 
        })
        if(!response){
            return res.status(404).json({error : "person not found"})
        }
        console.log(`Person with ID ${personid} updated successfully`);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"})
    }
})

//  for delete the data
router.delete("/:id",async(req,res) =>{
    try{
        const personid = req.params.id;   // extract the id from url parameter
        const deleteperson = await Person.findByIdAndDelete(personid)
        if(!deleteperson){
            return res.status(404).json({error : "person not found"})
        }
        console.log(`Person with ID ${personid} deleted successfully`)
        res.status(200).json({message : "person deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"})
    }
})

module.exports = router;