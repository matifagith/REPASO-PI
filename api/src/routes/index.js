const { Router } = require("express");
const router = Router();
const {allCharacters} = require ('./controllers/controllers')
const {Episode, Character} = require ('../db')

/* const characters = require('./characters.js');
const character = require('./character.js');
const episodes = require('./episodes.js'); */

// Configurar los routers

/* router.use('/characters', characters);
router.use('/character', character);
router.use('/episodes', episodes); */

//NO MODULARIZO NADA NO SE PORQUE NO ANDA CHEE


router.get('/characters', async(req, res, next)=>{
    const {name} = req.query;
    try{
        const characters = await allCharacters();
        if(name){
            let filterCharacters = characters.filter(ch => ch.name.toLowerCase().includes(name.toString().toLowerCase()))
            if(filterCharacters.length){
                res.status(200).json(filterCharacters)
            }
            else{
                res.status(404).send('The character does not exist')  
            }
        }else{
        res.status(200).json(characters)    
        }                
    }catch(e){
        console.log(e)
    }
})

router.get('/episodes', async (req, res, next)=>{
    try{      
        const dbEpisodes = await Episode.findAll(); //busco en la DB
        res.status(200).json(dbEpisodes) //envio los tipos de dietas
    }catch(e){
        next(e) //le mando el error a index
    }
})

router.post('/character', async (req, res, next)=>{
    try{
        let{
            name,
            status,
            species,
            origin,
            image,            
        } = req.body;

        const characterCreate = await Character.create({
            name,
            status,
            species,
            origin,
            image,         
        })

        res.status(201).send(characterCreate)

    }catch(e){
        console.log(e)
    }
})

module.exports = router;
