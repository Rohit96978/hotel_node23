const express = require("express");
const router = express.Router();
const menuitem = require("../model/menuitem")

router.post("/",async(req,res) => {
    try{
        const data = req.body;
        const newmenu = new menuitem (data);
        const savemenu = await newmenu.save();
        console.log("data is saved");
        res.status(200).json(savemenu);
    }
    catch(err){aadsddqwft
        console.log(err);
        res.status(500).json({error : "internal error occur"});
    }
})

router.get("/",async(req,res) => {
    try{
        const data = await menuitem.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"});   
    }
})

router.get("/:taste",async(req,res) => {
    try{
        const tastetype= req.params.taste; 
        if(tastetype == "spicy" || tastetype == "sweet" || tastetype == "sour"){
            const response = await menuitem.find({taste : tastetype});
            console.log("response fetch");
            res.status(200).json(response);
        }else{
            res.status(404).json({error : "invalid work type"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"})
    }
})

// to update the menu
router.put("/:id",async(req,res) => {
    try{
        const menuid = req.params.id   // extract the id from url parameter
        const updatemenu = req.body;

        const response = await menuitem.findByIdAndUpdate(menuid,updatemenu,{
            new : true, // return the update document
            runValidators : true, //run mongoose validation 
        })
        if(!response){
            return res.status(404).json({error : "menu not found"})
        }
        console.log(`menu with ID ${menuid} updated successfully`);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"})
    }
})

// to delete the menu
router.delete("/:id",async(req,res) =>{
    try{
        const menuid = req.params.id;   // extract the id from url parameter
        const deletemenu= await menuitem.findByIdAndDelete(menuid)
        if(!deletemenu){
            return res.status(404).json({error : "person not found"})
        }
        console.log(`Person with ID ${menuid} deleted successfully`)
        res.status(200).json({message : "person deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "internal error occur"});
    }
})


module.exports = router;