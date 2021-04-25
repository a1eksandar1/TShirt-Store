const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"get req to /users"
    });
});

router.get('/:userId',(req,res,next)=>{
    const id=req.params.tshirtId;
    res.status(200).json({
        message:"get req to /users/id with id:"+id
    });
});

module.exports=router;