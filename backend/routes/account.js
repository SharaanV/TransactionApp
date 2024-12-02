const express = require('express');
const authenticationMiddleware = require('../Middleware/middleware');
const { Account } = require('../database/db');
const mongoose = require('mongoose');
const accountRouter = express.Router();

accountRouter.get('/balance',authenticationMiddleware,async (req,res)=>{
    const userId = req.body.userId
    const dbuser = await Account.findOne({userId})
    res.status(200).json({
        balance:dbuser.balance
    })
})

accountRouter.post('/transfer',authenticationMiddleware,async (req,res)=>{
    
    let {amount, to} = req.body
    amount = parseInt(amount)
    const userId = req.body.userId
    const fromAccount = await Account.findOne({userId})
    if(!fromAccount || fromAccount.balance<amount){
        return res.json({
            message:"Insuuficient Balance"
        })
    }
    const toAccount = await Account.findOne({
        userId:to
    })
    if(!toAccount){
        return res.json({
            message:"Invalid account"
        })
    }
    await Account.findByIdAndUpdate(fromAccount,{$inc:{balance:-amount}})
    await Account.findByIdAndUpdate(toAccount,{$inc:{balance:amount}})
    res.status(200).json({
        message:"Transfer Sucessfull"
    })

})
module.exports = accountRouter