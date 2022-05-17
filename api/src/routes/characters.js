const express = require('express')
const router = express.Router()
const axios = require('axios');
const {getApiCharacters} = require('./controllers/controllers.js');


router.get('/', async(req, res, next)=>{
   

    try{
        const characters = getApiCharacters();
        res.status(200).json(characters)
    }catch(e){
        res.status(500).json('no hay caracters')
    }

})