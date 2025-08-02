const express=require('express')
const router=express.Router();
const aiController=require('../controllers/ai.controllers')


router.get("/get-response",aiController.getResponse)

module.exports=router;